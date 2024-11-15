import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCar } from "@/redux/carSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCar } = useSelector((store) => store.car);

  useEffect(() => {
    const fetchSingleCarDetails = async () => {
      try {
        const res = await axios.get(`${PRODUCT_API_END_POINT}/list/${id}`, {
          withCredentials: true,
        });
        if (!res.data.success) {
          toast({
            variant: "destructive",
            description: res.data.message,
          });
        }

        if (res.data.success) {
          dispatch(setSingleCar(res.data.car));
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: error.response.data.message,
        });
      }
    };
    fetchSingleCarDetails();
  }, [id]);

  const deleteCarDetails = async () => {
    try {
      const res = await axios.delete(`${PRODUCT_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (!res.data.success) {
        toast({
          variant: "destructive",
          description: res.data.message,
        });
      }

      if (res.data.success) {
        dispatch(setSingleCar(null));
        navigate("/cars")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <Navbar />

      {singleCar && (
        <>
          <div className="flex items-center justify-center">
            <Carousel className="max-w-3xl">
              <CarouselContent>
                {singleCar[0].images.map((image, index) => (
                  <CarouselItem key={index} className="">
                    <div className="h-full flex items-center justify-center">
                      <img src={image} alt="" className="" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="w-10 h-10 border border-black" />
              <CarouselNext className="w-10 h-10 border border-black" />
            </Carousel>
          </div>

          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-4xl text-[#5243e6]">{singleCar[0].title}</h1>
            <div className="flex gap-5">
              {singleCar[0].tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-center mt-10">{singleCar[0].description}</p>

          <div className="mt-10 flex gap-5 justify-around">
            <Button
              className="bg-[#5243e6]"
              onClick={() => navigate(`/cars/update/${singleCar[0]._id}`)}
            >
              Update
            </Button>
            <Button className="bg-[#5243e6]" onClick={deleteCarDetails}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;
