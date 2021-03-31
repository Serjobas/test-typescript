import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import to from 'await-to-js'
import { toast } from 'react-toastify'
import { fetchLikes } from '../../api/likes'
import { LikesContext } from './context'

export const LikesContextProvider: React.FC = React.memo(({ children }) => {
  const [likes, setLikes] = useState<number[]>([])

  useEffect(() => {
    const cb = async () => {
      const [err, response] = await to(fetchLikes())
      if (err) {
        toast('Error while fetching likes, please reload the page.', { type: 'error' })
      } else {
        setLikes(response?.data?.likedPictureIds || [])
      }
    }
    cb()
  }, [])

  const value = useMemo((): { likes: number[] } => {
    return {
      likes,
    }
  }, [likes])

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
})
