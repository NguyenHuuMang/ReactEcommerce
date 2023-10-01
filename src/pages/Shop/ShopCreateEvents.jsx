import React from 'react'
import DashBoardHeader from '../../component/Shop/Layout/DashBoardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import CreateEvent from "../../component/Shop/CreateEvent";


const ShopCreateEvents = () => {
  return (
    <div>
        <DashBoardHeader />
        <br />
        <div className="flex items-center justify-between w-full">
            <div className="w-[100px] 800px:w-[330px]" style={{marginTop: -40}}>
                <DashboardSideBar active={6}/>
            </div>
            <div className="w-full justify-center flex">
                <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents