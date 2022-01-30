import Link from "next/link"
import { useRouter } from "next/router"
import CheckSVG from "../components/svg/CheckSVG"
import CircleSVG from "../components/svg/CircleSVG"
import BanSVG from "../components/svg/BanSVG"
import HomeSVG from "../components/svg/HomeSVG"
import assetsJson from '../assets.json'
import { processItemName } from "./_app"
import AssetCard from "../components/AssetCard";
import {db} from "../util/Firebase";
import Header from "../components/Header";

export default function Manage({userData}) {
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

  const whyItem = `Why should I have a ${itemName}? Because it is good! Everyone has one, so you should have one too. A ${itemName} is absolutely essential and saves 18219 homes in the United States last year.`

  return (
    <div className='mt-16 px-24 flex flex-col items-center text-custom-white-0'>
      <Header name={userData.name} />
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <Link href='/'>
            <div className='relative flex flex-col items-center tab-hoverable'>
              <div className='flex flex-row items-center'>
                <HomeSVG width={svgSize} height={svgSize} />
                <div className='ml-2 text-lg cursor-pointer'>Home Insurance</div>
              </div>
              <div className='absolute bottom-0 h-mini bg-custom-white-0 w-0 underline' />
            </div>
          </Link>
          <span>&nbsp;&gt; Manage {itemName}</span>
        </div>
      </div>

      <div className='flex mt-4 text-center'>{whyItem}</div>

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

      <div className='mt-16 space-y-16 w-full flex flex-col items-center'>
        <AssetCard type={itemName} assetId={'asdf1234'} name='Bedroom' img={"https://media.discordapp.net/attachments/937113903048036382/937114671968825424/IMG_20220129_163859.jpg?width=1410&height=1058"}/>
      </div>
      <div className='mt-16 space-y-16 w-full flex flex-col items-center'>
        <AssetCard type={itemName} assetId={'asdf1234'} name='Living Room' img={"https://media.discordapp.net/attachments/936871002418319364/937113410229895228/IMG_0160.jpg?width=1410&height=1410"}/>
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  const { db } = require('../util/Firebase')

  // todo: actually have login
  const usersRef = db.collection('users').doc('ericz314271@gmail.com')
  const userSnapshot = await usersRef.get()

  const userData = userSnapshot.data();

  return {
    props: {userData}
  }
}