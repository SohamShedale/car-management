import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const handleSubmitForm = async (data) => {
    const userData = {
      fullName: data.fullName,
      email: data.email,
      contact: data.contact,
      password: data.password,
    };
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (!res.data.success) {
        toast({
          variant: "destructive",
          description: res.data.message,
        });
      }

      if (res.data.success) {
        toast({
          description: res.data.message,
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <form
        className="flex flex-col items-center gap-8 px-10 py-10 border border-gray-200 rounded-lg shadow-2xl max-w-sm"
        action=""
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
      >
        <h1 className="text-3xl text-[#5243e6] font-semibold tracking-widest">
          Register
        </h1>
        <table>
          <tbody className="flex flex-col gap-6">
            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="fullName" className="font-semibold">
                  Full Name
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.fullName?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.email?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="contact" className="font-semibold">
                  Contact
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id="contact"
                  {...register("contact", {
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Invalid contact number",
                    },
                  })}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.contact?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left max-w-fit">
              <td>
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
              </td>
              <td className="">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Include atleast 1 lowercase, 1 uppercase, 1 digit, 1 special character, and of length 8",
                    },
                  })}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.password?.message}</p>
              </td>
            </tr>
          </tbody>
        </table>

        {loading ? (
          <Button>
            <Loader2 className="animate-spin h-4 w-4" />
          </Button>
        ) : (
          <Button>Register</Button>
        )}
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default Signup;
