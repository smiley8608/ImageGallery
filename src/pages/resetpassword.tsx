import axios from "axios";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";

export const ResetPassword = () => {
  const [data, setData] = useState({ newpassword: "", conformpassword: "" });
  const token = useParams();
 

  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    axios.post(`/resetpassword/${token}`, { data: data }).then((responce) => {
      console.log(responce.data.message);

      alert(responce.data.message);
    });
  };
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
