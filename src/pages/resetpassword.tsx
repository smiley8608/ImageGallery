import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setInitialState } from "../redux/slice";

export const ResetPassword = () => {
  const [data, setData] = useState({ newpassword: "", conformpassword: "" });
  const {token} = useParams();
  const dispatch=useAppDispatch()
  
  const navigate=useNavigate()
  const auth=useAppSelector(state=>state.User.Auth)
  
  useEffect(()=>{
    
    if(auth){
      navigate('/')
    }
  },[auth,navigate])
  
  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    axios.post(`/resetpassword/${token}`, { data: data }).then((responce) => {
      console.log(responce.data.message);
      dispatch(setInitialState({User:responce.data.User,Auth:responce.data.Auth}))
      alert(responce.data.message);
    });
  };
  console.log(auth);
  return (
    <div className="tw-bg-slate-300 tw-h-screen tw-flex tw-justify-center tw-items-center ">
      <form
        className="tw-bg-white tw-w-3/12 tw-rounded-lg tw-border-2 tw-p-5"
        onSubmit={submithandler}
      >
        <div className="tw-mb-3">
          <label>newPassword</label>
          <input
            type={"password"}
            placeholder={"password"}
            className="tw-w-full tw-p-3"
            value={data.newpassword}
            onChange={(e) => setData({ ...data, newpassword: e.target.value })}
          />
        </div>
        <div className="tw-mb-3">
          <label>ConformPassword</label>
          <input
            type={"password"}
            placeholder={"conformpassword"}
            className="tw-w-full tw-p-3"
            value={data.conformpassword}
            onChange={(e) =>
              setData({ ...data, conformpassword: e.target.value })
            }
          />
        </div>
        <button className="tw-bg-blue-400 tw-p-3 tw-rounded-lg">Submit</button>
      </form>
    </div>
  );
};
