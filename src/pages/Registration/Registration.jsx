import shape_img_1 from "../../assets/images/shape1.svg";
import shape_img_2 from "../../assets/images/shape2.svg";
import shape_img_3 from "../../assets/images/shape3.svg";
import registration from "../../assets/images/registration.png";
import registration_1 from "../../assets/images/registration1.png";
import right_logo from "../../assets/images/logo.svg";
import google_img from "../../assets/images/google.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import registrationSchema from "../../validationSchema/registrationValidationSchema";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Registration = () => {
  const { createUser, setLoading, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      const registrationToast = toast.loading("Logging in...");

      try {
        const fullName = values.firstName + " " + values.lastName;
        const email = values.email;
        const password = values.password;

        await createUser(email, password);
        toast.success("Registration Successfully", { id: registrationToast });
        navigate(from);
      } catch (error) {
        const errorMessage = error.message?.includes("/")
          ? error.message.split("/")[1].replace(")", "").replace(/-/g, " ")
          : error.message;
        toast.error(errorMessage, { id: registrationToast });
      }
    },
  });

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
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
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src={shape_img_1} alt="" className="_shape_img" />
        <img
          src="assets/images/dark_shape.svg"
          alt=""
          className="_dark_shape"
        />
      </div>
      <div className="_shape_two">
        <img src={shape_img_2} alt="" className="_shape_img" />
        <img
          src="assets/images/dark_shape1.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <img src={shape_img_3} alt="" className="_shape_img" />
        <img
          src="assets/images/dark_shape2.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src={registration} alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src={registration_1} alt="Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <img src={right_logo} alt="Image" className="_right_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">
                  Get Started Now
                </p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                  Registration
                </h4>
                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="_social_registration_content_btn _mar_b40"
                >
                  <img src={google_img} alt="Image" className="_google_img" />{" "}
                  <span>Register with google</span>
                </button>
                <div className="_social_registration_content_bottom_txt _mar_b40">
                  {" "}
                  <span>Or</span>
                </div>

                {/* --- Formik Form Started --- */}
                <form
                  className="_social_registration_form"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="row">
                    {/* First Name */}
                    <div className="col-xl-12 col-lg-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          First Name
                        </label>
                        <input
                          name="firstName"
                          type="text"
                          className={`form-control _social_registration_input ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("firstName")}
                        />
                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <div className="text-danger small mt-1">
                              {formik.errors.firstName}
                            </div>
                          )}
                      </div>

                      {/* Last Name */}
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Last Name
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          className={`form-control _social_registration_input ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("lastName")}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                          <div className="text-danger small mt-1">
                            {formik.errors.lastName}
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          className={`form-control _social_registration_input ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger small mt-1">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>

                      {/* Password */}
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          className={`form-control _social_registration_input ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger small mt-1">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>

                      {/* Repeat Password */}
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Repeat Password
                        </label>
                        <input
                          name="confirmPassword"
                          type="password"
                          className={`form-control _social_registration_input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                          {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <div className="text-danger small mt-1">
                              {formik.errors.confirmPassword}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-check _social_registration_form_check">
                        {/* <input
                          name="terms"
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          {...formik.getFieldProps("terms")}
                        /> */}
                        <input
                          name="terms"
                          className="form-check-input"
                          type="radio"
                          id="terms"
                          value="true"
                          onChange={() => formik.setFieldValue("terms", true)}
                          onBlur={formik.handleBlur}
                          checked={formik.values.terms === true}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="terms"
                        >
                          I agree to terms & conditions
                        </label>
                        {formik.touched.terms && formik.errors.terms && (
                          <div className="text-danger small">
                            {formik.errors.terms}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button
                          type="submit"
                          disabled={formik.isSubmitting}
                          className="_social_registration_form_btn_link _btn1 text-nowrap overflow-hidden"
                        >
                          {formik.isSubmitting ? "Logging..." : "Register Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">
                        Have an account? <Link to="/login">Login</Link>
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

export default Registration;
