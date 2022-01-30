import { useState, useRef } from "react"
import { UserData } from "../../../util/User"
import { validateEmail, validatePassword } from "../common"
import Registration from "../Registration"

export default function Login() {
  const [ready, setReady] = useState({ email: false, password: false })
  const [register, setRegister] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  if (register) return <Registration />
  function login() {
    if (!(ready.email && ready.password)) return
    fetch('/api/login', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    }).then(async (res) => {
      if (res.status !== 200) {
        alert("Invalid username or password...")
        return console.log(`Login error ${res.status}...`)
      }
      const data = (await res.json()).data
      const userData: UserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <div className='mb-7 text-5xl font-black'>Login</div>
      <div className='flex flex-col'>
        <div className='mt-5 text-lg'>Email</div>
        <input ref={emailRef} type='text' className='transition text-custom-gray-0 outline-none border-custom-white-0 border-2 rounded' onChange={() => {
          if (emailRef.current?.value && emailRef.current?.value.length > 0 && validateEmail(emailRef.current?.value)) {
            emailRef.current?.classList.add('border-custom-green')
            emailRef.current?.classList.remove('border-custom-red')
            setReady({ ...ready, email: true })
          } else {
            emailRef.current?.classList.add('border-custom-red')
            emailRef.current?.classList.remove('border-custom-green')
            setReady({ ...ready, email: false })
          }
        }} />
      </div>
      <div className='flex flex-col'>
        <div className='mt-5 text-lg'>Password</div>
        <input ref={passwordRef} type='password' className='transition text-custom-gray-0 outline-none border-custom-white-0 border-2 rounded' onChange={() => {
          if (passwordRef.current?.value && passwordRef.current?.value.length > 0 && validatePassword(passwordRef.current?.value)) {
            passwordRef.current?.classList.add('border-custom-green')
            passwordRef.current?.classList.remove('border-custom-red')
            setReady({ ...ready, password: true })
          } else {
            passwordRef.current?.classList.add('border-custom-red')
            passwordRef.current?.classList.remove('border-custom-green')
            setReady({ ...ready, password: false })
          }
        }} />
      </div>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <div className={`custom-btn px-10 hover:text-custom-white-0 ${(ready.email && ready.password) ? 'hover:bg-custom-green hover:border-custom-green' : 'hover:bg-custom-red hover:border-custom-red'}`} onClick={() => login()}>Login</div>
        <div className='custom-btn px-10' onClick={() => setRegister(true)}>Register</div>
      </div>
    </div>
  )
}