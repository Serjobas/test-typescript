import styled, { keyframes } from 'styled-components/macro'
import * as React from 'react'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

interface IFadeInProps {
  duration?: number
  delay?: number
  style?: any
  children: React.ReactNode
}

export const FadeIn: React.FC<IFadeInProps> = ({ duration = 300, delay = 0, children, ...rest }) => {
  return (
    <Wrapper
      {...rest}
      style={{
        ...(rest.style || {}),
        animationDuration: duration + 'ms',
        animationDelay: delay + 'ms',
      }}>
      {children}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  animation-name: ${fadeIn};
  animation-fill-mode: backwards;
`
