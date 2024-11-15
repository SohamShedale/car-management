import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast({ description: res.data.message });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-2 border border-b-2 border-gray-200 shadow-sm h-fit">
      <div className="">
        <h3 className="text-2xl">Fleetku</h3>
      </div>

      <div className="">
        <ul className="flex gap-5">
          <li
            className="font-medium hover:text-[#5243e6] cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li className="font-medium hover:text-[#5243e6] cursor-pointer">
            Enterprise
          </li>
          <li
            className="font-medium hover:text-[#5243e6] cursor-pointer"
            onClick={() => navigate("/cars")}
          >
            Cars
          </li>
          <li className="font-medium hover:text-[#5243e6] cursor-pointer">
            Contact US
          </li>
        </ul>
      </div>

      {!user ? (
        <div className="">
          <Button
            onClick={() => navigate("/login")}
            className="bg-white text-black hover:text-[#5243e6] hover:bg-white"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="bg-[#5243e6]"
          >
            Register
          </Button>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="h-11 rounded-full"
                src="https://github.com/shadcn.png"
                alt="profile-image"
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex items-center w-fit gap-2 cursor-pointer">
              <LogOut />
              <Button onClick={logoutHandler} className="bg-[#5243e6] border-0">
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default Navbar;
