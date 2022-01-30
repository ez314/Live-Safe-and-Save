import type { NextPage } from 'next'
import HomeAsset from '../components/HomeAsset'
import assetsJson from '../assets.json'
import { processItemName } from './_app'
import Header from '../components/Header'

const Home: NextPage = () => {
  const assets = assetsJson.home.map((t) => <HomeAsset key={t} className='m-3' type={processItemName(t)} />)
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <Header />

      <div className='mt-16 flex flex-col items-center'>
        <div className='text-xl'>Estimated Discount</div>
        <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>140.87</div>
        <div className='custom-btn'>Recalculate</div>
      </div>
      <div className='mt-16 flex flex-col items-center justify-center'>
        <div className='text-3xl font-semibold'>Manage Assets</div>
        <div className='mt-1 flex flex-row flex-wrap max-w-3xl items-center justify-center'>{assets}</div>
      </div>
    </div>
  )
}

export default Home
