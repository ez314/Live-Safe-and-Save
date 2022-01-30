import Link from 'next/link'
import HomeSVG from './svg/HomeSVG'
import HeartSVG from './svg/HeartSVG'

export default function Header() {
    return (
        <>
        <div className='text-5xl font-black'>Eric Zhang</div>
        <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-col items-center justify-center tab-hoverable mx-3'>
          <div className='flex flex-row items-center'>
            <HomeSVG width={20} height={20} />
            <div className='ml-2 text-lg cursor-pointer'><Link href="/">Home Insurance</Link></div>
          </div>
          <div className='h-mini bg-custom-white-0 w-0 underline' />
        </div>
        <div className='flex flex-col items-center justify-center tab-hoverable mx-3'>
          <div className='flex flex-row items-center'>
            <HeartSVG width={20} height={20} />
            <div className='ml-2 text-lg cursor-pointer'><Link href="/life">Life Insurance</Link></div>
          </div>
          <div className='h-mini bg-custom-white-0 w-0 underline' />
        </div>
      </div>
      </>
    )
}