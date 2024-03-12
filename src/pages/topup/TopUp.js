import MetaHeader from '../../components/meta-header/MetaHeader';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
const TopUp = () => {
    const [cash, setCash] = useState(0)
    const handleSubmit = (event) => {

    }
    return (
        <div>
            <MetaHeader title={'เติมเงิน'}/>
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <div className='size-full flex flex-col items-center justify-center'>
                <div className='btn btn-circle btn-success'>0.00</div>
                <label className="form-control w-full mx-5">
                </label>
                <div className='flex w-full'>
                <label className="form-control w-full mx-5">
                <div className="label">
                    <span className="label-text">ชื่อ</span>
                </div>
                <input type="text" placeholder="ชื่อ" className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full mx-5">
                <div className="label">
                    <span className="label-text">นามสกุล</span>
                </div>
                <input type="text" placeholder="นามสกุล" className="input input-bordered w-full" />
                </label>
                </div>
                <label className="form-control w-full mx-5">
                <div className="label">
                    <span className="label-text">จำนวนเงินที่ต้องการ (บาท)</span>
                </div>
                <input value={cash} onChange={(event)=>setCash(event.target.value)} type="text" placeholder="จำนวนเงินที่ต้องการ (บาท)" className="input input-bordered w-full" />
                </label>
                <div className='flex w-full flex-row items-center justify-center'>
                <button onClick={()=>setCash(50)} className='btn grow mx-3 bg-[#E3C7FF]'>50</button>
                <button onClick={()=>setCash(100)} className='btn grow mx-3 bg-[#E3C7FF]'>100</button>
                <button onClick={()=>setCash(150)} className='btn grow mx-3 bg-[#E3C7FF]'>150</button>
                <button onClick={()=>setCash(200)} className='btn grow mx-3 bg-[#E3C7FF]'>200</button>
                <button onClick={()=>setCash(500)} className='btn grow mx-3 bg-[#E3C7FF]'>500</button>
                </div>
                <button onClick={handleSubmit} type='button' className={`my-5 text-xs btn-xs sm:text-sm lg:text-lg xl:text-xl sm:btn-sm lg:btn-lg xl:btn-xl text-[#FFFFFF] btn bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover:bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>ยืนยัน</button>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full text-[#FFFF] text-3xl bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] text-base-content">
                    <li className='flex justify-center items-center'>
                        <div className="avatar">
                            <div className="size-full rounded-full">
                                <img src={require('../../asset/images/profile.jpg')} alt={`รูปโปรไฟล์`} />
                            </div>
                        </div>
                    </li>
                    <li><Link to={'/profile'}>โปรไฟล์ของฉัน</Link></li>
                    <li><Link to={'/redeem-reward'}>แลกของรางวัล</Link></li>
                    <li><Link to={'/topup'}>เติมเงิน</Link></li>
                    <li><Link to={'/'}>ออกจากระบบ</Link></li>
                </ul>            
            </div>
            </div>
        </div>
    )
}

export default TopUp