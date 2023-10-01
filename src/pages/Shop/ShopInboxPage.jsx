import React from 'react'
import DashBoardHeader from '../../component/Shop/Layout/DashBoardHeader'
import DashboardSideBar from '../../component/Shop/Layout/DashboardSideBar'
import DashboardMessages from '../../component/Shop/Layout/DashboardMessages'

const ShopInboxPage = () => {
    return (
        <div>
        <DashBoardHeader />
        <br />
        <div className="flex items-center justify-between w-full">
            <div className="w-[60px] 800px:w-[330px]" style={{marginTop: -280}}>
                <DashboardSideBar active={8}/>
            </div>
           <DashboardMessages />
        </div>
      </div>
      )
    }

export default ShopInboxPage