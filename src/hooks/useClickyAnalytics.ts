import { useEffect } from 'react'

const useClickyAnalytics = () => {
  useEffect(() => {
    const scr = document.createElement('script')
    scr.src = 'https://static.getclicky.com/101367022.js'
    scr.async = true

    document.body.appendChild(scr)
  }, [])
}

export default useClickyAnalytics
