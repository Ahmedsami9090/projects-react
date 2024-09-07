import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { myResetPassContext } from '../../Contexts/ResetPasswordContext'
import { useNavigate } from 'react-router-dom'

export default function ForgPassword() {
  const { sendResetCode, validateCode } = useContext(myResetPassContext)
  const [isEmailValid, setisEmailValid] = useState(false)
  const [btnLoader0, setbtnLoader0] = useState(false)
  const [btnLoader1, setbtnLoader1] = useState(false)


  const navigate = useNavigate()

  const forgotFormik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (val) => {
      setbtnLoader0(true)
      const flag = await sendResetCode(val)
      if (flag) {
        setisEmailValid(true)
        setbtnLoader0(false)
      } else {
        setisEmailValid(false)
        setbtnLoader0(false)
      }
      
    },
    validationSchema: yup.object().shape({
      email: yup.string().matches(/^[a-zA-Z0-9._%+-]{1,}@[a-z]{1,}\.[a-z]{2,}$/, 'invalid email format').required('mail is required')
    })
  })
  const verifyCodeFormik = useFormik({
    initialValues: {
      resetCode: '',
      newPass: ''
    },
    onSubmit: async (val) => {
      setbtnLoader1(true)
      const flag = await validateCode(val)
      if (flag) {
        setbtnLoader1(false)
        setTimeout(() => {
          navigate('/login')
        }, 2000);
        console.log('tmam');

      } else {
        console.log('not tmam');
        setbtnLoader1(false)
      }
    },
    validationSchema: yup.object().shape({
      resetCode: yup.string().max(6, 'Enter six numbers sent to your mail').min(4, 'Enter numbers sent to your mail').required('Code is required'),
      newPass: yup.string().max(12, 'password should be maximum 12 characters').min(6, 'password should be minimum 6 characters').required('password is required')
    })
  })



  return (
    <div className='py-10'>
      <h1 className='text-5xl text-center font-semibold mt-24'>Forgot password</h1>
      <form className="max-w-md mx-auto mt-16" onSubmit={forgotFormik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" disabled={isEmailValid} onBlur={forgotFormik.handleBlur} onChange={forgotFormik.handleChange} value={forgotFormik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
          {forgotFormik.errors.email && forgotFormik.touched.email ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{forgotFormik.errors.email}</span></p>
          </div> : ''}
        </div>
        <button type="submit" disabled={isEmailValid} className="disabled:hover:bg-green-400 text-white bg-green-400 hover:bg-green-600 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-600 hover:transition hover:duration-300">{btnLoader0 ?
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
          : 'Send code'}</button>
      </form>
      <form className="max-w-md mx-auto mt-16" onSubmit={verifyCodeFormik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" maxLength={6} disabled={!isEmailValid} onBlur={verifyCodeFormik.handleBlur} onChange={verifyCodeFormik.handleChange} value={verifyCodeFormik.values.resetCode} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter code sent to your email</label>
          {verifyCodeFormik.errors.resetCode && verifyCodeFormik.touched.resetCode ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{verifyCodeFormik.errors.resetCode}</span></p>
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onBlur={verifyCodeFormik.handleBlur} disabled={!isEmailValid} onChange={verifyCodeFormik.handleChange} value={verifyCodeFormik.values.newPass} id="newPass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="newPass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter new password</label>
          {verifyCodeFormik.errors.newPass && verifyCodeFormik.touched.newPass ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{verifyCodeFormik.errors.newPass}</span></p>
          </div> : ''}
        </div>
        <button type="submit" disabled={!isEmailValid} className="disabled:hover:bg-green-400 text-white bg-green-400 hover:bg-green-600 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-600 hover:transition hover:duration-300">{btnLoader1 ?
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
          : 'Submit'}</button>
      </form>
    </div>
  )
}
