import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setInitialState } from "../redux/slice";


export const LogIn = () => {
    const [data,setData]=useState({email:'',password:''})
    const auth= useAppSelector(state=>state.User.Auth)
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    useEffect(()=>{
      if(auth){
        navigate('/')
      }
    })
    const submitHandler=(e:FormEvent)=>{
        e.preventDefault()
        axios.post('/login',{data:data})
        .then(responce=>{
            console.log(responce);
            console.log(auth);
            if(responce.data.Auth){
                dispatch(setInitialState({User:responce.data.User,Auth:responce.data.Auth}))
                alert(responce.data.message)
                localStorage.setItem('jwt-token',responce.data.tkn)
                navigate('/')
            }else{
                alert(responce.data.message)
            }

        })

    }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-white tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 md:tw-w-5/12 sm:tw-w-6/12 tw-bg-slate-300 tw-rounded-lg tw-drop-shadow-2xl tw-border-black tw-border-4 tw-p-4">
        <form onSubmit={submitHandler}>
        <h2 className="tw-text-center tw-font-bold tw-text-neutral-500 tw-text-lg">Login Here</h2>
        <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">Email</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'email'} placeholder='email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">PassWord</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'password'} placeholder='password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                </div>
                <div className="tw-flex tw-justify-between">
                    <Link to="/forgetpassword" className="tw-text-blue-600 tw-mt-5" >forgetPassword?</Link>
                    <button className="tw-bg-blue-600 tw-rounded-xl tw-p-3 tw-mt-3">Submit</button>
                </div>
        </form>
      </div>
    </div>
  );
};
