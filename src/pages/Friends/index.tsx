import { Form, Input } from 'antd'
import Item from 'antd/es/list/Item'
import style from './style.module.css'
import Plank from '@/components/plank'
import useCreateEmojiEle from '@/hooks/useCreateEmojiEle'

function FirendsPage() {
  const [bar] = useCreateEmojiEle('🤣😁', -45, 80, 300, 800)
  const [bar2] = useCreateEmojiEle('🧑‍🤝‍🧑❤️', -45, 80, 300, 800)
  return (
    <>
      <div className="main flex flex-col w-100% h-100% items-center " style={{ overflowY: 'scroll' }}>
        <div className="w-90%  h-300px flex flex-row justify-center gap-20px">
          <div
            ref={bar}
            className="w-48% relative mt-40px"
            style={{
              boxShadow: '0px 0px 10px 5px #212225',
              overflow: 'hidden',
              borderRadius: '25px',
            }}
          >
            <Plank>
              <span className="text-40px">
                世界上本没有路,有了腿便有了路
              </span>
              <span className="text-50px">
                hahahahhahahahahahhahahahhahahhahahahah
              </span>

            </Plank>
          </div>

          <div
            ref={bar2}
            className="w-48% relative mt-40px"
            style={{
              boxShadow: '0px 0px 10px 5px #212225',
              overflow: 'hidden',
              borderRadius: '25px',
            }}
          >
            <Plank>
              <span className="text-40px">
                世界上本没有路,有了腿便有了路
              </span>
              <span className="text-50px">
                hahahahhahahahahahhahahahhahahhahahahah
              </span>
            </Plank>
          </div>
        </div>

        {/* Search */}

        <Form className="w-100% flex m-20px">
          <Form.Item className="w-80% m-auto ">
            <Input prefix="&nbsp;&nbsp;🔍&nbsp;&nbsp; " suffix="✅ &nbsp;&nbsp;&nbsp;&nbsp;" size="large" className="text-20px text-#935bb2">

            </Input>
          </Form.Item>
        </Form>

        {/* 搜索结果区域 */}
        <div className="w-90% flex-1  p-5px flex bg-#29292b">

          <div className="text-white m-auto text-18px font-500" style={{ opacity: 0.5 }}>
            <span className="text-50px "> 🛵 </span>

            找个好友交流一下吧！

          </div>

        </div>

        {/* 当前在线用户 */}
        <div className="w-90% h-200px mb-20px   bg-#29292b p-5px flex pt-20px" style={{ borderTop: '1px solid #555555' }}>

          <div className="text-white text-18px font-500  w-100% flex flex-col">
            <span className="text-14px font-500 ml-9px  w-100px"> 当前在线用户 </span>

            <div className="w-100%  flex-1 flex flex-row items-center p-15px gap-20px relative">

              <div className={` ${style.itemUser} flex flex-col justify-center items-center text-center p-10px`} style={{ borderRadius: '5px' }}>

                <div className="text-45px ">
                  🤯
                </div>
                <div className="text-12px">
                  倪鹏程
                </div>
                <div className="text-10px ">
                  开心社区服务器
                </div>

                <div className="text-10px absolute top-5px left-5px">🟢</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default FirendsPage
