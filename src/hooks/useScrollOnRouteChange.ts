import { useEffect } from 'react'
import { useRouter } from 'next/router'

const useScrollOnRouteChange = () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      if (!window.location.hash) {
        setTimeout(() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }, 50)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events])
}

export default useScrollOnRouteChange
