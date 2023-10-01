import React from 'react'
import DashBoardHeader from '../../component/Shop/Layout/DashBoardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import AllOrders from "../../component/Shop/AllOrders"

const ShopAllOrders = () => {
    return (
        <div>
            <div>
            <DashBoardHeader />
            <br />
            <div className="flex justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]" style={{marginTop: 20}}>
                    <DashboardSideBar active={2}/>
                </div>
                <div className="w-full justify-center flex">
                   <AllOrders />
                </div>
            </div>
        </div>
        </div>
      )
}

export default ShopAllOrders