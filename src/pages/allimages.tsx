import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router";
import { setImageState } from "../redux/imageSlice";
import { Link } from "react-router-dom";
export const AllImages = () => {
  const [img, setImg] = useState<any>(null);
  const auth = useAppSelector((state) => state.User.Auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const SetImage = useAppSelector((state) => state.Image);
  console.log(SetImage);
  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      axios.get("/image/allimages")
      .then((result) => {
        console.log(result.data.allimages);

        dispatch(setImageState(result.data.allimages));
      });
    }
  }, [auth, dispatch, navigate]);

  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("dbimages", img[0]);
    axios
      .post("/image/uploade", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((responce) => {
        console.log(responce.data);
        alert(responce.data.message);
      });
  };
  const imagehandler = (e: any) => {
    setImg(e.target.files);
  };

  return (
    <div className=" tw-bg-gray-100  tw-h-screen tw-overflow-scroll">
      <div className="tw-w-full  tw-flex tw-justify-center  tw-mt-16 ">
        <form onSubmit={submithandler}>
          <input
            type={"file"}
            multiple={true}
            accept="image/*"
            onChange={imagehandler}
          />
          <input type={"submit"} />
        </form>
      </div>
      <div className="tw-grid xl:tw-grid-cols-4 lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-items-start tw-pt-10">
  
        {SetImage.Image &&
          SetImage.Image.map((value) => {
            console.log(value);

            return (
                  <Link to={'/imageviewer/'+value._id}>
              <div className="tw-w-full  tw-grid tw-items-center tw-justify-center" key={value._id}>
                <div className="tw-bg-white tw-text-gray-700 tw-w-72 tw-shadow-lg tw-rounded-md tw-overflow-hidden  ">
                  <img
                    src={`http://localhost:3002/${value.path}`}
                    alt="products"
                    />
                  <div className="tw-p-5 tw-flex-col tw-gap-3">
                    <div className="tw-flex tw-gap-2">
                      <span className="tw-p">created By:</span>
                      <h2 className="tw-font-semibold tw-text-lg tw-overflow-ellipsis tw-overflow-hidden">
                        {value.username}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
                    </Link>
            );
          })}
      </div>
    </div>
  );
};
