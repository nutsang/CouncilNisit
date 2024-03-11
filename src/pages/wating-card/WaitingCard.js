import MetaHeader from '../../components/meta-header/MetaHeader';
import Swal from 'sweetalert2';
import axios from 'axios';

const handleSubmit = () => {
    Swal.fire({
        title: "ข้อมูลบัตรสมาชิกไม่ถูกต้อง",
        text: "You clicked the button!",
        icon: "error"
    });
}

const WaitingCard = () => {
    return (
        <div className={`flex justify-center items-center w-screen h-screen p-32 bg-gradient-to-r from-[#0aba91] to-[#0ABAB5]`}>
            <MetaHeader title={'กรุณาแนบบัตร'}/>
            <div className='flex flex-col justify-center items-center w-full h-full rounded-lg bg-[#FFFFFF]'>
                <div>
                    <h1 className={`text-4xl bg-gradient-to-r from-[#ba0a0a] to-[#f22929] inline-block text-transparent bg-clip-text`}>กรุณา <span className={`btn text-4xl text-[#FFFFFF] bg-gradient-to-r from-[#ba0a0a] to-[#f22929]`}>แนบ</span> บัตรสมาชิกที่เครื่องอ่านบัตร</h1>
                </div>
                <div className={`size-auto w-3/12 my-20`}>
                    <img className={`size-full`} src={require('../../asset/images/waiting.gif')} alt={`กรุณาแนบบัตร`} />
                </div>
                <div>
                    <button onClick={handleSubmit} className={`text-2xl text-[#FFFFFF] btn btn- bg-gradient-to-r from-[#0aba91] to-[#0ABAB5] hover: btn-bg-gradient-to-r hover:from-[#0ABAB5] hover:to-[#0aba91]`}>ตรวจสอบบัตรสมาชิก</button>
                </div>
            </div>
        </div>
    )
}

export default WaitingCard