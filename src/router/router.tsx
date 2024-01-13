import { createBrowserRouter } from 'react-router-dom'
import { MenuRouterMappingList } from './router.config'
import { RouterGuard } from './router.guard'
import Layouts from '@/layouts/index'
import Login from '@/pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <RouterGuard isAuthenticated={routerInterceptor}>
        <Layouts />
      </RouterGuard>
    </>,
    children: MenuRouterMappingList,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
])

/**
 *路由拦截器
 * @returns
 */
function routerInterceptor(): boolean {
  if (!localStorage.getItem('UserInfo'))
    return false

  return true
}

export default router
