import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { IRegisterFormData } from "../../types";
import { registerUser } from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const route = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();

  const onSubmit = async (data: IRegisterFormData) => {
    try {
      await registerUser(data.email, data.username, data.password);
      Swal.fire({
        title: "Success",
        text: "You have successfully registered",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(() => {
        route("/signin");
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Fragment>
      <main className="flex  items-centerfont-raleway h-screen items-center justify-center flex-row mt-10 gap-8 ">
        <section className="flex phone:space-x-0 phone:flex-col-reverse flex-row gap-8 space-x-4 bg-[#0F4C75] p-10 rounded-lg">
          <form
            className="flex p-4 flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-4xl font-bold">Selamat Datang</h2>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                className="input input-bordered max-w-sm"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="username">Username</label>
              <input
                className="input input-bordered max-w-sm"
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="password">Kata Sandi</label>
              <input
                className="input input-bordered max-w-sm"
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="">
              <span>
                Sudah punya akun?{" "}
                <a
                  className="hover:font-bold hover:text-red-800"
                  href="/signin"
                >
                  Login
                </a>
              </span>
            </div>
            <button className="btn" type="submit">
              Daftar
            </button>
          </form>
          <img
            src="./japan_picture.jpg"
            className="w-[700px] rounded-lg h-auto max-w-full"
            alt=""
          />
        </section>
      </main>
    </Fragment>
  );
};

export default Register;
