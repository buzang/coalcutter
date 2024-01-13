import { useCallback, useEffect, useRef } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router'
import { MessageCenter } from 'nikel-message-center'
import style from './style.module.css'
import useCreateEmojiEle from '@/hooks/useCreateEmojiEle'
import Plank from '@/components/plank'

const emojiList = [
  {
    id: 1,
    emoji: '😃',
    name: '欢乐社区',
    path: 'huanleshequ',
    description: '一个充满笑声和快乐的地方。',
  },
  {
    id: 2,
    emoji: '🧐',
    name: '智慧村落',
    path: 'zhihuishequ',
    description: '求知若渴，智慧的源泉。',
  },
  {
    id: 3,
    emoji: '🥰',
    name: '爱心乐园',
    path: 'aixin',
    description: '爱与被爱的温馨家园。',
  },
  {
    id: 4,
    emoji: '🤪',
    name: '奇趣小镇',
    path: 'qiqu',
    description: '充满惊奇和创意的奇幻之地。',
  },
  {
    id: 5,
    emoji: '😅',
    name: '健身俱乐部',
    path: 'jianshe',
    description: '追求健康和活力的首选之地。',
  },
  {
    id: 6,
    emoji: '😎',
    name: '酷炫区',
    path: 'kuxuan',
    description: '时尚前沿，酷炫无限。',
  },
  {
    id: 7,
    emoji: '😇',
    name: '天使广场',
    path: 'tianshiguangchang',
    description: '纯净祥和，宛如天上人间。',
  },
  {
    id: 8,
    emoji: '🤩',
    name: '星光大道',
    path: 'xinguangdadao',
    description: '追逐梦想，璀璨如星。',
  },
  {
    id: 9,
    emoji: '😷',
    name: '安全小区',
    path: 'kuxuan',
    description: '安全第一，守护您的健康。',
  },
  {
    id: 10,
    emoji: '🤗',
    name: '拥抱小镇',
    path: 'kuxuan',
    description: '一个温暖拥抱，传递友谊与爱。',
  },
  {
    id: 11,
    emoji: '🤔',
    name: '思考者之城',
    path: 'kuxuan',
    description: '沉思与哲学共存的智慧之地。',
  },
  {
    id: 12,
    emoji: '😜',
    name: '欢乐颂区',
    path: 'kuxuan',
    description: '笑脸迎人，欢乐无限。',
  },
  {
    id: 13,
    emoji: '🧘',
    name: '宁静园',
    path: 'kuxuan',
    description: '内心平和，灵魂的栖息地。',
  },
  {
    id: 14,
    emoji: '🤐',
    name: '守秘境',
    path: 'kuxuan',
    description: '秘密的避风港，静谧而神秘。',
  },
  {
    id: 15,
    emoji: '😲',
    name: '惊喜乡',
    path: 'kuxuan',
    description: '不断带来惊喜的欢乐之地。',
  },
  {
    id: 16,
    emoji: '😴',
    name: '梦乡',
    path: 'kuxuan',
    description: '安静的睡眠，甜美的梦。',
  },
  {
    id: 17,
    emoji: '🙃',
    name: '逆向世界',
    path: 'kuxuan',
    description: '一切皆有可能的奇妙空间。',
  },
  {
    id: 18,
    emoji: '🎭',
    name: '戏剧村',
    path: 'kuxuan',
    description: '戏剧与艺术的交汇处。',
  },
  {
    id: 19,
    emoji: '👽',
    name: '外星区',
    path: 'waixingqu',
    description: '探索未知，发现新世界。',
  },
  {
    id: 20,
    emoji: '👻',
    name: '幽灵镇',
    path: 'youlingzhne',
    description: '神秘而又刺激的超自然体验。',
  },
]

function Community() {
  const [bar] = useCreateEmojiEle('✅', -45, 100, 200, 1200)

  const navigate = useNavigate()
  return (
    <>
      <div className={`${style.main} w-full h-1300px flex flex-col  items-center`}>
        <div ref={bar} className="w-90% h-300px relative mt-40px" style={{ boxShadow: '0px 0px 10px 5px #212225' }}>
          <Plank>
            <span className="text-40px">
              世界上本没有路,有了腿便有了路
            </span>
            <span className="text-50px">
              hahahahhahahahahahhahahahhahahhahahahah
            </span>

          </Plank>

        </div>

        {/* 列表 */}
        <div className={`${style.emojiList} h-500px w-95% mt-50px `}>
          {
            emojiList.map((it) => {
              return (
                <>
                  <div
                    className={`${it.id === 1 ? style.activity : ''} ${style.item}`}
                    onClick={() => {
                      MessageCenter.Publish('ChatInfoChange', it)
                      navigate(`/home/chat/${it.path}`, { state: it })
                    }}
                  >
                    <div>
                      {it.emoji}
                    </div>
                    <div className="text-30px text-white ">
                      {it.name}
                    </div>
                    <div className="text-15px text-white">
                      🔆
                      {it.description}
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Community
