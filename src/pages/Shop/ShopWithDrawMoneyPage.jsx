import React from 'react'
import DashBoardHeader from './../../component/Shop/Layout/DashBoardHeader';
import DashboardSideBar from './../../component/Shop/Layout/DashboardSideBar';
import WithdrawMoney from './../../component/Shop/Layout/WithdrawMoney';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
        <DashBoardHeader />
        <br />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar active={7}/>
            </div>
            <WithdrawMoney />
        </div>
    </div>
  )
}

export default ShopWithDrawMoneyPage