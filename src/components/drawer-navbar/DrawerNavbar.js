import { Link } from 'react-router-dom'

const DrawerNavber = ({ title }) => {
    return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center ">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
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
    )
}

export default DrawerNavber