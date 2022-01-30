import { NextPage } from "next"
import HomeSVG from "../components/svg/HomeSVG";

const Manage: NextPage = () => {
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <HomeSVG width={20} height={20} />
          <div className='ml-2 text-lg cursor-pointer hover:underline'>Home Insurance</div>
          <span>&nbsp;&gt; Manage Smoke Detectors</span>
        </div>
      </div>
      <div className='mt-16 flex flex-col items-center'>
        <div className='custom-btn'>Add smoke detector</div>
      </div>
    </div>
  )
}
export default Manage