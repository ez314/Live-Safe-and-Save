import type { NextPage } from 'next'
import HomeSVG from '../components/svg/HomeSVG'

const Home: NextPage = () => {
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='text-5xl font-black'>Eric Zhang</div>
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <HomeSVG width={20} height={20} />
          <div className='ml-2 text-lg cursor-pointer'>Home Insurance</div>
        </div>
      </div>
      <div className='mt-16 flex flex-col items-center'>
        <div className='text-xl'>Estimated Discount</div>
        <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>140.87</div>
        <div className='my-2 p-2 text-xl font-semibold rounded-xl bg-custom-white-0 border-custom-white-0 text-custom-gray-1 cursor-pointer border-2 hover:bg-custom-gray-1 hover:text-custom-white-0 transition-colors'>Recalculate</div>
      </div>
    </div>
  )
}

export default Home
