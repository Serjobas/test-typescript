import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import styled from 'styled-components'

interface IProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  onLoad?: () => void
  blurHash?: string
  pictureWidth: number
  pictureHeight: number
}

const LoadingContainer = styled.div`
  width: 100%;
`

const LoadingPicture: React.FC<IProps> = ({ pictureHeight, pictureWidth, blurHash, onLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoaded = () => {
    setIsLoaded(true)

    if (onLoad) {
      onLoad()
    }
  }

  // calculate coefficient based on picture's ratio
  const ratio = pictureWidth / pictureHeight
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
