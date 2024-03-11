import MetaHeader from '../../components/meta-header/MetaHeader';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';

const WaitingCard = () => {
    const navigate = useNavigate()
    // Swal.fire({
    //     title: "ข้อมูลบัตรสมาชิกไม่ถูกต้อง",
    //     text: "กรุณาสมัครสมาชิก",
    //     icon: "error",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "ใช่, ไปหน้าสมัครสมาชิก",
    //     cancelButtonText: "ไม่, เปลี่ยนบัตรสมาชิก"
    // }).then((result) => {
    //     if(result.isConfirmed){
    //         navigate('/register')
    //     }
    // });
    const handleSubmit = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API}verify-member`)
            console.log(response.data)
            if(response.data.status){
                Swal.fire({
                    title: response.data.message,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1500
                  }).then(() => {
                    navigate('/profile')
                  })
            }else{
                Swal.fire({
                    title: "ข้อมูลบัตรสมาชิกไม่ถูกต้อง",
                    text: "กรุณาสมัครสมาชิก",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#A5DC86",
                    cancelButtonColor: "#F27474",
                    confirmButtonText: "ใช่, ไปหน้าสมัครสมาชิก",
                    cancelButtonText: "ไม่, เปลี่ยนบัตรสมาชิกใหม่"
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate('/register')
                    }
                });
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

    return (
        <div className={`flex justify-center items-center w-screen h-screen bg-gradient-to-r from-[#0aba91] to-[#0ABAB5]`}>
            <MetaHeader title={'กรุณาแนบบัตร'}/>
            <div className='flex flex-nowrap flex-col justify-center items-center w-1/2 rounded-lg bg-[#FFFFFF]'>
                    <div className={`flex flex-nowrap flex-col w-full items-center justify-center flex-1 mt-5`}>
                        <h1 className={`hidden text-nowrap text-xs sm:text-sm lg:text-lg xl:text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] sm:inline-block text-transparent bg-clip-text`}>กรุณาแนบบัตรสมาชิกที่เครื่องอ่านบัตร</h1>
                        <h1 className={`text-nowrap text-xs sm:text-sm lg:text-lg xl:text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block sm:hidden text-transparent bg-clip-text`}>กรุณาแนบบัตรสมาชิก</h1>
                        <h1 className={`text-nowrap text-xs sm:text-sm lg:text-lg xl:text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block sm:hidden text-transparent bg-clip-text`}>ที่เครื่องอ่านบัตร</h1>
                    </div>
                    <div className={`flex flex-nowrap items-center justify-center flex-1 w-full`}>
                    <img className={``} src={require('../../asset/images/card-payment_5227494.png')} alt={`กรุณาแนบบัตร`} />
                    </div>
                    <div className={`flex items-center justify-center w-full flex-1 mb-5`}>
                        <button onClick={handleSubmit} className={`text-xs btn-xs sm:text-sm lg:text-lg xl:text-xl sm:btn-sm lg:btn-lg xl:btn-xl text-[#FFFFFF] btn bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover:bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>ตรวจสอบบัตรสมาชิก</button>
                    </div>
                </div>
        </div>
    )
}

export default WaitingCard