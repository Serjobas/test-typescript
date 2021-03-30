## Why does the loadPictures dependency crash the browser?

The crash of the browser had been caused by the fact that the `loadPictures` function in
`src/components/DataContext/index.tsx` that was called in effect in `src/components/PictureGrid/index.tsx`,
has a `pictures` in dependency array and `pictures` always changes after the call of `loadPictures` function,
this way, we always have a new `loadPictures` function in our `useEffect` dependencies, which causes
`loadPictures` to be called again. This way, we're putting the browser into an infinite loop. To solve this bug we
either want to deep compare `pictures` in `useCallback` or only call `loadPictures` at our `useEffect` when
there's something changed. I chose the second way and made a comparison with the previous `currentPage` and
`categoryId` values, if they changed then we call `loadPictures`.

##  Is there any way to prevent warnings in the codebase?

Yes, we could add eslint checks on precommit hook, with a param `--max-warnings=0`. This way, every time developers try to commit code with eslint warnings or errors, they will fail and they will have to fix the warnings and commit again.
