import useGetAllCars from "@/hooks/useGetAllCars";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { setSearchedQuery } from "@/redux/carSlice";

const Cars = () => {
  useGetAllCars();
  const { cars, searchedQuery } = useSelector((store) => store.car);
  const [filterCars, setFilterCars] = useState(cars);
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{    
    dispatch(setSearchedQuery(query));
    if(searchedQuery){
      const filteredCars = cars.filter(car => {
        return (
          car.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          car.description.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })
      setFilterCars(filteredCars);
    }
    else{
      setFilterCars(cars)
    }
  }, [cars, searchedQuery, query])

  return (
    <div className="h-full">
      <Navbar />

      <center className="mt-5">
        <Input type="text" id="search" placeholder="Search" className="w-2/3 rounded-full border border-black h-14 outline-none" onChange={(e)=>setQuery(e.target.value)}/>
      </center>

      {filterCars.length == 0 ? (
        <div className="flex flex-col gap-10 justify-center items-center text-5xl min-h-screen">
          <header className="">No car registered by you</header>
          <Button
            className="bg-[#5243e6] border-0"
            onClick={() => navigate("/cars/register")}
          >
            Register a car
          </Button>
        </div>
      ) : (
        <>
          <div className="flex">
            {filterCars.map((car, index) => (
              <div
                key={index}
                className="w-[25%] h-fit pb-4 m-10 shadow-2xl bg-white border border-gray-100 flex flex-col gap-5"
              >
                <div className="h-56">
                  <img src={car.images[0]} alt="car-image" className="w-full" />
                </div>

                <span className="text-xl tracking-wider ml-4 mt-5">{car.title}</span>

                <div className="flex gap-5 ml-4">
                  <Button
                    className="bg-[#5243e6]"
                    onClick={() => navigate(`/cars/detail/${car._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <center>
            <Button
              className="bg-[#5243e6] border-0"
              onClick={() => navigate("/cars/register")}
            >
              Register a car
            </Button>
          </center>
        </>
      )}
    </div>
  );
};

export default Cars;
