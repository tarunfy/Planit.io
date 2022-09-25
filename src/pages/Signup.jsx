import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Gradient from "../assets/images/gradient.jpg";
import logo from "../assets/images/logo.svg";
import google from "../assets/images/google.svg";
import { AuthContext } from "../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    profileImg: "",
  });

  const { signup, authError, isLoading } = useContext(AuthContext);

  if (authError) {
    toast.error(authError, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleChange = (e) => {
    setCreds((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(creds);
  };

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex items-start flex-col justify-center space-y-10 max-w-full mx-auto bg-slate-50 w-[40%] p-20">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="space-y-1">
            <h4 className="text-2xl">Get started for free</h4>
            <p className="text-sm">
              Already registered?{" "}
              <Link to="/signin" className="text-blue-600">
                Sign in
              </Link>{" "}
              to your account.
            </p>
          </div>
          <form
            className="flex flex-col items-start space-y-4 w-full"
            onSubmit={handleSubmit}
          >
            <div className="w-full space-y-2">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={creds.email}
                onChange={handleChange}
                className="px-3 py-2 rounded-md border w-full"
              />
            </div>
            <div className="w-full space-y-2">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={creds.password}
                onChange={handleChange}
                className="px-3 py-2 rounded-md border w-full"
              />
            </div>
            <div className="w-full space-y-2">
              <label>Profile Image</label>
              <input
                type="file"
                name="profileImg"
                value={creds.profileImg}
                onChange={handleChange}
                className="px-3 py-2 rounded-md border w-full"
              />
            </div>
            <button
              disabled={!creds.email || !creds.password || !creds.profileImg}
              type="submit"
              className="!mt-10 w-full bg-primary text-white text-base rounded-full p-2 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-primary/50 hover:bg-primary/90"
            >
              Sign up
            </button>
            <div className="w-full flex space-x-2 items-center justify-center">
              <div className="w-full bg-black h-[1px]"></div>
              <span>OR</span>
              <div className="w-full bg-black h-[1px]"></div>
            </div>
            <button
              disabled={isLoading}
              onClick={signup}
              className=" w-full bg-primary text-white text-base rounded-full p-2 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-primary/50 hover:bg-primary/90 flex items-center justify-center"
            >
              <span className="mr-2">
                <img src={google} alt="" />
              </span>
              Sign up with google
            </button>
          </form>
        </div>
        <img src={Gradient} alt="Gradient" className="w-[60%]" />
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
