import { IMsg } from '@/pages/Chat'
import getTIme from '@/utils/getTIme'

function HintMessage(messageSource: IMsg) {
  return (
    <>
      <div className="w-95% m-20px flex flex-col justify-center items-center text-white ">
        <div>
          {getTIme()}
          &nbsp;&nbsp;
          {messageSource.name}
          &nbsp;
          {messageSource.message}
        </div>
      </div>

    </>
  )
}
export default HintMessage
