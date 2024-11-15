import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const { register, control, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const handleSubmitForm = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, userData, {
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
        dispatch(setUser(res.data.user));
        navigate("/");
        toast({
          description: res.data.message,
        });
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
    <div className="flex justify-center items-center mt-24">
      <form
        className="flex flex-col items-center gap-8 px-10 py-20 border border-gray-200 rounded-lg shadow-2xl max-w-sm"
        action=""
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
      >
        <h1 className="text-3xl text-[#5243e6] font-semibold tracking-widest">
          Login
        </h1>
        <table>
          <tbody className="flex flex-col gap-6">
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
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
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
          <Button>Login</Button>
        )}
        <p>
          Don't have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default Login;
