import Link from 'next/link'
import HomeSVG from '../svg/HomeSVG'
import HeartSVG from '../svg/HeartSVG'
import LogoutSVG from '../svg/LogoutSVG'
import { signOut } from '../../util/User'

export default function Header({name}) {
    return (
        <>
        <div className='flex flex-row items-center justify-center'>
          <div className='text-5xl font-black mr-4'>{name.toUpperCase()}</div>
          <LogoutSVG className='cursor-pointer hover:text-custom-blue transition' width={28} height={28} onClick={() => {
            signOut()
            window.location.reload()
          }} />
        </div>
        <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-col items-center justify-center tab-hoverable hover:text-custom-blue transition mx-3'>
          <div className='flex flex-row items-center'>
            <HomeSVG width={20} height={20} />
            <div className='ml-2 text-lg cursor-pointer'><Link href="/">Home Insurance</Link></div>
          </div>
          <div className='h-mini bg-custom-white-0 w-0 underline' />
        </div>
        <div className='flex flex-col items-center justify-center tab-hoverable hover:text-custom-blue transition mx-3'>
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