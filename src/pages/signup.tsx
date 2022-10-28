import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { setInitialState } from "../redux/slice"

export const SignUp=()=>{
    const navigate=useNavigate()
   const [data,setData]= useState({username:'',firstname:'',lastname:'',email:'',password:'',conformpassword:''})
   const dispatch=useAppDispatch()
   const auth=useAppSelector(state=>state.User.Auth)
   useEffect(()=>{
    if(auth){
        navigate('/')
    }
   })
   const submitHandler=(e:FormEvent)=>{
    e.preventDefault()
    axios.post('/signin',{data:data})
    .then(responce=>{
        console.log(responce.data.Auth);
        dispatch(setInitialState(responce.data.User))
        dispatch(setInitialState(responce.data.Auth))
        localStorage.setItem('jwt-token',responce.data.tkn)
        alert(responce.data.message)

    })
    
    
   }
    return (
        <div className="tw-w-full tw-h-screen tw-bg-white tw-flex tw-justify-center tw-items-center">
            <div className="lg:tw-w-3/12 md:tw-w-5/12 sm:tw-w-6/12 tw-bg-slate-300 tw-rounded-lg tw-drop-shadow-2xl tw-border-black tw-border-4 tw-p-4">
                <form onSubmit={submitHandler}>
                <h2 className="tw-text-center tw-font-bold tw-text-neutral-500 tw-text-lg">Register Here</h2>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500 ">UserName</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg "type={'text'} placeholder={'username'} value={data.username} onChange={(e)=>setData({...data,username:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">FirstName</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'text'} placeholder='firstname' value={data.firstname} onChange={(e)=>setData({...data,firstname:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">LastName</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'text'} placeholder='lastname' value={data.lastname} onChange={(e)=>setData({...data,lastname:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">Email</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'email'} placeholder='email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">PassWord</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'password'} placeholder='password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                </div>
                <div className="tw-mb-2">
                    <label className="tw-text-lg tw-font-bold tw-text-neutral-500">ConformPassword</label><br />
                    <input className="tw-w-full tw-p-2 tw-rounded-lg" type={'password'} placeholder='conform-password' value={data.conformpassword} onChange={(e)=>setData({...data,conformpassword:e.target.value})}/>
                </div>
                <div className="tw-flex tw-justify-end">
                    <button className="tw-bg-blue-600 tw-rounded-xl tw-p-3 tw-mt-3">Submit</button>
                </div>
                </form>
            </div>
            
        </div>
    )
}