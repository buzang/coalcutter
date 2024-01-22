import { NonIndexRouteObject } from 'react-router'
import HomePage from '@/pages/Home'

interface RouteConfigObject extends NonIndexRouteObject {
  name?: string
  children?: RouteConfigObject[]
}

export const MenuRouterMappingList: RouteConfigObject[] = [
  {
    name: '主页',
    path: '/home',
    element: <HomePage />,
  },

]
