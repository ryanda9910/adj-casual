import { useRouter } from "next/router";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, db } from "../public/firebase";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../public/src/helpers/function";

export default function Register() {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPassowrdError]=useState('')
  const [confirmPasswordError,setConfirmPassowrdError]=useState('')
  const [phoneError,setphoneError]=useState('')

  const salt = bcrypt.genSaltSync(10);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    password: "",
    confirmpassowrd: "",
  });
  const onChangeFirstName = () => {
    setForm({ ...form, firstname: event.target.value });
  };
  const onChangeLastName = () => {
    setForm({ ...form, lastname: event.target.value });
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
    }else{
      setPassowrdError('Password Belum Valid')
    }
  };
  const onChangeConfirmPassword = () => {
    if (form.password === form.confirmpassowrd || form.password === event.target.value) {
      setConfirmPassowrdError("")
      setForm({ ...form, confirmpassowrd: event.target.value });
    }else{
      setConfirmPassowrdError('Password Tidak Sama')
    }
  };
  const onChangePhoneNumber = () => {
    if (validatePhone(event.target.value)) {
      setphoneError("")
      setForm({ ...form, phonenumber: event.target.value });
    }else{
      setphoneError('No Telepon Tidak Valid')
    }
  };

  const onRegister = async () => {
    try {
      auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((credential) => {
          db.collection("users")
            .doc()
            .set(
              {
                firstname: form.firstname,
                lastname: form.lastname,
                email: credential.user.email,
                password: bcrypt.hashSync(form.password, salt),
                phonenumber: form.phonenumber,
              },
              { merge: true }
            );
          alert("Berhasil Mendaftar");
          router.push({
            pathname: "/Login",
          });
        });
    } catch (error) {
      alert("Gagal Mendaftar");
    }
  };
  return (
    <div className='w-full bg-grey-lightest pt-4'>
      <div className='container mx-auto py-32'>
        <div className='w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow'>
          <h1 className='font-bold text-3xl'>Sign up for a free account</h1>
          <div className='py-4 px-8'>
            <div className='flex mb-4'>
              <div className='w-1/2 mr-1'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                  First Name
                </label>
                <input
                  className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                  id='first_name'
                  type='text'
                  placeholder='Your first name'
                  onChange={(event) => onChangeFirstName(event)}
                />
              </div>
              <div className='w-1/2 ml-1'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                  Last Name
                </label>
                <input
                  className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                  id='last_name'
                  type='text'
                  placeholder='Your last name'
                  onChange={(event) => onChangeLastName(event)}
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                Email Address
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                id='email'
                type='email'
                placeholder='Your email address'
                onChange={(event) => onChangeEmail(event)}
              />
              {emailError&& <p className="text-lg text-red-600">{emailError}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                No Hp
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                id='phonenumber'
                type='text'
                placeholder='Your Phone Number'
                onChange={(event) => onChangePhoneNumber(event)}
              />
              {phoneError&& <p className="text-lg text-red-600">{phoneError}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                  id='password'
                  type={showPassowrd ? "text" : "password"}
                  onChange={(event) => onChangePassword(event)}
                  placeholder='Your Password'
                />
                {passwordError&& <p className="text-lg text-red-600">{passwordError}</p>}
                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ${passwordError?"bottom-7":null}`}>
                  {!showPassowrd ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => setShowPassowrd(true)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setShowPassowrd(false)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                Confirm Password
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                id='confirmpassword'
                type='password'
                onChange={(event) => onChangeConfirmPassword(event)}
                placeholder='Confirm Password'
              />
             {confirmPasswordError&& <p className="text-lg text-red-600">{confirmPasswordError}</p>}
            </div>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => router.back()}
                className='bg-white text-primaryBlue py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
              >
                <a className='inline-block align-baseline font-bold text-sm text-primaryBlue'>
                  Back
                </a>
              </button>
              <button
                onClick={onRegister}
                className='bg-primaryBlue text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
