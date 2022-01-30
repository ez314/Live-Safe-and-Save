import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import CheckSVG from "../components/svg/CheckSVG"
import CircleSVG from "../components/svg/CircleSVG"
import BanSVG from "../components/svg/BanSVG"
import HomeSVG from "../components/svg/HomeSVG"
import assetsJson from '../assets.json'
import { processItemName } from "./_app"
import { useEffect, useRef, useState } from "react"
import { getUser } from "../util/User"
import Login from "../components/Auth/Login"
import Header from "../components/Header"
import { storage } from "../util/Storage"
import { ref, uploadBytes } from 'firebase/storage'

export default function Add() {
  const { query } = useRouter()
  const imageRef = useRef<HTMLDivElement>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)
  const invoiceRef = useRef<HTMLDivElement>(null)
  const inputInvoiceRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const [ready, setReady] = useState({ imageReady: false, invoiceReady: false, nameReady: false })
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setUser(getUser())
  }, user)
  if (!user) return <Login />
  let itemName = query.itemName
  if (!itemName || Array.isArray(itemName) || !assetsJson.home.includes(itemName)) {
    return (
      <div className='flex flex-col items-center text-custom-white-0'>
        <div className='text-lg'>Page not found...</div>
      </div>
    )
  }
  function addAsset() {
    const itemName = query.itemName as string
    const assetRef = ref(storage, `asset/${user.firstName}_${user.lastName}_${itemName.replaceAll(" ", "_")}_${nameRef.current.value}`)
    const invoiceRef = ref(storage, `invoice/${user.firstName}_${user.lastName}_${itemName.replaceAll(" ", "_")}_${nameRef.current.value}`)
    async function upload() {
      let imageUrl = ''
      let invoiceUrl = ''
      if (inputImageRef.current.files[0]) {
        await uploadBytes(assetRef, inputImageRef.current.files[0]).then((result) => {
          imageUrl = `https://storage.googleapis.com/tamuhack-s22.appspot.com/${result.ref.fullPath}`
        }).catch((err) => {
          console.log(err)
        })
      }
      if (inputInvoiceRef.current.files[0]) {
        await uploadBytes(invoiceRef, inputInvoiceRef.current.files[0]).then((result) => {
          invoiceUrl = `https://storage.googleapis.com/tamuhack-s22.appspot.com/${result.ref.fullPath}`
        }).catch((err) => {
          console.log(err)
        })
      }
      fetch('/api/add', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          name: nameRef.current.value,
          imgUrl: imageUrl,
          invoiceUrl: invoiceUrl,
          lastUpdated: Date.now().toString(),
          owner: user.email,
          type: itemName,
          firstName: user.firstName,
          lastName: user.lastName,
        })
      }).then(async (res) => {
        if (res.status !== 200) {
          console.log(res.status)
        }
        //window.open('/', '_self')
      }).catch((err) => console.log(err))
      let objectDetect = false
      if (inputImageRef.current?.files.length > 0) {
        const formData = new FormData()
        formData.append('image', inputImageRef.current.files[0])
        formData.append('expected', itemName)
        await fetch('http://localhost:5000/objectDetect', {
          mode: 'cors',
          method: 'POST',
          body: formData
        }).then((res) => res.json()).then((data) => {
          if (data.result) {
            objectDetect = true
          }
        }).catch(error => {
          console.error(error)
        })
      }
      let nlp = false
      let nlpresult = {}
      if (inputInvoiceRef.current?.files.length > 0) {
        nlp = true
        const formData2 = new FormData()
        formData2.append('image', inputInvoiceRef.current.files[0])
        await fetch('http://localhost:5000/invoiceDetect', {
          mode: 'cors',
          method: 'POST',
          body: formData2
        }).then((res) => res.json()).then((data) => {
          nlpresult = data.result
        }).catch(error => {
          console.error(error)
        })
      }
      if (objectDetect) {
        let msg = "Upload accepted..."
        if(nlp){
          msg = JSON.stringify(nlpresult)
        }
        alert(msg)
        window.open('/', '_self')
      } else {
        alert("Upload failed...")
      }
    }
    upload()
    console.log("UPLOAD")
  }
  itemName = processItemName(itemName)
  const svgSize = 19

  return (
    <div className='mt-16 flex flex-col items-center text-custom-white-0'>
      <Header name={`${user.firstName} ${user.lastName}`} />
      <div className='flex mt-4 flex-row items-center'>
        <div className='flex flex-row items-center'>
          <Link href='/'>
            <div className='relative flex flex-col items-center tab-hoverable'>
              <div className='flex flex-row items-center'>
                <HomeSVG width={svgSize} height={svgSize} />
                <div className='ml-2 text-lg cursor-pointer'>Home Insurance</div>
              </div>
              <div className='absolute bottom-0 h-mini bg-custom-white-0 w-0 underline' />
            </div>
          </Link>
          <div>&nbsp;&gt;&nbsp;</div>
          <Link href={`/manage?itemName=${itemName.toLowerCase()}`}>
            <div className='relative flex flex-col items-center cursor-pointer tab-hoverable'>
              <div>Manage {itemName}</div>
              <div className='absolute bottom-0 h-mini bg-custom-white-0 w-0 underline' />
            </div>
          </Link>
          <span>&nbsp;&gt; Add {itemName}</span>
        </div>
      </div>

      <div className='mt-8 flex flex-col items-center justify-center'>
        <div className='m-2 flex flex-col'>
          <div className='text-lg font-semibold'>{itemName} Name</div>
          <input ref={nameRef} type='text' className='transition text-custom-gray-0 outline-none border-custom-white-0 border-2 rounded' onChange={() => {
            if (nameRef.current?.value && nameRef.current?.value.length > 0) {
              nameRef.current?.classList.add('border-custom-green')
              nameRef.current?.classList.remove('border-custom-red')
              setReady({ ...ready, nameReady: true })
            } else {
              nameRef.current?.classList.add('border-custom-red')
              nameRef.current?.classList.remove('border-custom-green')
              setReady({ ...ready, nameReady: false })
            }
          }} />
        </div>
        <div id='image-upload-button' ref={imageRef} className='custom-btn transition m-2' onClick={() => {
          document.getElementById('image-upload')?.click()
        }}>Upload Image</div>
        <input id='image-upload' type='file' style={{ display: 'none' }} ref={inputImageRef} onChange={() => {
          if (inputImageRef.current?.files && inputImageRef.current.files?.length > 0) {
            imageRef.current?.classList.add('bg-custom-green', 'border-custom-green', 'text-custom-white-0')
            imageRef.current?.classList.remove('bg-custom-red', 'border-custom-red')
            setReady({ ...ready, imageReady: true })
          } else {
            imageRef.current?.classList.add('bg-custom-red', 'border-custom-red', 'text-custom-white-0')
            imageRef.current?.classList.remove('bg-custom-green', 'border-custom-green')
            setReady({ ...ready, imageReady: false })
          }
        }} />
        <div id='invoice-upload-button' ref={invoiceRef} className='custom-btn transition m-2' onClick={() => {
          document.getElementById('invoice-upload')?.click()
        }}>Upload Invoice/Receipt</div>
        <input id='invoice-upload' type='file' style={{ display: 'none' }} ref={inputInvoiceRef} onChange={() => {
          if (inputInvoiceRef.current?.files && inputInvoiceRef.current.files?.length > 0) {
            invoiceRef.current?.classList.add('bg-custom-green', 'border-custom-green', 'text-custom-white-0')
            invoiceRef.current?.classList.remove('bg-custom-red', 'border-custom-red')
            setReady({ ...ready, invoiceReady: true })
          } else {
            invoiceRef.current?.classList.add('bg-custom-red', 'border-custom-red', 'text-custom-white-0')
            invoiceRef.current?.classList.remove('bg-custom-green', 'border-custom-green')
            setReady({ ...ready, invoiceReady: false })
          }
        }} />
        <div className={`custom-btn m-9 ${((ready.imageReady || ready.invoiceReady) && ready.nameReady) ? 'hover:bg-custom-green hover:border-custom-green' : 'hover:bg-custom-red hover:border-custom-red'}`} onClick={() => {
          addAsset()
        }}>Add {itemName}</div>
      </div>
    </div>
  )
}