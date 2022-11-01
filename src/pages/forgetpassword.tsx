import axios from "axios"
import { FormEvent, useState } from "react"


export const ForgetPassword=()=>{

   const[data,setData]= useState({email:''})
    const submithandler=(e:FormEvent)=>{
        e.preventDefault()
        axios.post('/forgetpassword',{data:data})
        .then(responce=>{
            console.log((responce.data.token));
            
            alert(responce.data.message);
        })
    }
    return(
        <div className="tw-bg-slate-300 tw-h-screen tw-flex tw-justify-center tw-items-center ">
            <form className="tw-bg-white tw-w-3/12 tw-rounded-lg tw-border-2 tw-p-5" onSubmit={submithandler}>
                <div  className='tw-mb-3'>
                    <label>email</label>
                    <input type={'email'} placeholder={'email'} className='tw-w-full tw-p-3' value={data.email} onChange={(e)=>setData({email:e.target.value})}/>
                </div>
                <button className="tw-bg-blue-400 tw-p-3 tw-rounded-lg">Submit</button>
                
            </form>

        </div>
    )
}