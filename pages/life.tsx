import { NextPage } from "next"
import Header from '../components/Header';
import Chart from '../components/Chart';

const Life: NextPage = () => {
  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      
      <Header />

      <div className='mt-16 flex flex-col items-center'>
        <div className='text-xl mb-3 '>Health Score</div>
        {/* <div className='my-2 text-4xl font-extrabold'><span className='text-custom-green'>$</span>140.87</div>
        <div className='custom-btn'>Recalculate</div> */}
        <Chart scores={[22,24,35, 37, 36, 38,40,45]} width={1000}/>
      </div>
    </div>
  )
}
export default Life