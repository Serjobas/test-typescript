import * as React from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import to from 'await-to-js'
import { toast } from 'react-toastify'
import { ASSETS_ENDPOINT } from '../../api/config'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { DataContext } from '../DataContext/context'
import { H3 } from '../typography'
import styled from 'styled-components/macro'
import { PictureModalContext } from '../PictureModalContext/context'
import LoadingPicture from './LoadingPicture'
import { createLike, deleteLike } from '../../api/likes'
import { LikesContext } from '../LikesContext/context'

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
  const { likes } = useContext(LikesContext)
  const [imagesAmountLoaded, setImagesAmountLoaded] = useState(0)

  const prevCurrentPage = useRef<number | null>(null)
  const prevCategoryId = useRef<number | undefined | null>(null)

  const handleIncreaseImageAmount = () => {
    setImagesAmountLoaded(s => s + 1)
  }

  const handleLikeClick = async (pictureId: number, isLiked: boolean) => {
    let err

    const cb = (e: BeforeUnloadEvent) => {
      const confirmationMessage = 'Your request is still processing. Are you sure you want to leave the page?'

      e.returnValue = confirmationMessage
      return confirmationMessage
    }

    window.addEventListener('beforeunload', cb)

    if (isLiked) {
      const result = await to(deleteLike(pictureId))
      err = result[0]
    } else {
      const result = await to(createLike(pictureId))
      err = result[0]
    }

    window.removeEventListener('beforeunload', cb)

    if (err) {
      toast('An error occurred on the server. Try again later', { type: 'error' })
      return false
    }
    toast('Succeed', { type: 'success' })
    return true
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
          {pictures.map(picture => (
            <LoadingPicture
              key={picture.id}
              picture={picture}
              src={`${ASSETS_ENDPOINT}${picture.urls.small}`}
              alt=""
              onClick={() => openPicture(picture)}
              onLoad={handleIncreaseImageAmount}
              onLikeClick={handleLikeClick}
              isLiked={likes.includes(picture.id)}
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
