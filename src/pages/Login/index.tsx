import { Button, Form, Input, message } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router'
import style from './style.module.css'
import { getRandomInt } from '@/utils/getRandom'
import request from '@/apis'

message.config({
  top: 195,
})

async function handleLogin(form: FormInstance, navigate: any) {
  const UserInfo = JSON.parse(localStorage.getItem('UserInfo')!)

  const username = form.getFieldValue('username')
  const password = form.getFieldValue('password')

  const result = await request.post('/login', { username, password })

  if (result.data.msg === 'OK') {
    localStorage.removeItem('UserInfo')
    localStorage.setItem('UserInfo', JSON.stringify(result.data.data))
    message.success('登录成功!')
    navigate('/home/friends')
  }
  else {
    message.error('登录失败')
  }
}

async function handleRegister(form: FormInstance) {
  const result = await request.post('/register', form.getFieldsValue())

  result.data.msg === 'OK' ? message.success('注册成功！') : message.error('用户已存在')
}

function LoginPaage() {
  const piglistEle = useRef(null)
  const [form] = Form.useForm()
  const [currentFormStatus, setCurrentFormStatus] = useState<'Login' | 'Register'>('Login')
  const navigate = useNavigate()
  // #region
  const createEmjioListEle = useCallback(() => {
    for (let i = 0; i < 350; i++) {
      const atomTag = document.createElement('span')
      atomTag.className = style.atomTag
      atomTag.textContent = getRandomInt(1, 50) % 2 === 0 ? '🐷🤣' : getRandomInt(1, 50) % 3 === 0 ? '🐽' : '🐷'
      atomTag.style.transform = `rotate(${getRandomInt(-45, -90)}deg)`
      atomTag.style.top = `${getRandomInt(-50, 1000)}px`
      atomTag.style.left = `${getRandomInt(-50, 1000)}px`
      atomTag.style.fontSize = `${getRandomInt(20, 100)}px`
      if (i === 150) {
        atomTag.style.fontSize = '300px'
        atomTag.addEventListener('click', () => {
          message.success('Hello World')
          atomTag.style.fontSize = '300px'
        })
      }
      atomTag.addEventListener('click', () => {
        atomTag.style.fontSize = '300px'
      })
      piglistEle.current?.appendChild(atomTag)
    }
  }, [])
  // #endregion

  useEffect(() => {
    createEmjioListEle()
  }, [])
  return (
    <>
      <div id="main" className="flex justify-center items-center flex-content-center flex-items-center flex-row h-screen w-screen">
        <div className="flex justify-center items-center  flex-content-center flex-items-center flex-row w-1500px" style={{ boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.5)', background: 'rgb(114, 11, 179)' }}>
          <div id="pig" ref={piglistEle} className={`${style.pigList} bg-#313338 w-70%  h-800px`}>
            <div className={style.pigTiele}>
              <div>
                小猪聊天室
              </div>
              <div className="text-50px">
                PIG CHAT ROOM
              </div>
            </div>
          </div>
          <div className="w-30% relative h-800px relative flex justify-center flex-col flex-content-center flex-items-center" style={{ overflow: 'hidden' }}>
            <div className=" h-100px text-50px text-center flex flex-items-center ">
              {
                currentFormStatus === 'Login'
                  ? <div className="w-220px text-white text-40px text-left">Sign In</div>
                  : <div className="w-220px text-white text-40px text-left">Register</div>
              }
            </div>
            <Form form={form} className={style.form} onFinish={() => { console.log('321321') }}>
              { currentFormStatus === 'Register'
                ? (
                  <Form.Item name="name">
                    <Input size="large" prefix="🙂" placeholder="Your name"></Input>
                  </Form.Item>
                  )
                : <></>}
              <Form.Item name="username">
                <Input size="large" prefix="🧑‍💻" placeholder="Account"></Input>
              </Form.Item>
              <Form.Item name="password">
                <Input size="large" prefix="🔒" placeholder="Password" type="password"></Input>
              </Form.Item>
              {
                currentFormStatus === 'Login'
                  ? <Button type="dashed" size="large" htmlType="submit" className="w-120px" onClick={() => handleLogin(form, navigate)}>LOGIN👏</Button>
                  : <Button type="dashed" size="large" htmlType="submit" className="w-120px" onClick={() => handleRegister(form)}>REGISTER👏</Button>
              }
            </Form>
            <div className=" absolute text-150px bottom--55px right--25px" style={{ transform: 'rotate(-45deg)' }}>🐷</div>
            <div className=" absolute text-100px bottom--45px right-105px" style={{ transform: 'rotate(-45deg)' }}>✌🏻</div>
            <div className=" absolute text-100px top-70px left--10px" style={{ transform: 'rotate(75deg)' }}>🐷</div>
            <div className=" absolute text-70px top-20px left--10px z-1" style={{ transform: 'rotate(80deg)' }}>🫵🏻</div>
            {
              currentFormStatus === 'Login'
                ? (
                  <div className="cursor-pointer text-18px absolute bottom-10px text-white font-500 left-10px" onClick={() => { setCurrentFormStatus('Register') }}>
                    🔆 Go to Register
                  </div>
                  )
                : (
                  <div className="cursor-pointer text-18px absolute bottom-10px text-white font-500 left-10px" onClick={() => { setCurrentFormStatus('Login') }}>
                    ✅ Back to login
                  </div>
                  )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPaage
