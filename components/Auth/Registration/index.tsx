import { useState, useRef } from "react"
import { UserData } from "../../../util/User"
import { validateEmail, validatePassword } from "../common"

export default function Registration() {
  const [ready, setReady] = useState({ firstName: false, lastName: false, email: false, password: false })
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function register() {
    if (!(ready.firstName && ready.lastName && ready.email && ready.password)) return
    fetch('/api/register', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    }).then(async (res) => {
      if (res.status !== 200) {
        alert("User already registered...")
        return console.log(`Registration error ${res.status}...`)
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
      <div className='mb-7 text-5xl font-black'>Register</div>
      <div className='flex flex-col'>
        <div className='mt-5 text-lg'>First Name</div>
        <input ref={firstNameRef} type='text' className='transition text-custom-gray-0 outline-none border-custom-white-0 border-2 rounded' onChange={() => {
          if (firstNameRef.current?.value && firstNameRef.current?.value.length > 0) {
            firstNameRef.current?.classList.add('border-custom-green')
            firstNameRef.current?.classList.remove('border-custom-red')
            setReady({ ...ready, firstName: true })
          } else {
            firstNameRef.current?.classList.add('border-custom-red')
            firstNameRef.current?.classList.remove('border-custom-green')
            setReady({ ...ready, firstName: false })
          }
        }} />
      </div>
      <div className='flex flex-col'>
        <div className='mt-5 text-lg'>Last Name</div>
        <input ref={lastNameRef} type='text' className='transition text-custom-gray-0 outline-none border-custom-white-0 border-2 rounded' onChange={() => {
          if (lastNameRef.current?.value && lastNameRef.current?.value.length > 0) {
            lastNameRef.current?.classList.add('border-custom-green')
            lastNameRef.current?.classList.remove('border-custom-red')
            setReady({ ...ready, lastName: true })
          } else {
            lastNameRef.current?.classList.add('border-custom-red')
            lastNameRef.current?.classList.remove('border-custom-green')
            setReady({ ...ready, lastName: false })
          }
        }} />
      </div>
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
      <div className='mt-5 flex flex-row'>
      <div className={`custom-btn px-10 ${(ready.firstName && ready.lastName && ready.email && ready.password) ? 'hover:bg-custom-green hover:border-custom-green' : 'hover:bg-custom-red hover:border-custom-red'}`} onClick={() => register()}>Register</div>
      </div>
    </div>
  )
}