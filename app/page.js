"use client";

import Lottie from "lottie-react";
import animationData from "../public/assets/147825-icon-morphing.json";
import ghostData from "../public/assets/148188-a-ghost.json"
import LoginBox from "./_components/loginBox";
import MailSvg from "./_svg/mailSvg";
import PasswordSvg from "./_svg/passwordSvg";
import ArrowRightSvg from "./_svg/arrowRightSvg";
import ButtonSvg from "./_components/buttonSvg";
import { useState } from "react";
import axios from "axios";
import { useRouter  } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const {push} = useRouter()

  const resetWindowScrollPosition = ()=>{
    window.history.scrollRestoration = 'manual'
  }

  const singIn = async ()=>{
    resetWindowScrollPosition()
    setLoading(true)
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/user/sigin',{
        email,
        password
      })
      //how to get the token
      const token = response.data.token
      await fetch("/api/login",{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:token})
      })
      push("/diego")
    } catch (err) {
      setLoading(false)
      setEmail("")
      setPassword("")
      alert(err)
    } 
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center content-between justify-between h-screen-safe px-4 max-w-md">
        <Lottie animationData={ghostData}/>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col h-[100vh] items-center content-between justify-between max-w-md h-screen-safe px-4 py-1">
        <div className="max-h-72">
          <Lottie animationData={animationData} style={{ height: 300 }} />
        </div>
        <div className="w-full">
          <p className="text-2xl font-bold text-left w-full">Log in</p>
          <p className="text-xs font-semibold text-left w-full text-slate-400">
            Por favor ingresa tu informacion para continuar
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <LoginBox
            Icon={MailSvg}
            PlaceHolder={"yourmail@mail.com"}
            Type={"text"}
            setState={setEmail}
            value={email}
            inputId={"email"}
          >
            Email
          </LoginBox>
          <LoginBox
            Icon={PasswordSvg}
            PlaceHolder={"SecretPassword"}
            Type={"password"}
            setState={setPassword}
            value={password}
            inputId={"password"}
          >
            Password
          </LoginBox>
        </div>
        <button className="flex flex-row-reverse w-full focus:shadow-none" onClick={singIn}>
          <ButtonSvg Icon={ArrowRightSvg}>Log In</ButtonSvg>
        </button>
        {/* <div className="object-bottom flex flex-row w-full mt-4 space-x-2 justify-center">
          <p>No tienes una cuenta?</p>
          <span className="text-rose-300">Sign up</span>
        </div> */}
      </div>
    </>
  );
};

export default page;
