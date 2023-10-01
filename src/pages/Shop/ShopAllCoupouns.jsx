import React from 'react'
import DashBoardHeader from '../../component/Shop/Layout/DashBoardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import AllCoupouns from "../../component/Shop/AllCoupouns"


const ShopAllCoupouns = () => {
  return (
    <div>
        <DashBoardHeader />
        <br />
        <div className="flex justify-between w-full">
            <div className="w-[100px] 800px:w-[330px]">
                <DashboardSideBar active={9}/>
            </div>
            <div className="w-full justify-center flex">
                <AllCoupouns />
            </div>
        </div>
    </div>
  )
}

export default ShopAllCoupouns

