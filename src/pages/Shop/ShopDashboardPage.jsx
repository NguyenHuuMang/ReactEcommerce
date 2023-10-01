import React from 'react';
import DashBoardHeader from "../../component/Shop/Layout/DashBoardHeader"
import DashboardSideBar from "../../component/Shop/Layout/DashboardSideBar"
import DashboardHero from "../../component/Shop/Layout/DashboardHero"

const ShopDashboardPage = () => {
  return (
    <div>
        <DashBoardHeader />
        <br />
        <div className="flex items-center justify-between w-full" style={{marginTop: "-45px"}}>
            <div className="w-[80px] 800px:w-[330px]" style={{marginTop: -57}}>
                <DashboardSideBar active={1}/>
            </div>
            <DashboardHero />
        </div>
    </div>
  )
}

export default ShopDashboardPage