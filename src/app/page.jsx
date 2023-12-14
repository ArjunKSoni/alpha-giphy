"use client"
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { login,reset } from './auth';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const getCookie = () => {
    const cookieValue = Cookies.get('Token');
    if(cookieValue){
      router.push("/gif");
    }
  };

  useEffect(() => {
    getCookie();
  },[])

  const setCookie = (token) => {
    Cookies.set('Token', token, { expires: 7 });
  };

  const signin = async () => {
    if (email == "") {
      alert("please enter the email")
    }
    else if (pass == "") {
      alert("enter the valid password")
    }
    else {
      const res = { email: email, password: pass, returnSecureToken: true };
      const data = await login(res);
      // console.log(data.data.idToken);
      if (data) {
        setCookie(data.data.idToken);
        router.push("/gif");
      }
    }
  }

  const resetp=async()=>{
    if (email == "") {
      alert("please enter the email to reset your password")
    }
    else{
      reset({requestType:"PASSWORD_RESET",email:email})
    }
  }

  return (
    <section class="bg-gray-50 h-screen w-screen dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image class="mr-2" width={10} height={10} src="/vercel.svg" alt="logo" />
          VETAT
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input value={pass} onChange={e => setPass(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <p onClick={resetp} class="text-sm hover:cursor-pointer font-medium text-white text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
            </div>
            <h1 className='text-slate-500 text-center'>enter the email to reset password</h1>
            <button onClick={signin} class="w-full text-white bg-primary-600 hover:bg-blue-700 transition-all focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Do not have an account yet? <Link href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
