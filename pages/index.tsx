import type { NextPage } from 'next'
import HomeAsset from '../components/HomeAsset'
import HomeSVG from '../components/svg/HomeSVG'
import assetsJson from '../assets.json'
import { processItemName } from './_app'

const Home: NextPage = () => {
  const assets = assetsJson.home.map((t) => <HomeAsset key={t} className='m-3' type={processItemName(t)} />)
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-col items-center justify-center tab-hoverable'>
          <div className='flex flex-row items-center'>
            <HomeSVG width={20} height={20} />
            <div className='ml-2 text-lg cursor-pointer'>Home Insurance</div>
          </div>
          <div className='h-mini bg-custom-white-0 w-0 underline' />
        </div>
      </div>
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
