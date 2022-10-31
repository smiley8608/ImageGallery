import { useEffect } from "react"
import { useAppDispatch } from "../redux/hook"
import { setInitialState } from "../redux/slice"

export const SignOut=()=>{
    const dispatch=useAppDispatch()
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setInitialState({User:null,Auth:false}))
            localStorage.removeItem('jwt-token')
            window.location.pathname='/'
        },1000)
    },[dispatch])

    return (
        <div>
            signout
        </div>
    )
}