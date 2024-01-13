import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './router/router'
import './globalCss.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider

    theme={{
      token: {
        colorPrimary: '#975ab4',
        borderRadius: 6,
      },
      components: {
        Button: {
          colorPrimary: '#975ab4',
          algorithm: false,
        },
        Input: {
          colorBgBlur: '',
        },
        Modal: {
          contentBg: '#303338',
          headerBg: '#303338',
          titleColor: 'white',
        },
      },
    }}
  >
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>,
)
