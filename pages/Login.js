import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../public/firebase";
import {
  validateEmail,
  validatePassword,
} from "../public/src/helpers/function";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [showPassowrd] = useState(false);
  const [passwordError, setPassowrdError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const onLogin = async () => {
    auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then((credential) => {
        localStorage.setItem('userID',credential.user.uid)
        setLoginError("");
        router.push({
          pathname: "/",
        });
        return res
      })
      .catch((error) => {
        setLoginError(error.message);
        return error
      });
  };
  const onChangeEmail = () => {
    if (validateEmail(event.target.value)) {
      setEmailError("");
      setForm({ ...form, email: event.target.value });
    } else {
      setEmailError("Email Not Valid");
    }
  };

  const onChangePassword = () => {
    if (validatePassword(event.target.value)) {
      setPassowrdError("");
      setForm({ ...form, password: event.target.value });
    } else {
      setPassowrdError("Password Not Valid");
    }
  };
  const onRegister = () => {
    router.push({
      pathname: "/Register",
    });
  };
  return (
    <div className='flex flex-wrap md:flex-row-reverse lg:flex-row-reverse items-stretch h-screen bg-primaryBlue'>
      <div className='w-full h:-1/2 md:w-1/2 bg-cover flex'>
        <img
          src='../src/assets/bglogin.png'
          className='my-auto mx-auto lg:h-3/4 lg:w-3/4 md:w-3/4 md:h-3/4 h-1/2 w-1/2'
        />
      </div>
      <div className='w-full flex-1 bg-white'>
        <div className='flex flex-row justify-between'>
          <h1 className='px-4 text-2xl mt-4'>ADJ CASUAL</h1>
          <div className='flex flex-row mt-2'>
            <h1 className='px-4 text-primaryBlue p-2 text-sm'>
              {" "}
              Not Having Account?{" "}
            </h1>
            <button
              className='bg-primaryBlue mx-4 text-sm w-10/12 lg:w-40 md:w-40 border-r'
              onClick={onRegister}
            >
              <a className='lg:px-4 md:px-4 text-sm text-white'> Sign Up</a>
            </button>
          </div>
        </div>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 lg:mt-64 md:mt-32 mx-auto sm:max-w-xl'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-boldww mb-2'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='text'
              onChange={(event) => onChangeEmail(event)}
              placeholder='Username'
            />
            {emailError && <p className='text-lg text-red-600'>{emailError}</p>}
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='passowrd'
              placeholder='Enter Your Password '
              onChange={(event) => onChangePassword(event)}
              type={showPassowrd ? "text" : "password"}
            />
            {passwordError && (
              <p className='text-lg text-red-600'>{passwordError}</p>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-primaryBlue text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={onLogin}
            >
              LOGIN
            </button>
            <button
              className='inline-block align-baseline font-bold text-sm text-primaryBlue '
              href='#'
            >
              {/* <button className='flex flex-row bg-white shadow-md rounded p-1'>
                <img src='../src/assets/ic_google.png' className='w-10 h-10' />
                <p className='my-auto mx-2 font-medium'>LOGIN GOOGLE</p>
              </button> */}
            </button>
          </div>
          <div className='container mx-auto'>
            {<p className='text-lg text-red-600'>{loginError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
