import style from './style.module.css'

function UserMessageElement(messageSource: { id: number; name: string; time: string; message: string; head?: string }, userId) {
  return (
    <>
      <div className={`${style.messageListItem}`} style={{ alignItems: messageSource.id == userId ? 'flex-end' : 'flex-start' }}>
        <div className={`${style.userInfo}`}>
          <div className="text-35px mr-10px">
            {messageSource.head ?? '🧑‍💻'}
          </div>

          <div className={`${style.nameAndTime}  `}>
            <div className="text-14px font-500">
              {messageSource.name}
            </div>
            <div className="text-11px">
              {messageSource.time}
            </div>
          </div>
        </div>
        <div className={`${style.message} `} style={{ backgroundColor: messageSource.id !== userId ? '#4abf43' : '' }}>
          &nbsp;
          {messageSource.message}
        </div>
      </div>
    </>
  )
}

export default UserMessageElement
