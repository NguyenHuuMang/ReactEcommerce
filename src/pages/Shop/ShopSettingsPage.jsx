import React from 'react'
import ShopSettings from "../../component/Shop/ShopSettings"
import DashBoardHeader from '../../component/Shop/Layout/DashBoardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'

const ShopSettingsPage = () => {
  return (
    <div>
        <DashBoardHeader />
        <br />
        <div className="flex items-center justify-between w-full" style={{marginTop: "-40px"}}>
            <div className="w-[100px] 800px:w-[330px]" style={{marginTop: -60}}>
                <DashboardSideBar active={10} />
            </div>
            <div className="w-full justify-center flex" >
                <ShopSettings />
            </div>
        </div>
    </div>
  )
}

export default ShopSettingsPage