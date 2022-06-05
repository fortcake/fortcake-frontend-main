import { useEffect } from 'react'

const useClickyAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const scr = document.createElement('script')
      scr.src = 'https://static.getclicky.com/101367022.js'
      scr.async = true

      document.body.appendChild(scr)
    }
  }, [])
}

export default useClickyAnalytics
