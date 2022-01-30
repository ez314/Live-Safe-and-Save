import Link from "next/link"
import { useRouter } from "next/router"
import Header from "../components/Header";
import CheckSVG from "../components/svg/CheckSVG"
import CircleSVG from "../components/svg/CircleSVG"
import BanSVG from "../components/svg/BanSVG"
import HomeSVG from "../components/svg/HomeSVG"
import assetsJson from '../assets.json'
import { processItemName } from "./_app"
import AssetCard from "../components/AssetCard";
import {db} from "../util/Firebase";
import Login from "../components/Auth/Login";
import { useState, useEffect } from "react";
import { getUser } from "../util/User";

export default function Manage({assetsData}) {
  const [activeFilter, setActiveFilter] = useState(true);
  const [needsAttentionFilter, setNeedsAttentionFilter] = useState(true);
  const [expiredFilter, setExpiredFilter] = useState(true);

  const { query } = useRouter()

  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setUser(getUser())
  }, user)
  if (!user) return <Login />

  let itemName = query.itemName
  if (!itemName || Array.isArray(itemName) || !assetsJson.home.includes(itemName)) {
    return (
      <div className='flex flex-col items-center text-custom-white-0'>
        <div className='text-lg'>Page not found...</div>
      </div>
    )
  }
  itemName = processItemName(itemName)

  assetsData = assetsData.filter(x => x.type == query.itemName && x.owner == user.email)

  const svgSize = 19

  const whyItem = `Why should I have a ${itemName}? Because it is good! Everyone has one, so you should have one too. A ${itemName} is absolutely essential and saves 18219 homes in the United States last year.`

  return (
    <div className='mt-16 px-24 flex flex-col items-center text-custom-white-0'>
      <Header name={`${user.firstName} ${user.lastName}`} />
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

      <div className='flex mt-4 text-center max-w-2xl'>{whyItem}</div>

      <div className='mt-16 flex flex-col items-center'>
        <Link href={`/add?itemName=${itemName.toLowerCase()}`}>
          <div className='custom-btn'>Add {itemName}</div>
        </Link>
      </div>

      <div className='mt-16 space-x-8 flex flex-row items-center'>
        <div
          className='flex flex-row items-center hover:scale-110 transition cursor-pointer'
          onClick={() => setActiveFilter(!activeFilter)}
        >
          <CheckSVG className={`${activeFilter ? 'text-custom-green' : 'text-custom-gray-3'} transition`} width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg'>Active</span>
        </div>
        <div
          className='flex flex-row items-center hover:scale-110 transition cursor-pointer'
          onClick={() => setNeedsAttentionFilter(!needsAttentionFilter)}
        >
          <CircleSVG className={`${needsAttentionFilter ? 'text-custom-gold' : 'text-custom-gray-3'} transition`} width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg'>Needs Attention</span>
        </div>
        <div
          className='flex flex-row items-center hover:scale-110 transition cursor-pointer'
          onClick={() => setExpiredFilter(!expiredFilter)}
        >
          <BanSVG className={`${expiredFilter ? 'text-custom-red' : 'text-custom-gray-3'} transition`} width={svgSize} height={svgSize} />
          <span className='ml-2 text-lg'>Expired</span>
        </div>
      </div>

      <div className='mt-16 space-y-16 w-full flex flex-col items-center'>
        {
          assetsData
            .filter((data) => data.state == 'active' && activeFilter || data.state == 'needs-attention' && needsAttentionFilter || data.state == 'expired' && expiredFilter)
            .map(
            ({type, assetId, assetName, img, state}) =>
              <AssetCard key={assetId} type={type} assetId={assetId} assetName={assetName} img={img} state={state}/>
          )
        }
      </div>

    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { db } = require('../util/Firebase')

  const assetsQuery = db.collection('assets')
  const assetsSnapshot = await assetsQuery.get()

  const currentTimestamp = (new Date()).getTime()
  let assetsData = []
  assetsSnapshot.forEach(doc => {
    const lastUpdatedTimestamp = Date.parse(doc.data().lastUpdated)
    const ageDays = (currentTimestamp - lastUpdatedTimestamp) / (1000 * 60 * 60 * 24)
    assetsData.push({
      assetId: doc.id,
      lastUpdatedTimestamp,
      state: ageDays > 30 ? 'expired' : ageDays > 7 ? 'needs-attention' : 'active',
      ...doc.data(),
    })
  });

  console.log(assetsData)

  return {
    props: {assetsData}
  }
}