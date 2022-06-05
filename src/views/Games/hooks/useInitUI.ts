import { useEffect, MutableRefObject } from 'react'
import { GLOBALCLASSES } from 'style/Global'

function throttle(cb: () => void, delay = 400) {
  let flag = false
  return () => {
    if (!flag) {
      flag = true
      cb()
      setTimeout(() => {
        flag = false
      }, delay)
    }
  }
}

let lastScroll = 0

function scrollDirection(elem) {
  const st = elem.scrollTop
  const isGoingUp = st < lastScroll
  console.info(isGoingUp ? 'up' : 'down')
  lastScroll = st <= 0 ? 0 : st

  return isGoingUp
}

const useInitUi =  (ref: MutableRefObject<any>) => {
  useEffect(() => {
    const root = document.getElementById('__next')
    const parent = root.lastChild.childNodes[1];
    const child = parent.firstChild;
    const footer = child.lastChild as HTMLElement
    const element = ref.current

    const func = throttle(scrollToTop)

    function reset() {
      footer.style.display = ''
      document.body.classList.remove(GLOBALCLASSES.GAMESTYLES)
      element.removeEventListener('scroll', func)
    }

    function modifyStyles() {
      footer.style.display = 'none'
      document.body.classList.add(GLOBALCLASSES.GAMESTYLES)
    }

    function modifyDom() {
      modifyStyles()
      // element.addEventListener('scroll', func)
    }

    function scrollToTop() {
      const goingUp = scrollDirection(element)
      if (goingUp) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 100, behavior: 'smooth' })
      }
    }

    modifyDom()

    return () => {
      reset()
    }
  }, [ref])
}

export default useInitUi