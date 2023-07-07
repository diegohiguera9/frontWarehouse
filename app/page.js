"use client";

import Lottie from "lottie-react";
import animationData from "../public/assets/147825-icon-morphing.json";
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

  const {push} = useRouter()

  const singIn = async ()=>{
    try {
      const response = await axios.post('http://192.168.0.10:8080'+'/user/sigin',{
        email,
        password
      })
      console.log(response)
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
      setEmail("")
      setPassword("")
      alert(err)
    }
  }

  return (
    <>
      <div className="flex flex-col h-[90vh] items-center content-between justify-between py-20 px-8">
        <div className="max-h-96">
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
        <button className="flex flex-row-reverse w-full" onClick={singIn}>
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
