import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"



export const ImageViewer=()=>{
    const {id}=useParams()
    const [image,setImg]=useState<Imagetype>()
    console.log(id);
    
    
    useEffect(()=>{
        axios.get(`/image/viewer/${id}`)
        .then(result=>{
            console.log(result.data.viewer);
          setImg(result.data.viewer)
        })
        .catch(err => console.log(err)
        )     
    },[id])
    return(
        <div className="tw-w-full tw-h-screen tw-bg-slate-800 tw-flex  tw-justify-center tw-items-center">
            <div className=" tw-bg-white tw-w-3/6  tw-flex ">
               <img className="tw-w-full" src={`http://localhost:3002/${image?.path}`} alt='imageholder'/>
            </div>
        </div>
    )
}