import * as React from 'react'


export const LikesContext = React.createContext<{likes: number[]}>({
    likes: []
})
