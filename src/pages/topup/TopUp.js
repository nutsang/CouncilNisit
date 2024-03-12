import MetaHeader from '../../components/meta-header/MetaHeader';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

const TopUp = () => {
    const navigate = useNavigate()
    const [cash, setCash] = useState(0)
    const [account, setAccount] = useState({ cardID: 'ไม่พบข้อมูล', studentId: 'ไม่พบข้อมูล', studentName: 'ไม่พบข้อมูล', studentLastName: 'ไม่พบข้อมูล', username: 'ไม่พบข้อมูล', cash: 0, point: 0 })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}profile`)
            .then((response) => {
                if (response.data.status) {
                    setAccount(response.data.message)
                } else {
                    navigate("/")
                }
            })
            .catch((error) => {
                navigate("/")
            })
    }, [])
    const handleSubmit = (event) => {
        axios.get(`${process.env.REACT_APP_API}profile`)
            .then((response) => {
                if (response.data.status) {

                } else {
                    navigate("/")
                }
            })
            .catch((error) => {
                navigate("/")
            })

        if (cash > 0) {
            axios.post(`${process.env.REACT_APP_API}topUpCashCard`, {
                cash: cash
            })
                .then((response) => {
                    if (response.status === 200 && response.data !== "Not member, please sign up first") {
                        Swal.fire({
                            title: "เติมเงินสำเร็จ",
                            text: "เติมเงินสำเร็จ",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then(() => {
                                setCash(0);
                                axios.post(`${process.env.REACT_APP_API}createTransactionTopUp`, {
                                    cash: cash
                                })
                                    .then(() => {

                                    })
                            })
                            .catch((error) => {

                            })
                    }
                })
                .catch((error) => {

                })
        }
    }
    return (
        <div>
            <MetaHeader title={'เติมเงิน'} />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <div className='size-full flex flex-col items-center justify-center'>
                        <div className='flex w-[100px] h-[100px] '>
                            <div className='flex bg-[#0aba91] btn-success rounded-box w-full h-full items-center justify-center text-xl'>{account.cash}</div>
                        </div>
                        <label className="form-control w-full mx-5">
                        </label>
                        <div className='flex w-full'>
                            <label className="form-control w-full mx-5">
                                <div className="label">
                                    <span className="label-text">ชื่อ</span>
                                </div>
                                <input type="text" placeholder="ชื่อ" value={`${account.studentName}`} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full mx-5">
                                <div className="label">
                                    <span className="label-text">นามสกุล</span>
                                </div>
                                <input type="text" placeholder="นามสกุล" value={`${account.studentLastName}`} className="input input-bordered w-full" />
                            </label>
                        </div>
                        <label className="form-control w-full mx-5">
                            <div className="label">
                                <span className="label-text">จำนวนเงินที่ต้องการ (บาท)</span>
                            </div>
                            <input value={cash} onChange={(event) => setCash(event.target.value)} type="text" placeholder="จำนวนเงินที่ต้องการ (บาท)" className="input input-bordered w-full" />
                        </label>
                        <div className='flex w-full flex-row items-center justify-center'>
                            <button onClick={() => setCash(50)} className='btn grow mx-3 bg-[#E3C7FF]'>50</button>
                            <button onClick={() => setCash(100)} className='btn grow mx-3 bg-[#E3C7FF]'>100</button>
                            <button onClick={() => setCash(150)} className='btn grow mx-3 bg-[#E3C7FF]'>150</button>
                            <button onClick={() => setCash(200)} className='btn grow mx-3 bg-[#E3C7FF]'>200</button>
                            <button onClick={() => setCash(500)} className='btn grow mx-3 bg-[#E3C7FF]'>500</button>
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