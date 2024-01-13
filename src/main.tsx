import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './router/router'
import './globalCss.css'

// Token 名称	描述	类型	默认值
// contentBg	内容区域背景色	string	#ffffff
// footerBg	底部区域背景色	string	transparent
// headerBg	顶部背景色	string	#ffffff
// titleColor	标题字体颜色	string	rgba(0, 0, 0, 0.88)
// titleFontSize	标题字体大小	number	16
// titleLineHeight	标题行高

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
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
