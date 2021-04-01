import * as React from 'react'
import { useCallback, useContext } from 'react'
import { PictureModalContext } from '../components/PictureModalContext/context'
import { Modal } from '../components/Modal'
import { ASSETS_ENDPOINT } from '../api/config'
import styled, { css } from 'styled-components/macro'
import { H3, PrimaryText } from 'src/components/typography'

const Content = styled.div<{ isLandscape?: boolean }>`
  height: 100%;
  width: 100%;
  display: inline-flex;
  justify-content: ${({ isLandscape }) => (isLandscape ? 'flex-start' : 'space-evenly')};
  flex-direction: ${({ isLandscape }) => (isLandscape ? 'column' : 'row')};
`

const Column = styled.div<{ isImageColumn?: boolean; isLandscape?: boolean }>`
  height: ${({ isImageColumn, isLandscape }) => (isLandscape && isImageColumn ? '75%' : '90%')};
  width: ${({ isLandscape }) => (isLandscape ? '100%' : 'auto')};
  text-align: center;
`
const Image = styled.img<{ isLandscape?: boolean }>`
  ${({ isLandscape }) =>
    isLandscape
      ? css`
          height: 100%;
          max-width: 100%;
        `
      : css`
          max-width: 100%;
          height: 100%;
        `};
`
export const PicturePreviewModal: React.FC = React.memo(() => {
  const { openedPicture, openPicture } = useContext(PictureModalContext)

  const handleClose = useCallback(() => {
    openPicture(undefined)
  }, [openPicture])

  if (!openedPicture) return null

  const isLandscape = openedPicture.width / openedPicture.height >= 1.5

  return (
    <Modal onClose={handleClose}>
      <Content isLandscape={isLandscape}>
        <Column isImageColumn isLandscape={isLandscape}>
          <Image isLandscape={isLandscape} src={ASSETS_ENDPOINT + openedPicture.urls.regular} />
        </Column>
        <Column isLandscape={isLandscape}>
          <H3>Picture info</H3>
          <hr />
          <p>
            <PrimaryText>ID: #{openedPicture.id}</PrimaryText>
          </p>
          <p>
            <PrimaryText>
              Dimensions: {openedPicture.width}px&times;{openedPicture.height}px ratio{' '}
            </PrimaryText>
          </p>
          <p>
            <PrimaryText>Name: {openedPicture.name}</PrimaryText>
          </p>
        </Column>
      </Content>
    </Modal>
  )
})
