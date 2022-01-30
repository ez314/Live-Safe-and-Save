import { NextPage } from "next"
import { useRouter } from "next/router";
import HomeSVG from "../components/svg/HomeSVG";

const Manage: NextPage = () => {
  const { query } = useRouter();
  const itemName = query.itemName;

  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <HomeSVG width={20} height={20} />
          <div className='ml-2 text-lg cursor-pointer hover:underline'>Home Insurance</div>
          <span>&nbsp;&gt; Manage {itemName}</span>
        </div>
      </div>

      <div className='mt-16 flex flex-col items-center'>
        <div className='custom-btn'>Add {itemName}</div>
      </div>

      <div className='mt-16 space-x-8 flex flex-row items-center'>
        <div className='flex flex-row items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M6.45324 16.306L0.278237 10.131C-0.0927456 9.76002 -0.0927456 9.15852 0.278237 8.7875L1.62171 7.44399C1.99269 7.07297 2.59423 7.07297 2.96522 7.44399L7.12499 11.6037L16.0348 2.69399C16.4058 2.32301 17.0073 2.32301 17.3783 2.69399L18.7217 4.0375C19.0927 4.40848 19.0927 5.00999 18.7217 5.38101L7.79675 16.306C7.42573 16.677 6.82422 16.677 6.45324 16.306Z" fill="#26CF5E"/>
          </svg>
          <span className='ml-2 text-lg cursor-pointer hover:underline'>Approved</span>
        </div>
        <div className='flex flex-row items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M9.5 0.296875C4.41602 0.296875 0.296875 4.41602 0.296875 9.5C0.296875 14.584 4.41602 18.7031 9.5 18.7031C14.584 18.7031 18.7031 14.584 18.7031 9.5C18.7031 4.41602 14.584 0.296875 9.5 0.296875Z" fill="#9A9A9A"/>
          </svg>
          <span className='ml-2 text-lg cursor-pointer hover:underline'>Needs Update</span>
        </div>
        <div className='flex flex-row items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M9.5 0.296875C4.41728 0.296875 0.296875 4.41724 0.296875 9.5C0.296875 14.5828 4.41728 18.7031 9.5 18.7031C14.5827 18.7031 18.7031 14.5827 18.7031 9.5C18.7031 4.41728 14.5828 0.296875 9.5 0.296875ZM14.3282 4.67177C16.757 7.10051 16.9259 10.8127 15.0955 13.4161L5.58385 3.9045C8.18907 2.07293 11.9008 2.24441 14.3282 4.67177ZM4.67177 14.3282C2.24304 11.8995 2.07412 8.18733 3.90446 5.58388L13.4162 15.0955C10.811 16.9271 7.09917 16.7556 4.67177 14.3282Z" fill="#F24855"/>
          </svg>
          <span className='ml-2 text-lg cursor-pointer hover:underline'>Expired</span>
        </div>
      </div>


    </div>
  )
}
export default Manage