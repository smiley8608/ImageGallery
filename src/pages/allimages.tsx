import { FormEvent, useState } from "react"
import axios from "axios"
export const AllImages=()=>{
    const [img,setImg]=useState<any>(null)
    
    const submithandler=(e:FormEvent)=>{
        e.preventDefault()
        const form =new FormData()
        form.append('dbimages',img[0])
        axios.post('/image/uploade',form,{
            headers:{
                "Content-Type":'multipart/form-data'
            },
        })
        .then(responce=>{
            console.log(responce.data);
            alert(responce.data.message)
            
        })
    }
    const imagehandler=(e:any)=>{
        
        setImg(e.target.files)
    }
    return (
        <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-absolute tw-mt-16 ">
            <form onSubmit={submithandler}>
                <input type={'file'} multiple={true} accept='image/*' onChange={imagehandler} />
                <input type={"submit"} />

            </form>
        </div>
    )
}