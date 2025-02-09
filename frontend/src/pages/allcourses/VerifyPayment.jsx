import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useDispatch } from "react-redux";
import { appActions } from "../../features/appSlice";

const VerifyPayment = () => {
  const navigate = useNavigate();
  const userCxt = useContext(UserContext);
  const dispatch = useDispatch();

  const [qs, setQs] = useSearchParams();

  const verifyPayment = async () => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/verifypay/?type=${
        qs.get("purchase_order_id").split("_")[0]
      }&course_id=${qs.get("purchase_order_name")}`,
      data: {
        pidx: qs.get("pidx"),
      },
      withCredentials: true,
    })
      .then((res) => {
        dispatch(appActions.clearCart());
        navigate(`/yourcourses`);
      })
      .catch((err) => {
        navigate(`/yourcourses`);
      });
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="w-[50%] mx-auto text-center">
      <div className="text-lg">Payment Loading</div>
      <div>
        <i className="fa-solid fa-spinner animate-spin text-4xl text-primary-main"></i>
      </div>
    </div>
  );
};

export default VerifyPayment;
