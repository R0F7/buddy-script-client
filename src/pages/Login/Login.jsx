import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

import shape1 from "../../assets/images/shape1.svg";
import darkShape from "../../assets/images/dark_shape.svg";
import shape2 from "../../assets/images/shape2.svg";
import darkShape1 from "../../assets/images/dark_shape1.svg";
import shape3 from "../../assets/images/shape3.svg";
import darkShape2 from "../../assets/images/dark_shape2.svg";
import loginImg from "../../assets/images/login.png";
import logoImg from "../../assets/images/logo.svg";
import googleIcon from "../../assets/images/google.svg";
import loginValidationSchema from "../../validationSchema/loginValidationSchema";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { signIn, setLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: post_user } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/add-user", info);
      return data;
    },
    onError: () => toast.error("Something wrong."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const loadingToast = toast.loading("Logging in...");
      try {
        await signIn(values.email, values.password);
        toast.success("Login Successfully", { id: loadingToast });
        navigate(from, { replace: true });
      } catch (error) {
        const errorMessage = error.message?.includes("/")
          ? error.message.split("/")[1].replace(")", "").replace(/-/g, " ")
          : error.message;
        toast.error(errorMessage, { id: loadingToast });
      }
    },
  });

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;

      await post_user({
        email: user.email,
        name: user.displayName,
      });

      toast.success("Google Login Successful");
      navigate(from);
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      {/* Background Shapes */}
      <div className="_shape_one">
        <img src={shape1} alt="Shape 1" className="_shape_img" />
        <img src={darkShape} alt="Dark Shape" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src={shape2} alt="Shape 2" className="_shape_img" />
        <img
          src={darkShape1}
          alt="Dark Shape 1"
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <img src={shape3} alt="Shape 3" className="_shape_img" />
        <img
          src={darkShape2}
          alt="Dark Shape 2"
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side Image */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src={loginImg} alt="Login" className="_left_img" />
                </div>
              </div>
            </div>

            {/* Login Form Side */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src={logoImg} alt="Logo" className="_left_logo" />
                </div>
                <p className="_social_login_content_para _mar_b8">
                  Welcome back
                </p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">
                  Login to your account
                </h4>

                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="_social_login_content_btn _mar_b40"
                >
                  <img src={googleIcon} alt="Google" className="_google_img" />
                  <span>Or sign-in with google</span>
                </button>

                <div className="_social_login_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                {/* Formik Form */}
                <form
                  className="_social_login_form"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="row">
                    {/* Email Input */}
                    <div className="col-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control _social_login_input ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger small mt-1">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="col-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className={`form-control _social_login_input ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger small mt-1">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="rememberMe"
                          {...formik.getFieldProps("rememberMe")}
                        />
                        <label
                          className="form-check-label ms-1"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_left">
                        <p
                          className="_social_login_form_left_para"
                          style={{ cursor: "pointer" }}
                        >
                          Forgot password?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button
                          type="submit"
                          className="_social_login_form_btn_link _btn1"
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? "Logging..." : "Login now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Dont have an account?{" "}
                        <Link to="/registration">Create New Account</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
