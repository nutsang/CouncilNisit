import MetaHeader from '../../components/meta-header/MetaHeader';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react'
const Register = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState({studentId:'', studentName:'', studentLastName:'', username:''})

    const setStudentId = (studentId) => {
        setAccount({...account, studentId:studentId.target.value})
    }

    const setStudentName = (studentName) => {
        setAccount({...account, studentName:studentName.target.value})
    }

    const setStudentLastName = (studentLastName) => {
        setAccount({...account, studentLastName:studentLastName.target.value})
    }

    const setUsername = (username) => {
        setAccount({...account, username:username.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(account.studentId.length <= 0 || account.studentName.length <= 0 || account.studentLastName.length <= 0 || account.username.length <= 0){
            Swal.fire({
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                text: account.studentId.length <= 0 ? "กรุณากรอกรหัสนิสิต" : account.studentName.length <= 0 ? "กรุณากรอกชื่อ" : account.studentLastName.length <= 0 ? "กรุณากรอกนามสกุล" : "กรุณากรอกชื่อผู้ใช้",
                icon: "warning",
                confirmButtonColor: "#A5DC86",
                confirmButtonText: "รับทราบ",
            })
        }else{
            try{
                const response = await axios.get(`${process.env.REACT_APP_API}verify-member`)
                if(response.data.status){
                    Swal.fire({
                        title: "สมัครสมาชิกไม่สำเร็จ",
                        text: "มีผู้ใช้งานบัตรสมาชิกนี้แล้ว",
                        icon: "error",
                        confirmButtonColor: "#A5DC86",
                        confirmButtonText: "รับทราบ",
                    })
                }else{
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
                                            const response = await axios.post(`${process.env.REACT_APP_API}register`, account)
                                            if(response.data.status){
                                                Swal.fire({
                                                    title: response.data.message,
                                                    text: "กำลังไปหน้าโปรไฟล์",
                                                    icon: "success",
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                }).then(() => {
                                                    setAccount({studentId:'', studentName:'', studentLastName:'', username:''})
                                                    navigate('/profile')
                                                })
                                            }else{
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
                if(error.response.status === 404){
                    Swal.fire({
                        title: error.response.data.message,
                        text: "ท่านยังไม่ได้แนบบัตร กรุณาลองใหม่",
                        icon: "warning",
                        confirmButtonColor: "#A5DC86",
                        confirmButtonText: "รับทราบ",
                    })
                }else if(error.response.status === 500){
                    Swal.fire({
                        title: error.response.data.message,
                        text: "ขออภัยในความไม่สะดวก",
                        icon: "error",
                        confirmButtonColor: "#A5DC86",
                        confirmButtonText: "รับทราบ",
                    })
                }
            }
        }
    }
    return (
        <div className={`flex justify-center items-center w-screen h-screen bg-gradient-to-r from-[#0aba91] to-[#0ABAB5]`}>
            <MetaHeader title={'สมัครสมาชิก'}/>
            <div className='flex flex-nowrap flex-col justify-center items-center w-1/2 rounded-lg bg-[#FFFFFF]'>
                    <div className={`flex flex-nowrap flex-col w-full items-center justify-center flex-1 my-5`}>
                        <h1 className={`text-nowrap text-xs sm:text-sm lg:text-lg xl:text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block text-transparent bg-clip-text`}>สมัครสมาชิก</h1>
                    </div>
                    <form onSubmit={handleSubmit} className={`size-full form-control justify-center items-center`}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">รหัสนิสิต</span>
                            </div>
                            <input value={account.studentId} onChange={setStudentId} name="studentId" type="text" placeholder="รหัสนิสิต" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">ชื่อ</span>
                            </div>
                            <input value={account.studentName} onChange={setStudentName} name="studentName" type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span name="studentLastName" className="label-text">นามสกุล</span>
                            </div>
                            <input value={account.studentLastName} onChange={setStudentLastName} type="text" placeholder="นามสกุล" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">ชื่อผู้ใช้</span>
                            </div>
                            <input value={account.username} onChange={setUsername} name="username" type="text" placeholder="ชื่อผู้ใช้" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <div>
                            <button type={`submit`} className={`my-5 text-xs btn-xs sm:text-sm lg:text-lg xl:text-xl sm:btn-sm lg:btn-lg xl:btn-xl text-[#FFFFFF] btn bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover:bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>ยืนยัน</button>
                            <Link to={`/`} className={`my-5 text-xs btn-xs sm:text-sm lg:text-lg xl:text-xl sm:btn-sm lg:btn-lg xl:btn-xl text-[#FFFFFF] btn bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover:bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>กลับไปหน้าเข้าสู่ระบบ</Link>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Register