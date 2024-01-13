import { useCallback, useEffect, useRef } from 'react'
import { getRandomInt } from '@/utils/getRandom'

function useCreateEmojiEle(emoji: string, rotate: number, emojiSize: number, topMaxLocation: number, leftMaxLocation: number) {
  const bar = useRef(null)

  const createEmjioListEle = useCallback(() => {
    for (let i = 0; i < 100; i++) {
      const atomTag = document.createElement('span')

      atomTag.style.transform = `rotate(${rotate}deg)`
      atomTag.style.float = 'left'
      atomTag.style.margin = '5px'
      atomTag.style.position = 'absolute'
      atomTag.style.cursor = 'pointer'

      atomTag.textContent = emoji

      atomTag.style.transform = `rotate(${getRandomInt(-45, -90)}deg)`

      atomTag.style.top = `${getRandomInt(-50, topMaxLocation)}px`

      atomTag.style.left = `${getRandomInt(-30, leftMaxLocation)}px`

      atomTag.style.fontSize = `${getRandomInt(14, emojiSize)}px`

      bar.current?.appendChild(atomTag)
    }
  }, [])

  useEffect(() => {
    createEmjioListEle()
  }, [])

  return [bar]
}

export default useCreateEmojiEle
