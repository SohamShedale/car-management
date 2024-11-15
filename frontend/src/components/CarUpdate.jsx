import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";
import { setLoading } from "@/redux/authSlice";

const CarUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;
  const { loading } = useSelector((store) => store.auth);
  const { singleCar } = useSelector((store) => store.car);

  const handleSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("tags", data?.tags);
    let images = data.images;
    if(images.length > 10){
      return toast({
        variant: "destructive",
        description: "Only 10 images allowed",
      });
    }
    if (images.length > 0) {        
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${PRODUCT_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        toast({
          variant: "destructive",
          description: res.data.message,
        });
      }

      if (res.data.success) {
        navigate(`/cars/detail/${id}`);
        toast({
          description: res.data.message,
        });
      }
    } catch (error) {
        console.log(error);
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <form
        className="flex flex-col items-center gap-8 px-10 py-14 border border-gray-200 rounded-lg shadow-2xl max-w-sm"
        action=""
        onSubmit={handleSubmit(handleSubmitForm)}
        noValidate
      >
        <h1 className="text-3xl text-[#5243e6] font-semibold tracking-widest">
          Update details
        </h1>
        <table>
          <tbody className="flex flex-col gap-6">
            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="title">Title</label>
              </td>
              <td>
                <input
                  type="text"
                  id="title"
                  defaultValue={singleCar[0].title}
                  {...register("title")}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.title?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="description">Description</label>
              </td>
              <td>
                <input
                  type="text"
                  id="description"
                  defaultValue={singleCar[0].description}
                  {...register("description")}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.description?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="tags">Tags</label>
              </td>
              <td>
                <input
                  type="text"
                  id="tags"
                  defaultValue={singleCar[0].tags}
                  {...register("tags")}
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                />
              </td>
              <td>
                <p className="text-red-600">{errors.tags?.message}</p>
              </td>
            </tr>

            <tr className="grid gap-1 text-left">
              <td>
                <label htmlFor="images">Images</label>
              </td>
              <td>
                <Input
                  type="file"
                  id="images"
                  {...register("images")}
                  accept="image/*"
                  className="w-80 h-8 rounded-sm border border-spacing-1 border-black outline-none px-2"
                  multiple
                />
              </td>
              <td>
                <p className="text-red-600">{errors.title?.message}</p>
              </td>
            </tr>
          </tbody>
        </table>

        {loading ? (
          <Button>
            <Loader2 className="animate-spin h-4 w-4" />
          </Button>
        ) : (
          <Button>Update details</Button>
        )}
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default CarUpdate;
