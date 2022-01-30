import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import CheckSVG from "../components/svg/CheckSVG"
import CircleSVG from "../components/svg/CircleSVG"
import BanSVG from "../components/svg/BanSVG"
import HomeSVG from "../components/svg/HomeSVG"
import assetsJson from '../assets.json'
import { processItemName } from "./_app"

const Manage: NextPage = () => {
  const { query } = useRouter()
  let itemName = query.itemName
  if (!itemName || Array.isArray(itemName) || !assetsJson.home.includes(itemName)) {
    return (
      <div className='flex flex-col items-center text-custom-white-0'>
        <div className='text-lg'>Page not found...</div>
      </div>
    )
  }
  itemName = processItemName(itemName)
  const svgSize = 19

  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <Link href='/'>
            <div className='flex flex-col items-center tab-hoverable'>
              <div className='flex flex-row items-center'>
                <HomeSVG width={svgSize} height={svgSize} />
                <div className='ml-2 text-lg cursor-pointer'>Home Insurance</div>
              </div>
              <div className='h-mini bg-custom-white-0 w-0 underline' />
            </div>
          </Link>
          <span>&nbsp;&gt; Manage {itemName}</span>
        </div>
      </div>

      <div className='mt-16 flex flex-col items-center'>
        <div className='custom-btn'>Add {itemName}</div>
      </div>

      <div className='mt-16 space-x-8 flex flex-row items-center'>
        <div className='flex flex-row items-center hover:scale-110 transition'>
          <CheckSVG className='text-custom-green' width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg cursor-pointer'>Approved</span>
        </div>
        <div className='flex flex-row items-center hover:scale-110 transition'>
          <CircleSVG className='text-custom-gray-3' width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg cursor-pointer'>Needs Attention</span>
        </div>
        <div className='flex flex-row items-center hover:scale-110 transition'>
          <BanSVG className='text-custom-red' width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg cursor-pointer'>Expired</span>
        </div>
      </div>


    </div>
  )
}
export default Manage