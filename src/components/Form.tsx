import {
  useCreateArticle,
  useUpdateArticle,
} from "@/hooks/useCallServices/article";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type FormValues = {
  title: string;
  description: string;
  content: string;
  id?: string;
};

type FormProps = {
  isCreate?: boolean;
  formData?: FormValues;
};

export const FormArticle = ({ isCreate = false, formData }: FormProps) => {
  console.log("????", formData);

  const navigate = useNavigate();
  const { mutate: createArticle } = useCreateArticle();
  const { mutate: updateArticle } = useUpdateArticle();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: isCreate
      ? {
          title: "",
          description: "",
          content: "",
        }
      : formData,
  });

  const onSubmit = (data: FormValues) => {
    isCreate
      ? createArticle(data, {
          onSuccess: () => {
            navigate("/");
          },
          onError: () => {
            // TODO: handle error
          },
        })
      : updateArticle(
          { id: formData?.id as string, payload: data },
          {
            onSuccess: () => {
              // TODO: handle show success toast
              navigate("/");
            },
          }
        );
  };

  return (
    <div className="container mx-auto lg:px-20 pt-0 lg:pt-5">
      <div className="py-5 md:py-7 lg:py-8 px-4 lg:px-0">
        <h3 className="text-2xl lg:text-4xl font-roboto font-bold">
          {isCreate ? "New Article" : "Edit Article"}
        </h3>
      </div>
      <form className="px-4 lg:px-0 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 mb-4">
          <div className="hidden lg:block lg:col-span-2">
            <label className="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4">
              Title
            </label>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Article title"
              {...register("title", { required: "Title is required!" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500 mt-2 block">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 mb-4">
          <div className="hidden lg:block lg:col-span-2">
            <label className="block text-gray-500 font-bold mb-1 text-left md:mb-0 pr-4">
              Description
            </label>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              {...register("description", {
                required: "Description is required!",
              })}
              placeholder="What's this article about?"
            />
            {errors.description && (
              <span className="text-sm text-red-500 mt-2 block">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="hidden lg:block lg:col-span-2">
            <label className="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4">
              Content
            </label>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              {...register("content", { required: "Content is required!" })}
              rows={12}
              placeholder="Article content"
            />
            {errors.content && (
              <span className="text-sm text-red-500 mt-2 block">
                {errors.content.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 mt-4">
          <div className="hidden lg:grid lg:col-span-2"></div>
          <div className="col-span-12 lg:col-span-10">
            <button
              className="w-40 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded"
              type="submit"
            >
              {isCreate ? "Publish article" : "Update article"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
