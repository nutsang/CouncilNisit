import MetaHeader from '../../components/meta-header/MetaHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState({cardID: 'ไม่พบข้อมูล', studentId:'ไม่พบข้อมูล', studentName:'ไม่พบข้อมูล', studentLastName:'ไม่พบข้อมูล', username:'ไม่พบข้อมูล', cash: 0, point: 0})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}profile`)
        .then((response) => {
            if(response.data.status){
                setAccount(response.data.message)
            }else{
                navigate("/")
            }
        })
        .catch((error) => {
            navigate("/")
        })
    }, [])

    return (
        <div>
            <MetaHeader title={'โปรไฟล์ของฉัน'}/>
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col justify-center">
                {/* Page content here */}
                <div className='shadow-2xl rounded-lg m-10 p-20 bg-gradient-to-r from-[#0aba91] to-[#0ABAB5]'>
                <div className='flex flex-nowrap flex-col justify-center items-center rounded-lg w-full'>
                    <div className={`flex flex-nowrap flex-col w-full items-center justify-center flex-1 my-5`}>
                        <h1 className={`text-nowrap text-xs sm:text-sm lg:text-lg xl:text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block text-transparent bg-clip-text`}>ข้อมูลส่วนตัว</h1>
                    </div>
                </div>
                {/* <div className='w-full text-[#FFFFFF] text-3xl my-4'>รหัสบัตรสมาชิก: {`${account.cardID}`}</div> */}
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>รหัสนิสิต: {`${account.studentId}`}</div>
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>ชื่อ: {`${account.studentName}`}</div>
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>นามสกุล: {`${account.studentLastName}`}</div>
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>ชื่อผู้ใช้: {`${account.username}`}</div>
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>เงินคงเหลือ: {`${account.cash}`}</div>
                <div className='w-full text-[#FFFFFF] text-3xl my-4'>แต้มคงเหลือ: {`${account.point}`}</div>
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

export default Profile