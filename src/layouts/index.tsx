import { Outlet } from 'react-router'


function Layouts() {


  return (
    <>

      <div className='w-full h-full flex'>


        <div className=''>
          LAYOUT布局
        </div>

        {/*内容    */}
        <div className='m-auto'>

          <Outlet></Outlet>
        </div>


      </div>
    </>
  )
}

export default Layouts

