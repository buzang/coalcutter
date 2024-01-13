import React from 'react'
import { NonIndexRouteObject } from 'react-router'
import HomePage from '@/pages/Home'
import TestPage from '@/pages/test'
import ChatPage from '@/pages/Chat'
import Community from '@/pages/Community'
import FirendsPage from '@/pages/Friends'
import ChatGTPPage from '@/pages/GPT'

interface RouteConfigObject extends NonIndexRouteObject {
  name?: string
  children?: RouteConfigObject[]
}

export const MenuRouterMappingList: RouteConfigObject[] = [
  {
    name: 'Home',
    path: '/home',
    element: <HomePage />,
    children: [
      {
        name: 'Chat',
        path: '/home/chat/:hahahah',
        element: <ChatPage />,
      },
      {
        name: 'Chat',
        path: '/home/community',
        element: <Community />,
      },
      {
        name: 'Firends',
        path: '/home/friends',
        element: <FirendsPage />,
      },
    ],

  },
  {
    name: 'GPT',
    path: '/gpt',
    element: <ChatGTPPage />,
  },

]
