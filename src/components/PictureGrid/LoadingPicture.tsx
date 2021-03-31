import React, { DetailedHTMLProps, ImgHTMLAttributes, useRef, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import styled from 'styled-components'
import { ReactComponent as HeartSvg } from 'src/assets/heart.svg'
import { IPicture } from '../../api/pictures'

interface IProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  onLoad?: () => void
  onLikeClick: (pictureId: number, isLiked: boolean) => Promise<boolean>
  picture: IPicture
  isLiked: boolean
}

const LoadingContainer = styled.div`
  width: 100%;
  position: relative;
`

const HeartIcon = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 28px;
  height: 28px;
`

const LoadingPicture: React.FC<IProps> = ({
  picture,
  isLiked: isInitiallyLiked,
  onLikeClick,
  onLoad,
  ...props
}) => {
  const { width, height, blurHash, id } = picture
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLiked, setIsLiked] = useState(isInitiallyLiked)
  const prevIsLiked = useRef<boolean>(isInitiallyLiked)

  const handleLikeClick = async () => {
    prevIsLiked.current = isLiked
    setIsLiked(s => !s)

    const isFinallyLiked = await onLikeClick(id, prevIsLiked.current)

    // return to previous state if error happens
    setIsLiked(s => (isFinallyLiked ? s : prevIsLiked.current))
  }

  const handleLoaded = () => {
    setIsLoaded(true)

    if (onLoad) {
      onLoad()
    }
  }

  // calculate coefficient based on picture's ratio
  const ratio = width / height
  let scaledHeight
  if (ratio > 2) {
    scaledHeight = ratio * 60
  } else if (ratio > 1) {
    scaledHeight = ratio * 110
  } else {
    scaledHeight = ratio * 600
  }

  if (isLoaded) {
    return (
      <LoadingContainer style={{ height: scaledHeight }}>
        <img
          {...props}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: 'block',
            cursor: 'pointer',
          }}
          alt={props.alt}
        />
        <HeartIcon onClick={handleLikeClick}>
          <HeartSvg style={{ cursor: 'pointer', fill: isLiked ? 'red' : 'white' }} />
        </HeartIcon>
      </LoadingContainer>
    )
  }

  return (
    <LoadingContainer style={{ height: scaledHeight }}>
      <Blurhash style={{ display: 'block', width: '100%' }} height={scaledHeight} hash={blurHash || ''} />
      <img {...props} style={{ opacity: 0 }} alt={props.alt} onLoad={handleLoaded} onError={handleLoaded} />
    </LoadingContainer>
  )
}

export default LoadingPicture
