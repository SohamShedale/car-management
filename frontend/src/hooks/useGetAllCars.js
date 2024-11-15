import React, { useEffect } from "react";
import { toast } from "./use-toast";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setCars } from "@/redux/carSlice";

const useGetAllCars = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API_END_POINT}/list`, {
          withCredentials: true,
        });

        if (!res.data.success) {
          toast({
            variant: "destructive",
            description: res.data.message,
          });
        }

        if (res.data.success) {
          dispatch(setCars(res.data.cars));
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        });
      }
    };
    fetchAllCars();
  }, []);
};

export default useGetAllCars;
