import type { NextPage } from 'next'
import HomeAsset from '../components/HomeAsset'
import Header from '../components/Header'

const Home: NextPage = () => {
  const assets = ['Smoke Detector', 'Storm Shutter', 'Roof', 'Heating', 'Plumbing', 'Electrical', 'Security Camera', 'Deadbolt Lock', 'Sprinkler System'].map((t) => <HomeAsset className='m-3' type={t} />)
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
        <div className='mt-1 flex flex-row flex-wrap max-w-3xl'>{assets}</div>
      </div>
    </div>
  )
}

export default Home
