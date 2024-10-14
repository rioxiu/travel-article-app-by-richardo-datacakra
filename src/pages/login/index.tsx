import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ILoginFormData } from "../../types";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { AppDispatch, RootState } from "../../redux/store"; // Import the AppDispatch type
import { login, loginAction } from "../../redux/reducer/authLoginReducer";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.auth); // Mengambil status login dari Redux
  console.log(isLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  useEffect(() => {}, [isLogin, navigate]);

  const onSubmit = async (data: ILoginFormData) => {
    try {
      const response = await dispatch(loginAction(data)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang!",
      });
      Cookies.set("jwt", response.jwt, { expires: 1 });
      navigate("/dashboard");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah!",
      });
    }
  };

  return (
    <Fragment>
      <main className="flex font-raleway h-screen items-center justify-center flex-row mt-10 gap-8 ">
        <section className="flex flex-row phone:flex-col-reverse gap-8 space-x-4 phone:space-x-0 bg-[#0F4C75] p-10 rounded-lg">
          <form
            className="flex justify-center flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-4xl font-bold">Selamat Datang</h2>
            <div className="flex flex-col space-y-2">
              <label htmlFor="identifier">Email</label>
              <input
                className="input input-bordered max-w-sm"
                type="text"
                id="identifier"
                {...register("identifier", { required: "Email is required" })}
              />
              {errors.identifier && (
                <p className="text-red-500">{errors.identifier.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input
                className="input input-bordered max-w-sm"
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="mt-4">
              <span>
                Belum punya akun?{" "}
                <a
                  className="hover:font-bold hover:text-red-800"
                  href="/signup"
                >
                  Daftar
                </a>
              </span>
            </div>
            <button className="btn mt-4 max-w-sm" type="submit">
              Login
            </button>
          </form>
          <img
            src="./japan_picture.jpg"
            className="w-[700px] rounded-lg h-auto max-w-full"
            alt="Background"
          />
        </section>
      </main>
    </Fragment>
  );
};

export default Login;
