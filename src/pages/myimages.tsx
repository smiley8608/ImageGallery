import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setImageState } from "../redux/imageSlice";

export const MyImages = () => {
  const auth = useAppSelector((state) => state.User.Auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myimages = useAppSelector((state) => state.Image.Image);
  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      axios.get("/image/myimages").then((responce) => {
        console.log(responce.data.myimage);

        dispatch(setImageState(responce.data.myimage));
      });
    }
  }, [auth, dispatch, navigate]);

  const removehandler=(_id:string)=>{
    axios.post('/image/removeimage',{_id:_id})
    .then(responce=>{
      alert(responce.data.message)
    })
  }

  return (
    <div className="tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-bg-gray-100 tw-h-screen tw-items-start tw-pt-20 ">
      {myimages?.map((value) => {
        return (
          
            <div className="tw-w-full  tw-grid tw-items-center tw-justify-center" key={value._id}>
              <div className="tw-bg-white tw-text-gray-700 tw-w-72 tw-shadow-lg tw-rounded-md tw-overflow-hidden">
              <Link to={"/imageviewer/" + value._id}>
                <img
                  src={`http://localhost:3002/${value.path}`}
                  alt="products"
                />
                  </Link>
                <div className="tw-p-5 tw-flex-col tw-gap-3">
                  <div className="tw-flex tw-gap-2">
                    <span className="tw-p">created By:</span>
                    <h2 className="tw-font-semibold tw-text-lg tw-overflow-ellipsis tw-overflow-hidden">
                      {value.username}
                    </h2>
                  </div>
                  <div className="mt-3">
                    <button className="tw-bg-red-500 tw-p-3 tw-rounded-lg" onClick={()=>removehandler(value._id)}>delete</button>
                  </div>
                </div>
              </div>
            </div>
        
        );
      })}
    </div>
  );
};
