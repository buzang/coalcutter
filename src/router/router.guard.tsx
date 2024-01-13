import { FC, ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

interface RouterGuardProps {
  /**
   *  守卫校验
   */
  isAuthenticated: () => boolean

  children: ReactNode
}

/**
 * 路由守卫
 */
export const RouterGuard: FC<RouterGuardProps> = ({ isAuthenticated, children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated())
      navigate('/login', { state: { form: location } })
  }, [navigate, location])

  return isAuthenticated() ? children : null
}
