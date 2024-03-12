import MetaHeader from '../../components/meta-header/MetaHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

const RedeemReward = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState({cardID: 'ไม่พบข้อมูล', studentId:'ไม่พบข้อมูล', studentName:'ไม่พบข้อมูล', studentLastName:'ไม่พบข้อมูล', username:'ไม่พบข้อมูล', cash: 0, point: 0})
    const [redeemItems, setRedeemItems] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}profile`)
        .then((response) => {
            if(response.data.status){
                setAccount(response.data.message)
                axios.get(`${process.env.REACT_APP_API}redeem-items`)
                .then((response) => {
                    if(response.data.status){
                        setRedeemItems(response.data.message)
                    }else{
                        setRedeemItems([])
                    }
                })
                .catch((error) => {
                    setRedeemItems([])
                })
            }else{
                navigate("/")
            }
        })
        .catch((error) => {
            navigate("/")
        })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(`${process.env.REACT_APP_API}calculate-point`, {redeemItems: redeemItems})
            if(response.data.status){
                try{
                    Swal.fire({
                        title: "กรุณากรอกรหัส OTP",
                        input: "text",
                        inputAttributes: {
                          autocapitalize: "off"
                        },
                        showCancelButton: true,
                        showLoaderOnConfirm: true,
                        confirmButtonText: "ยืนยัน OTP",
                        cancelButtonText: "ยกเลิก",
                        confirmButtonColor: "#A5DC86",
                        cancelButtonColor: "#F27474",
                        inputPlaceholder: "กรอกเลข OTP 6 หลัก",
                        preConfirm: async (recivedOTP) => {
                            try{
                                const response = await axios.post(`${process.env.REACT_APP_API}verify-otp`, {recivedOTP:recivedOTP})
                                return response.data
                            }catch(error){
                                return {"status": false, "message": "รหัส OTP ไม่ถูกต้อง"}
                            }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                      }).then((result) => {
                        if (result.isConfirmed) {
                            if(result.value.status){
                                Swal.fire({
                                    title: result.value.message,
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then( async () => {
                                    try{
                                        const response = await axios.post(`${process.env.REACT_APP_API}redeem`, {redeemItems: redeemItems})
                                        if(response.data.status){
                                            Swal.fire({
                                                title: "แลกสินค้าสำเร็จ",
                                                text: "กรุณาตรวจสอบสินค้า",
                                                icon: "success",
                                                showConfirmButton: false,
                                                timer: 1500
                                            }).then(() => {
                                                setAccount({...account, point: response.data.message.point})
                                            })
                                        }else{
                                            Swal.fire({
                                                title: 'แลกสินค้าล้มเหลว',
                                                icon: "error",
                                                confirmButtonColor: "#A5DC86",
                                                confirmButtonText: "รับทราบ",
                                            })
                                        }
                                    }catch(error){
                                        Swal.fire({
                                            title: 'แลกสินค้าล้มเหลว',
                                            icon: "error",
                                            confirmButtonColor: "#A5DC86",
                                            confirmButtonText: "รับทราบ",
                                        })
                                    }
                                })
                            }else{
                                Swal.fire({
                                    title: result.value.message,
                                    icon: "error",
                                    confirmButtonColor: "#A5DC86",
                                    confirmButtonText: "รับทราบ",
                                })
                            }
                        }
                      });
                    const response = await axios.post(`${process.env.REACT_APP_API}sendOTP`, account)
                    if(!response.data.status){
                        Swal.fire({
                            title: "สมัครสมาชิกไม่สำเร็จ",
                            text: "มีผู้ใช้งานบัตรสมาชิกนี้แล้ว",
                            icon: "error",
                            confirmButtonColor: "#A5DC86",
                            confirmButtonText: "รับทราบ",
                        })
                    }
                }catch(error){
                    if(error.response.status === 500){
                        Swal.fire({
                            title: error.response.data.message,
                            text: "มีผู้ใช้งานบัตรสมาชิกนี้แล้ว",
                            icon: "error",
                            confirmButtonColor: "#A5DC86",
                            confirmButtonText: "รับทราบ",
                        })
                    }else{
                        Swal.fire({
                            title: "เซิฟเวอร์กำลังปิดปรับปรุง...",
                            text: "ขออภัยในความไม่สะดวก",
                            icon: "error",
                            confirmButtonColor: "#A5DC86",
                            confirmButtonText: "รับทราบ",
                        })
                    }
                }
            }
        }catch(error){
            if(!error.response.data.status){
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500
                })   
            }else{
                Swal.fire({
                    title: "จำนวนแต้มไม่เพียงพอ",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    return (
        <div>
            <MetaHeader title={'แลกรางวัล'}/>
            <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <div className="overflow-x-auto w-full">
                        <table className="table table-zebra text-center">
                            {/* head */}
                            <thead className='bg-gradient-to-r from-[#ba0a0a] to-[#f22929] text-[#FFFFFF] text-xl'>
                            <tr>
                                {/* <th>รหัสบัตรสมาชิก</th> */}
                                <th>รหัสนิสิต</th>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>แต้มคงเหลือ</th>
                            </tr>
                            </thead>
                            <tbody className='text-lg'>
                            {/* row 1 */}
                            <tr>
                                {/* <th>{`${account.cardID}`}</th> */}
                                <td>{`${account.studentId}`}</td>
                                <td>{`${account.studentName}`}</td>
                                <td>{`${account.studentLastName}`}</td>
                                <td>{`${account.point}`}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                <div className="overflow-x-auto w-full">
                        <table className="table table-zebra text-center">
                            {/* head */}
                            <thead className='bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] text-[#FFFFFF] text-xl'>
                            <tr>
                                <th>#</th>
                                <th>รางวัล</th>
                                <th>แต้ม</th>
                                <th>จำนวน</th>
                            </tr>
                            </thead>
                            <tbody className='text-lg'>
                            {(redeemItems.length > 0) && redeemItems.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <th>{index+1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.point}</td>
                                        <td>
                                            <button onClick={()=>{
                                                const updatedRedeemItems = [...redeemItems]
                                                if(updatedRedeemItems[index].amount - 1 >= 0){
                                                    updatedRedeemItems[index].amount -= 1
                                                    setRedeemItems(updatedRedeemItems)
                                                }
                                            }
                                            } className='btn btn-error text-[#FFFFFF] text-xl'>-</button>
                                            <input min={0} value={item.amount} type='number' onChange={(event)=>{
                                                if(parseInt(event.target.value) >= 0){
                                                    const updatedRedeemItems = [...redeemItems]
                                                    updatedRedeemItems[index].amount = parseInt(event.target.value)
                                                    setRedeemItems(updatedRedeemItems)
                                                }
                                            }} className='text-xl text-center input input-ghost'/>
                                            <button onClick={()=>{
                                                const updatedRedeemItems = [...redeemItems]
                                                updatedRedeemItems[index].amount += 1
                                                setRedeemItems(updatedRedeemItems)
                                            }} className='btn btn-success text-[#FFFFFF] text-xl'>+</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleSubmit} type='button' className={`my-5 text-xs btn-xs sm:text-sm lg:text-lg xl:text-xl sm:btn-sm lg:btn-lg xl:btn-xl text-[#FFFFFF] btn bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover:bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>ยืนยัน</button>
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

export default RedeemReward