import HomeAsset from '../components/HomeAsset'
import assetsJson from '../assets.json'
import { processItemName } from './_app'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { getUser } from '../util/User'
import Login from '../components/Auth/Login'

export default function Index({ assetsData }) {
  const assets = assetsJson.home.map((t) => <HomeAsset key={t} className='m-3' type={processItemName(t)} />)
  // BEGIN ADD THIS WHEN ADDING NEW PAGE
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setUser(getUser())
  }, user)
  if (!user) return <Login />
  // END ADD THIS WHEN ADDING NEW PAGE
  assetsData = assetsData.filter(x => x.owner == user.email)
  let discountNum = 0
  for (let i of assetsData) {
    discountNum += i.discountMultiplier
  }
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <Header name={`${user.firstName} ${user.lastName}`} />

      <div className='mt-16 flex flex-col items-center'>
        <div className='text-xl'>Estimated Discount</div>
        <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>{discountNum.toFixed(2)}</div>
        <div className='custom-btn' onClick={() => window.location.reload()}>Recalculate</div>
      </div>
      <div className='mt-16 flex flex-col items-center justify-center'>
        <div className='text-3xl font-semibold'>Manage Home Safety Features</div>
        <div className='mt-1 flex flex-row flex-wrap max-w-3xl items-center justify-center'>{assets}</div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { db } = require('../util/Firebase')

  const assetsQuery = db.collection('assets')
  const assetsSnapshot = await assetsQuery.get()

  const currentTimestamp = parseInt(Date.now().toString())
  let assetsData = []
  assetsSnapshot.forEach(doc => {
    const lastUpdatedTimestamp = parseInt(doc.data().lastUpdated)
    const ageDays = (currentTimestamp - lastUpdatedTimestamp) / (1000 * 60 * 60 * 24)
    assetsData.push({
      assetId: doc.id,
      lastUpdatedTimestamp,
      discountMultiplier: 1.12 * (ageDays > 30 ? 0 : ageDays > 7 ? (30.0 - ageDays) / 23 : 1),
      ...doc.data(),
    })
  })

  return {
    props: { assetsData }
  }
}