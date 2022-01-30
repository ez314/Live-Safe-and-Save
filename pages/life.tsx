import { NextPage } from "next"
import Header from '../components/Header';
import Chart from '../components/Chart';
import { useState, useEffect } from "react";
import { getUser } from "../util/User";
import Login from "../components/Auth/Login";

export default function Life() {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setUser(getUser())
  }, user)
  if (!user) return <Login />
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      
      <Header name={`${user.firstName} ${user.lastName}`} />

      <div className='mt-16 flex flex-col items-center'>
        <div className='text-xl mb-3 '>Health Score</div>
        {/* <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>140.87</div>
        <div className='custom-btn'>Recalculate</div> */}
        <Chart scores={[22,24,35, 37, 36, 38,40,45]} width={1000}/>
      </div>
    </div>
  )
}