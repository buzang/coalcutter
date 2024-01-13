import { Button, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { MessageCenter } from 'nikel-message-center'
import style from './style.module.css'

const buttonList = [
  {
    id: 1,
    icon: '👯',
    title: '好友',
    path: '/home/friends',
  },
  {
    id: 2,
    icon: '⛺️',
    title: '社区',
    path: '/home/community',
  },
]

function HomePage() {
  const [acitvityButton, setAcitvityButton] = useState(1)
  const [updateModalState, setUpdateModalState] = useState(false)
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('UserInfo')!))

  const [communityList, setCommunityList] = useState<{ id: number; emoji: string; name: string; path: string; description: string }[]>([])
  const navigate = useNavigate()
  const [currentComId, setCurrentComId] = useState(0)

  useEffect(() => {
    MessageCenter.Subscribe('ChatInfoChange', (e) => {
      let flag = true

      setCurrentComId(e.id)

      communityList.forEach((it) => {
        if (e.id === it.id)
          flag = false
      })

      flag && setCommunityList(pre => [...pre, e])
    })
  }, [])

  const navigator = useNavigate()
  return (
    <>
      <div id="main" className="flex flex-row h-full">

        <div className={`${style.friendList} w-15% relative  h-full flex flex-col`}>

          <div className="w-full flex  justify-center  items-start flex-items-start  h-70px " style={{ borderBottom: '.5px solid #1a1b1b' }}>
            <Input className="w-90% mt-15px" prefix="🔍 " placeholder="寻找或开始新的对话"></Input>
          </div>

          {/* 按钮列表 */}
          <div id="friendListBtns" className={style.friendListBtns}>
            {

              buttonList.map((it) => {
                return (
                  <>
                    <div
                      className={acitvityButton === it.id ? style.avtivityButton : ''}
                      onClick={() => {
                        navigator(it.path)
                        setAcitvityButton(it.id)
                      }}
                    >
                      &nbsp;&nbsp;
                      {it.icon}
                      &nbsp;
                      <span>{it.title}</span>
                    </div>
                  </>
                )
              })
            }
          </div>

          {/* 聊天 */}
          <div className=" flex flex-row w-100% h-30px justify-between flex-items-center mt-10px">
            <div className=" font-500 pl-10px text-13px text-#b2b1b1">聊天</div>
            <div className=" font-500 pr-10px text-18px cursor-pointer text-#b2b1b1">+</div>
          </div>

          <div className={style.chatList}>
            {

              communityList.map((it) => {
                return (
                  <div
                    className={`${currentComId == it.id ? style.avtivityChatButton : ''} ${style.chatListItem}`}
                    onClick={() => {
                      navigate(`/home/chat/${it.path}`, { state: it })
                      setCurrentComId(it.id)
                    }}
                  >
                    <div>
                      #
                    </div>
                    <div>
                      {it.name }
                      {' '}
                      {it.emoji}
                    </div>
                  </div>
                )
              })
            }
            <div>

            </div>

          </div>

          {/* UserInfo */}
          <div className=" absolute bottom-0 h-50px w-full bg-#232428 flex flex-row justify-between items-center  flex-items-start">

            <div
              className="flex flex-row justify-between items-center ml-20px"
              onClick={() => {
                setUpdateModalState(true)
              }}
            >
              <div className="text-30px ">
                {userInfo.head}
              &nbsp;
              </div>

              <div className="text-#b4b3b3 flex text-12px flex-col">
                <div className=" text-12px">
                  {userInfo.name}
                </div>
                <div className=" text-10px">
                  {userInfo.username}
                </div>
              </div>
            </div>

            <div className="text-20px ">
              🎧
            </div>
            <div className="text-20px mr-20px">
              🎙️
            </div>
          </div>
        </div>

        <div id="content" className="w-85%" style={{ overflow: 'scroll' }}>
          <Outlet></Outlet>
        </div>
      </div>
      <UpdateUserInfoModal
        userInfo={userInfo}
        open={updateModalState}
        close={() => setUpdateModalState(false)}
        success={() => {
          setUpdateModalState(false)
          setTimeout(() => {
            setUserInfo(JSON.parse(localStorage.getItem('UserInfo')!))
            message.success('修改成功')
          }, 500)
        }}
      />
    </>
  )
}

function UpdateUserInfoModal({ userInfo, open, close, success }: { userInfo: any; open: boolean; close: () => void; success: () => void }) {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(userInfo)
  }, [])
  return (
    <>
      <Modal
        open={open}
        title="修改用户信息"
        closeIcon="❌"
        width="300px"
        onCancel={close}
        onOk={() => {
          localStorage.removeItem('UserInfo')
          localStorage.setItem('UserInfo', JSON.stringify(form.getFieldsValue()))
          success()
        }}
      >
        <Form form={form} className="flex flex-col p-20px">
          <Form.Item name="name">
            <Input size="large" prefix="🙂" placeholder="Your name"></Input>
          </Form.Item>
          <Form.Item name="username">
            <Input size="large" prefix="🧑‍💻" placeholder="Account"></Input>
          </Form.Item>
          <Form.Item name="password">
            <Input size="large" prefix="🔒" placeholder="Password"></Input>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}

export default HomePage
