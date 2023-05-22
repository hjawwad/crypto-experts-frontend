import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { login } from "./api/register";
import { useContext, useState } from "react";
import showErrorAlert from "./components/utility/showErrorAlert";
import LoginPageImage from "./components/svg-icons/login-page-image";
import GmailIcon from "./components/svg-icons/gmail-icon";
import CustomizedSwitches from "./components/svg-icons/darkMode";
import ThemeContext from "./utils";

export default function Home() {
  const mode = useContext(ThemeContext)
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = async () => {
    await router.push("/dashboard");
    // window.location.reload();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      showErrorAlert("Email and  Password is required.");
      return;
    } else if (!email) {
      showErrorAlert("Email is required.");
      return;
    } else if (!password) {
      showErrorAlert("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password, remember);
      setIsLoading(false);

      if (!response.status) {
        showErrorAlert("Password is required.");
        return;
      }
      Cookies.set("session_token", response.data.token, {
        expires: response.data.expiresAt, // Set the cookie expiration time
        secure: false, // Set to true if using HTTPS
      });
      handleLoginClick();
    } catch (error) {
      setIsLoading(false);
      showErrorAlert(error);
      return;
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center text-center justify-between p-24 pt-[139px] pr-0"
      style={{
        backgroundColor: mode.darkMode ? mode.color.dark : mode.color.white,
      }}
    >
      <div className="grid grid-cols-2 divide-x w-full">
        <div className=" border-none border-0 items-center justify-center mx-auto mt-[15vh]">
          <div
            className="mb-5  text-[#808080]"
            onChange={() => {
              mode.setDarkMode(!mode.darkMode);
            }}
          >
            <CustomizedSwitches />
          </div>
          <h1
            className="text-4xl text-left  w-[360px] login-style-heading "
            style={{ color: mode.darkMode ? "white" : "black" }}
          >
            Welcome back
          </h1>
          <p
            className="text-left pt-[12px] login-style-text"
            style={{ color: mode.darkMode ? "white" : "black" }}
          >
            Welcome back! Please enter your details.
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="w-[360px] text-left pt-[32px]"
          >
            <div className="pb-5">
              <label
                className="pb-[6px]"
                style={{ color: mode.darkMode ? "#C0C0C0" : "#344054" }}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                style={{ color: mode.darkMode ? "#C0C0C0" : "black" }}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="pb-5">
              <label
                className="pb-[6px]"
                style={{ color: mode.darkMode ? "#C0C0C0" : "#344054" }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="pb-5">
              <input
                type="checkbox"
                id="rememberFor"
                name="rememberFor"
                value={remember}
                onChange={(event) => setRemember(event.target.value)}
                className="w-[16px] h-[16px]"
              />
              <label
                htmlFor="rememberFor"
                className="pl-[10px]"
                style={{ color: mode.darkMode ? "#C0C0C0" : "#344054" }}
              >
                Remember for 30 days
              </label>
              <button
                className="text-[#0353CC] ml-[6vh] forgot-password"
                style={{ color: mode.darkMode ? "#8ec3eb" : "#0353cc" }}
              >
                Forgot password
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="text-xl text-[#FFFFFF] border border-slate-300 rounded-md p-2 w-full border-none"
                style={{ backgroundColor: "#008C5A" }}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
            <div>
              <button className="flex mt-5 items-center justify-center mx-auto border border-slate-300 rounded-md p-2 w-full">
                <GmailIcon />
                <span
                  className="ml-5 gmail-button"
                  style={{ color: mode.darkMode ? "#C0C0C0" : "#344054" }}
                >
                  Sign in with Google
                </span>
              </button>
            </div>
            <div
              className="text-center  pt-[32px]"
              style={{ color: mode.darkMode ? "white" : "#475467" }}
            >
              <span>Don’t have an account?&nbsp;</span>
              <span
                className="cursor-pointer sign-up"
                onClick={handleSignupClick}
                style={{ color: mode.darkMode ? "#8ec3eb" : "#0353cc" }}
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
        <div className=" border-none border-0 pl-[96px]">
          <LoginPageImage />
        </div>
      </div>
    </div>
  );
}
