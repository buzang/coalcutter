import React from 'react'
import style from './style.module.css'

const Plank: React.FC = ({ children }: any) => {
  return (
    <div className={style.pigTiele}>
      {children}
    </div>

  )
}
export default Plank
