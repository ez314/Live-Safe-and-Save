import { NextPage } from "next"
import HomeSVG from "../components/svg/HomeSVG";

const Manage: NextPage = () => {
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='mt-2 text-lg font-semibold'>Manage Smoke Detectors</div>
      <div className='mt-4 flex flex-col items-center'>
        <div className='custom-btn'>Done</div>
        <div className='custom-btn'>Add smoke detector</div>
      </div>
    </div>
  )
}
export default Manage