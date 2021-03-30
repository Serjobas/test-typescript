import * as React from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ASSETS_ENDPOINT } from '../../api/config'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { DataContext } from '../DataContext/context'
import { H3 } from '../typography'
import styled from 'styled-components/macro'
import { PictureModalContext } from '../PictureModalContext/context'

interface IProps {
  categoryId: number | undefined
}

const LoadingBlock = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
`

export const PictureGrid: React.FC<IProps> = React.memo(({ categoryId }) => {
  const { pictures, currentPage, loadPictures, hasMore, changeToNextPage } = useContext(DataContext)
  const { openPicture } = useContext(PictureModalContext)
  const [imagesAmountLoaded, setImagesAmountLoaded] = useState(0)

  const prevCurrentPage = useRef<number | null>(null)
  const prevCategoryId = useRef<number | undefined | null>(null)

  const handleIncreaseImageAmount = () => {
    setImagesAmountLoaded(s => s + 1)
  }

  // Missing dep: loadPictures, but it crashes the browser. Why?
  useEffect(() => {
    if (currentPage !== prevCurrentPage.current || categoryId !== prevCategoryId.current) {
      loadPictures(categoryId, currentPage)
    }

    prevCurrentPage.current = currentPage
    prevCategoryId.current = categoryId
  }, [currentPage, categoryId, loadPictures])

  const handleObserver = useCallback<IntersectionObserverCallback>(
    entities => {
      const target = entities[0]
      if (target.isIntersecting) {
        if (hasMore) {
          changeToNextPage()
        }
      }
    },
    [changeToNextPage, hasMore],
  )

  const loaderRef = useCallback(
    node => {
      if (node !== null && handleObserver) {
        const options = {
          root: null,
          rootMargin: '20px',
          threshold: 1.0,
        }
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options)

        observer.observe(node)

        return () => {
          observer.disconnect()
        }
      }
    },
    [handleObserver],
  )

  if (!pictures)
    return (
      <div>
        <H3>Loading...</H3>
      </div>
    )

  if (pictures.length === 0)
    return (
      <div>
        <H3>No pictures in this category</H3>
      </div>
    )

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1150: 4, 1400: 5 }}>
        <Masonry gutter="10px">
          {pictures.map((picture, i) => (
            <img
              key={i}
              src={`${ASSETS_ENDPOINT}${picture.urls.small}`}
              style={{ width: '100%', display: 'block', cursor: 'pointer' }}
              alt=""
              onClick={() => openPicture(picture)}
              onLoad={handleIncreaseImageAmount}
              onError={handleIncreaseImageAmount}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {pictures.length > 0 && imagesAmountLoaded === pictures.length && (
        <LoadingBlock ref={loaderRef}>
          <H3>{hasMore ? 'Loading more...' : 'That is all.'}</H3>
        </LoadingBlock>
      )}
    </div>
  )
})
