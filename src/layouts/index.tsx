import { Outlet, useNavigate } from 'react-router'
import { useState } from 'react'
import style from './style.module.css'

const leftBarList = [
  {
    id: 1,
    icon: '🏠',
    path: '/home',
  },
  {
    id: 2,
    icon: '🌍',
    path: '',
  },
  {
    id: 3,
    icon: '🤖',
    path: '/gpt',
  },
  {
    id: 4,
    icon: '⚙️',
    path: '',
  },
]

function Layouts() {
  const [acitvityNav, setActivityNav] = useState(1)
  const navigate = useNavigate()
  return (
    <>
      <div className={` ${style.main} flex relative w-screen h-screen justify-center items-center flex-content-center flex-items-center flex-row h-screen w-screen`}>

        <div className={`${style.chatRoom}  z-10 flex justify-center items-center h-90% flex-content-center flex-items-center flex-row w-90%`} style={{ boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.5)' }}>

          <div className={`${style.leftBar} h-full w-80px fixed left-0px`}>

            <span className={style.logo}>
              🐷
            </span>

            {
              leftBarList.map((it) => {
                return (
                  <div
                    className={acitvityNav === it.id ? style.leftBarActivity : ''}
                    onClick={() => {
                      setActivityNav(it.id)
                      navigate(it.path)
                    }}
                  >
                    {it.icon}
                  </div>
                )
              })
            }

          </div>

          {/* Content */}
          <div className="h-full absolute right-0 " style={{ width: 'calc(100% - 80px)' }}>

            <Outlet></Outlet>

          </div>

        </div>

        {/* <div className=" absolute text-100px bottom--30px right--17px z-20" style={{ transform: 'rotate(-45deg)' }}>🐷</div> */}
        {/* <div className=" absolute text-100px bottom--30px left--18px z-20" style={{ transform: 'rotate(45deg)' }}>🐷</div> */}

        <div className={`${style.pigLogo} absolute text-100px`}>
          <div>
            小猪聊天室
          </div>
          <div>
            Pig Chat Room
          </div>
        </div>

      </div>
    </>
  )
}

export default Layouts
