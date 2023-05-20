import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

const VerifyPayment = () => {
  const navigate = useNavigate();
  const userCxt = useContext(UserContext);

  const [qs, setQs] = useSearchParams();

  const verifyPayment = async () => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/verifypay/?type=${
        qs.get("purchase_order_id").split("_")[0]
      }&slug=${qs.get("purchase_order_name")}`,
      data: {
        pidx: qs.get("pidx"),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCxt.auth.access}`,
      },
    }).then((res) => {
      console.log(qs.get("purchase_order_id").split("_")[0]);
      navigate(
        `/buycourse?type=${
          qs.get("purchase_order_id").split("_")[0]
        }&course=${qs.get("purchase_order_name")}`
      );
    });
  };

  useEffect(() => {
    console.log("helo");
    verifyPayment();
  }, []);

  return <div>Payment Loading</div>;
};

export default VerifyPayment;
