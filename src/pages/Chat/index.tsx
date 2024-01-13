import { Button, Form, Input, message as M } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router'
import { MessageCenter } from 'nikel-message-center'
import style from './style.module.css'
import { WebSocketClient } from '@/apis/WebSocketClient'
import UserMessageElement from '@/components/UserMessage'
import HintMessage from '@/components/HintMessage'
import request from '@/apis'
import getTIme from '@/utils/getTIme'

const UserInfo = JSON.parse(localStorage.getItem('UserInfo')!)

export interface IMsg { type: 'UserMessage' | 'HintMessage'; message: string; name: string; userId: number; head: string; time: string }

function ChatPage() {
  const location = useLocation()
  const [inpuValue, setInputValue] = useState('')
  const [form] = Form.useForm()
  const [messageList, setMessageList] = useState([UserMessageElement({ id: 5, name: '倪鹏程', message: '你好', time: '2022/10/10 20:38 17:40' }, 5), UserMessageElement({ id: 7, name: '小猪聊天室', message: '是吗？哈哈哈哈哈哈哈哈哈哈哈哈哈哈', head: '🐷', time: '2022/10/10 20:38 17:40' }, 5), HintMessage({ id: 7, name: '小猪聊天室', message: '开始聊天吧！', head: '🥰', time: '2022/10/10 20:38 17:40' })])
  const navigate = useNavigate()
  const chatInput = useRef(null)
  const messagebox = useRef(null)
  useEffect(() => {
    (async () => {
      const result = await request.post('/chatRecord/messageRecord', { community: location.state.path })
      result.data.data.forEach((it) => {
        it.message = JSON.parse(it.message)
        const Message = UserMessageElement({ id: it.message.userId, message: it.message.message, name: it.message.name, head: it.message.head, time: it.message.time }, UserInfo.id)
        setMessageList(pre => [...pre, Message])
      })
    })()

    // 这里是组件首次渲染或路由变化时的逻辑
    WebSocketClient.Init(location.state.path, UserInfo.id)

    MessageCenter.Subscribe('Message', (msg: IMsg) => {
      // let messageNode

      const ele = msg.type === 'UserMessage'
        ? UserMessageElement({ id: msg.userId, message: msg.message, head: msg.head, name: msg.name, time: msg.time }, UserInfo.id)
        : HintMessage(msg)
      // // 处理接收到的新消息

      // 更新 messageList 状态
      setMessageList(pre => [...pre, ele])
      chatInput.current.focus()
    })

    return () => {
      WebSocketClient.Close()
    }
  }, [location, navigate]) // location 和 navigate 作为依赖

  // 当消息列表更新时，滚动到底部
  useEffect(() => {
    if (messagebox.current) {
      const { scrollHeight, clientHeight } = messagebox.current
      messagebox.current.scrollTop = scrollHeight - clientHeight
    }
  }, [messageList]) // 添加 messageList 作为依赖项，以便在其更新时触发此效果

  return (
    <>

      <div className="w-full h-full ">

        {/* Header Bar */}

        <div className="w-full flex  items-start flex-items-start flex flex-row h-70px " style={{ borderBottom: '.5px solid #1a1b1b' }}>

          {/* Title */}
          <div className="text-white flex flex-row h-full w-200px items-center ">
            <div className="text-40px ml-20px mr-10px">
              {location.state.emoji}
            </div>
            <div className="text-24px font-500">
              {location.state.name}
            </div>
          </div>

        </div>

        {/* Content Box */}
        <div className={`${style.content} w-full flex flex-row`}>

          {/* Left */}
          <div className="flex-1 relative">

            <div ref={messagebox} id="messagebox" className={`${style.chatContent} absolute w-full  h-full`} style={{ overflowY: 'scroll' }}>

              <div className={`${style.messageList}  m-20px`}>
                {
                  messageList.map(Message => Message)
                }
              </div>

            </div>

            <div className="w-95% absolute bottom--30px flex flex-row left-50%" style={{ transform: 'translate(-50%,-50%)' }}>
              <Form form={form} className=" w-100% flex flex-row left-50%">
                <Form.Item name="message" className="w-100%">
                  <Input
                    ref={chatInput}
                    value={inpuValue}
                    className="w-100%"
                    size="large"
                    prefix="⌨️&nbsp;&nbsp;"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        WebSocketClient.SendQueryOrdered(location.state.path, form.getFieldValue('message'), getTIme())
                        form.resetFields()
                      }
                    }}
                    suffix="🎁 &nbsp;&nbsp;🧧&nbsp;&nbsp;😃"
                  >
                  </Input>
                </Form.Item>

              </Form>

              <Button
                size="large"
                className="ml-10px"
                type="primary"
                onClick={() => {
                  WebSocketClient.SendQueryOrdered(location.state.path, form.getFieldValue('message'), getTIme())

                  form.resetFields()
                }}
              >
                ENTER

              </Button>
            </div>

          </div>

          {/* Right Description */}
          <div className="w-250px  flex  flex-col  items-center bg-#23242899" style={{ borderLeft: '1px solid black' }}>

            <div className="w-full flex flex-col ">
              {/* card */}
              <div className="text-100px">
                {location.state.emoji}
              </div>

              <div className="bg-#111214 w-90% ml-3% p-5px h-100px border-r-15px">
                <div className="text-24px font-500 text-white ml-5px">
                  {location.state.name}
                </div>
                <div className="text-16px mt-10px font-500 text-white ml-5px pb-10px " style={{ borderBottom: '1px solid #888' }}>
                  {location.state.description}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </>
  )
}

export default ChatPage
