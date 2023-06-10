import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import register from "./api/register";
import showSuccessAlert from "./components/utility/showSuccessAlert";
import showErrorAlert from "./components/utility/showErrorAlert";
import LoginPageImage from "./components/svg-icons/login-page-image";
const inter = Inter({ subsets: ["latin"] });

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password && !name) {
      showErrorAlert("Email, Password and name is required.");
      return;
    } else if (!email && !password) {
      showErrorAlert("Email and Password is required.");
      return;
    } else if (!email && !name) {
      showErrorAlert("Email and name is required.");
      return;
    } else if (!email) {
      showErrorAlert("Email is required.");
      return;
    } else if (!name) {
      showErrorAlert("Name is required.");
      return;
    } else if (!password) {
      showErrorAlert("Password is required.");
      return;
    } else if (password.length < 8) {
      showErrorAlert("Password should be of 8 character length");
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(email, password, name);
      setIsLoading(false);
      if (response.status) {
        showSuccessAlert(response.message);
      } else {
        showErrorAlert("Something went wrong!");
        return;
      }
    } catch (error) {
      setIsLoading(false);
      showErrorAlert(error);
      return;
    }
    handleLoginClick();
  };
  return (
    <div className="flex min-h-screen flex-col items-center text-center justify-between bg-white">
      <div className="grid grid-cols-2 divide-x w-full m-[4vh]">
        <div className=" border-none border-0 items-center justify-center mx-auto pt-[199px]">
          <h1 className="text-4xl text-left w-[360px] text-black">Sign up</h1>
          <p className="text-left pt-[12px] text-[#475467]">
            Start your 30-day free trial.
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="w-[360px] text-left pt-[32px]"
          >
            <div className="pb-5">
              <label className="pb-[6px] text-black" htmlFor="email">
                Name*
              </label>
              <input
                type="name"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="pb-5">
              <label className="pb-[6px] text-black" htmlFor="email">
                Email*
              </label>
              <input
                type="email"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="pb-5">
              <label className="pb-[6px] text-black" htmlFor="password">
                Password*
              </label>
              <input
                type="password"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                id="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p className="text-left pt-[12px] text-[#475467]">
                Must be at least 8 characters.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="text-xl border border-slate-300 rounded-md p-2 w-full border-none"
                style={{ backgroundColor: "#7F56D9" }}
              >
                {isLoading ? "Loading..." : "Get Started"}
              </button>
            </div>
            <div className="text-center pt-[32px]  text-[#475467]">
              <span>Already have an account?&nbsp;</span>
              <span
                className="cursor-pointer"
                onClick={handleLoginClick}
                style={{ color: "#7F56D9" }}
              >
                Log in
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
