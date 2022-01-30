import { NextPage } from "next"
import { useState } from "react"
import { GoogleLogin } from 'react-google-login';
import Header from '../components/Header';
import Chart from '../components/Chart';

const Life: NextPage = () => {
    let [connected, setConnected] = useState(0);
    let status = "Exceptional"
    let statusColor = "green"

    const responseGoogle = (response) => {

        setConnected(connected+1)
        setInterval(() => {
          setConnected(100)
        }, 8000)
    }

  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      
      <Header name="Eric Zhang" />

      <div className='mt-16 flex flex-col items-center'>
          {connected > 1 ? 
          <>
          <div className='text-xl mb-3'>Health Score</div>
          {/* <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>140.87</div>
          <div className='custom-btn'>Recalculate</div> */}
          <Chart scores={[22,24,35,37,36,38,40,45]} width={1000}/>
  
          <span className='text-3xl mt-3'>Your Status: <span className={`text-${statusColor}-300`}>{status}</span></span>
          </> 
          :
          connected == 1 ?
          <>
            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </button>
          </>
          :
          <button onClick={responseGoogle}>
           <GoogleLogin
            clientId="493287411019-43n1uaqe9tg03pkmpdv7um32f14ctc8l.apps.googleusercontent.com"
            buttonText="Login"
            // onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            // cookiePolicy={'single_host_origin'}
        />
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setConnected(true)}>Connect to Fitbit</button> */}
          </button>
        }
      </div>
    </div>
  )
}
export default Life