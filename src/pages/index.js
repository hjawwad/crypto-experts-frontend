import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ThemeContext from "../ThemeContext";
import Image from "next/image";

const fontInter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function Home() {
  const mode = useContext(ThemeContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleSigninClick = () => {
    router.push("/signin");
  };

  const handleLoginClick = async () => {
    await router.push("/dashboard");
    window.location.reload();
  };

  return (
    <div
      className={`flex justify-center min-h-screen`}
      style={{
        backgroundColor: mode?.darkMode ? mode?.color.dark : mode?.color.white,
        fontFamily: "Poppins",
      }}
    >
      <div className="w-[90%] flex flex-col">
        <header className="container flex justify-between mt-[30px]">
          <div className="flex">
            <div className="flex m-[5px]">
              <Image
                className="mr-5 block sm:hidden"
                src="/MenuLine.svg"
                alt="mindOS Icon"
                width={30}
                height={9}
                priority
                onClick={toggleDropdown}
              />
              <div
                className={`flex flex-col  border-[#343434]-500 text-[#ABABAB] ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <p
                  className="ml-[20px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  About Us
                </p>
                <p
                  className="ml-[20px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  Contact Us
                </p>
                <p
                  className="ml-[20px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  Futureproof
                </p>
                <p
                  className="ml-[20px] cursor-pointer"
                  onClick={toggleDropdown}
                >
                  The Networking Academy
                </p>
              </div>
              <Image
                src="/mindOS.svg"
                alt="mindOS Icon"
                width={95}
                height={29}
                priority
              />
            </div>

            <div className="hidden sm:inline-flex flex m-[5px] ml-[20px] border-l-[1px] border-[#343434]-500 text-[#ABABAB] ">
              <p className="ml-[20px] mt-1 cursor-pointer">About Us</p>
              <p className="ml-[20px] mt-1 cursor-pointer">Contact Us</p>
              <p className="ml-[20px] mt-1 cursor-pointer">Futureproof</p>
              <p className="ml-[20px] mt-1 cursor-pointer">
                The Networking Academy
              </p>
            </div>
          </div>
          <div
            className="border-[0.2px] border-[#fff]-500 p-2 rounded cursor-pointer"
            onClick={() => {
              handleSigninClick();
            }}
          >
            Book Intro
          </div>
        </header>
        <div className="text-center mt-10">
          {/* <div className="text-3xl sm:text-5xl text-center mx-[5%] sm:mx-[25%]">
            Unleash the power of your relationships
          </div> */}
          <div className="mx-15% text-[#AEAEAE] text-ml mt-5">
            A personal CRM and a community of people seeking to level up their
            relationships and unleash incredible opportunities.
          </div>
          <div>
            <button className="bg-[#043200] font-medium mt-[10vh] sm:mt-5 p-3 px-10 rounded-[12px]">
              JOIN OUR FREE BETA
              <EastIcon className="ml-5" />
            </button>
            <div className="mt-2 font-medium text-[#AEAEAE] text-xs">
              We facilitate connection to create opportunities
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-20 ">
          <div className="border border-[0.2px] border-[#A4A4A4] rounded-[24px] border-opacity-50 ">
            <Image
              src="/landingDash.svg"
              alt="landingDash Icon"
              width={960}
              height={430}
              priority
            />
          </div>
        </div>

        <div className="mt-20 text-center hidden sm:block">
          <div className={`text-[#EAECF0] text-base ${fontInter.className}`}>
            Trusted by leaders and founder at
          </div>
          <div className="flex justify-between mt-5">
            {/*  <div className="w-[40%] flex "> */}
            <Image
              src="/boltshift.svg"
              alt="boltshift Icon"
              width={180}
              height={60}
              priority
            />
            <Image
              src="/lightbox.svg"
              alt="lightbox Icon"
              width={180}
              height={100}
              priority
            />
            {/* </div>
            <div className="w-[40%] flex justify-between"> */}
            <Image
              src="/boltshift.svg"
              alt="boltshift Icon"
              width={180}
              height={100}
              priority
            />
            <Image
              src="/lightbox.svg"
              alt="lightbox Icon"
              width={180}
              height={100}
              priority
            />
            {/* </div>
            <div className="w-[20%]"> */}
            <Image
              src="/boltshift.svg"
              alt="boltshift Icon"
              width={180}
              height={100}
              priority
            />
            {/* </div> */}
          </div>
        </div>
        <hr className="mt-20" />

        <div className="text-center mt-10">
          <div className="text-3xl sm:text-5xl font-medium text-[#fff]">
            Human relationships manager
          </div>
          <div className="text-[#AEAEAE] mt-10 mx-[5%] sm:mx-[30%]">
            Helping you forge stronger, healthier and longer relationships with
            the people you care about.
          </div>
        </div>

        <div className="bg-[#000000] flex flex-col sm:flex-row justify-between mt-20 rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
          <div className="w-full sm:w-[45%] flex flex-col justify-center mt-[6vh] pl-[5vh] sm:pl-[10vh]">
            <div className={`font-normal text-3xl text-gradient`}>
              Query your own network for insights
            </div>
            <div
              className={`font-normal text-[#AEAEAE] mt-[6vh] mr-[10vh] ${fontInter.className}`}
            >
              AI-powered searching tool to nurture more personal and purposeful
              relationships.
            </div>
          </div>
          <div className="w-full sm:w-[55%] mt-[6vh]">
            <Image
              className="pl-[20%] sm:pl-0 rounded-b-[24px]"
              src="/friends.svg"
              alt="friends Icon"
              style={{ zIndex: 1, position: "relative" }}
              width={785}
              height={350}
              priority
            />
            <div
              className="landing-main-gradient-angles h-[100px] mt-[-100px] rounded-b-[24px]"
              style={{ zIndex: 100, position: "relative" }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-20">
          <div className="bg-[#000] w-full sm:w-[47%] rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
            <div className="ml-3 sm:ml-[10vh] mt-[10vh] ">
              <div className="ml-0 sm:ml-[8vh]">
                <div className="mt-10 text-3xl text-gradient">
                  Notify opportunities
                </div>
                <div className="mt-5 font-normal text-[#AEAEAE] mr-[5vh]">
                  Share an invite with a google meet, a dinner out or a proposal
                  to join your startup.
                </div>
              </div>
              <Image
                className="mt-[20vh] rounded-[24px]"
                src="/landingNotification.svg"
                alt="friends Icon"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
          <div className="bg-[#000] w-full sm:w-[47%] mt-5 sm:mt-0 rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
            <div className="ml-3 sm:ml-[15vh] mt-[10vh]">
              <div className="mt-10 text-3xl text-gradient">
                Remember details that matter
              </div>
              <div className="mt-5 text-[#AEAEAE] mr-5">
                Clip any text to provide context for what you ask Gems.
              </div>
            </div>
            <Image
              className="mt-[5vh]"
              src="/landingReminder.svg"
              alt="friends Icon"
              width={500}
              height={400}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-10">
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/user-tag.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Search</span> Looking to check who
              is more fit to be an angel in your first round? Or that developer
              you once saw on linkedin building an AI tool? We got you.
            </div>
          </div>
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/like.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Connect</span> All our users will
              have the opportunity to connect but not chat. A connection means
              that you can send notification for a dinner or whatever you might
              want to en entire group or individually.
            </div>
          </div>
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/people.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Remember</span> Personal or
              professional relationship alike details are the one who make you
              stand out. Always jot down what you talked about in a meeting and
              be ready to surprise.
            </div>
          </div>
        </div>
        {/* <div
          className={`flex justify-center sm:justify-between mt-20 ${fontInter.className}`}
        >
          <div className="text-[#868686]">
            <Image
              src="/oliver.svg"
              alt="Oliver Tonucci"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Oliver Tonucci</div>
            <div style={{ fontSize: "11px" }}>PWC</div>
          </div>
          <div className="text-[#868686] hidden sm:block">
            <Image
              src="/bruna.svg"
              alt="Bruna Cabus"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Bruna Cabus</div>
            <div style={{ fontSize: "11px" }}>21shares</div>
          </div>
          <div className="text-[#868686] hidden sm:block">
            <Image
              src="/Darlene.svg"
              alt="Darlene Robertson"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Darlene Robertson</div>
            <div style={{ fontSize: "11px" }}>HV Capital</div>
          </div>
        </div> */}

        <div className="text-center mt-20">
          <div className="text-[#fff] text-3xl sm:text-5xl mx-0 sm:mx-[20%] font-medium">
            Smarter relationships.
            <br /> Better opportunities.
          </div>
          <div className="text-[#AEAEAE] text-lg mx-[5%] sm:mx-[35%] mt-5 font-medium">
            Your network is your net-worth, it’s time to do something about it.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row bg-[#000] mt-20 rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
          <div className="w-full sm:w-[50%] mt-5 sm:mt-0 flex flex-col justify-center ml-3 sm:ml-[10%]">
            <div className="text-2xl sm:text-3xl">
              Connect and integrate your apps
            </div>
            <div className="mt-5 text-[#AEAEAE]">
              Stop the overload of information when{" "}
              <br className="hidden sm:block" /> looking for a contact.
              Centralize them all.
            </div>
          </div>
          <div className="w-full sm:w-[40%] mt-10 pl-[20%] sm:pl-0">
            <Image
              className="rounded-b-[24px]"
              src="/social.svg"
              alt="Social Icons"
              width={550}
              height={30}
              priority
            />
            <div
              className="landing-main-gradient-angles rounded-[24px] h-[100px] mt-[-100px]"
              style={{ zIndex: 100, position: "relative" }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-10">
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/user-tag.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Search</span> Looking to check who
              is more fit to be an angel in your first round? Or that developer
              you once saw on linkedin building an AI tool? We got you.
            </div>
          </div>
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/like.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Connect</span> All our users will
              have the opportunity to connect but not chat. A connection means
              that you can send notification for a dinner or whatever you might
              want to en entire group or individually.
            </div>
          </div>
          <div className="flex p-5">
            {/* <div>
              <Image
                src="/people.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div> */}
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Remember</span> Personal or
              professional relationship alike details are the one who make you
              stand out. Always jot down what you talked about in a meeting and
              be ready to surprise.
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-[5vh] ">
          <div className="bg-[#000] w-full sm:w-[47%] rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
            <div className="ml-3 sm:ml-[10vh] mt-[10vh]">
              <div className="ml-0 sm:ml-[8vh] mr-3 sm:mr-[10vh]">
                <div className="mt-10 text-3xl text-gradient">
                  Set reminders, be present
                </div>
                <div className="mt-5 font-normal text-[#AEAEAE] mr-[5vh]">
                  After a call, a meeting or a simple coffee, remember to set a
                  reminder and not let years pass from another one
                </div>
              </div>
              <Image
                className="mt-[10vh] rounded-[24px]"
                src="/setReminders.svg"
                alt="friends Icon"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
          <div className="bg-[#000] w-full sm:w-[47%] mt-5 sm:mt-0 rounded-[24px] border border-[0.2px] border-[#AEAEAE] border-opacity-50">
            <div className="ml-3 sm:ml-[10vh] mt-[10vh]">
              <div className="ml-0 sm:ml-[8vh] mr-3 sm:mr-[10vh]">
                <div className="mt-10 text-3xl text-gradient">
                  Take action on your reminders
                </div>
                <div className="mt-5 font-normal text-[#AEAEAE] mr-[5vh]">
                  Once the reminder is set we will notify you. We will also
                  suggest other reminders based on where you left off.
                </div>
              </div>
              <Image
                className="mt-[10vh] rounded-b-[24px]"
                src="/takeActions.svg"
                alt="friends Icon"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-10">
          <div className="flex p-5">
            <div>
              <Image
                src="/connect.svg"
                alt="connect Icon"
                width={100}
                height={30}
                priority
              />
            </div>
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Remember</span> Naturally, all your
              contacts are scattered around several applications. With mindOS
              you will able to easily connect them to import and enrich your
              database.
            </div>
          </div>
          <div className="flex p-5">
            <div>
              <Image
                src="/status-up.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div>
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Reminders</span> In business, a deal
              is usually won in a follow up. In relationships, the real bond is
              similarly build.
            </div>
          </div>
          <div className="flex p-5">
            <div>
              <Image
                src="/task-square.svg"
                alt="friends Icon"
                width={100}
                height={30}
                priority
              />
            </div>
            <div className="ml-4 text-[#AEAEAE] font-normal">
              <span className="text-[#fff]">Action</span> Once notified, don’t
              forget to take action. Use our notifications to invite your
              contacts to a google meet or a dinner out.
            </div>
          </div>
        </div>
        <div className="text-center text-[#fff] text-3xl sm:text-5xl mx-[5%] sm:mx-[20%] font-medium mt-[10vh] sm:mt-[15vh]">
          People are the centre of what we do
        </div>

        <div className="flex text-[#868686] justify-center sm:justify-between mt-20">
          <div className="">
            <Image
              src="/pwc.svg"
              alt="Oliver Tonucci"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Oliver Tonucci</div>
            <div style={{ fontSize: "11px" }}>PWC</div>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/shares.svg"
              alt="Bruna Cabus"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Bruna Cabus</div>
            <div style={{ fontSize: "11px" }}>21shares</div>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/capital.svg"
              alt="Darlene Robertson"
              width={400}
              height={30}
              priority
            />
            <div className="mt-[2rem]">Darlene Robertson</div>
            <div style={{ fontSize: "11px" }}>HV Capital</div>
          </div>
        </div>

        <div className="text-center mt-[15vh]">
          <div className="text-3xl sm:text-5xl mx-[5%] sm:mx-[20%] font-medium">
            A community to build <br className="hidden sm:block" /> meaningful
            connections
          </div>
          <div className="text-[#AEAEAE] text-lg mx-[5%] sm:mx-[30%] mt-[5vh] font-medium">
            Join a community of people seeking to expand their network with
            high-growth leaders in different industries. Be it VC, food lovers,
            uni students or tech founders.
          </div>
        </div>
        <div className="bg-[#000] flex flex-col md:flex-row p-[5%] md:p-0 mt-[15vh] border-[1px] border-[#A4A4A4] border-opacity-50 rounded-[24px]">
          <div className="flex w-full md:w-1/2  p-0 md:p-[5vh] ml-0 md:ml-[8vh] mt-0 sm:mt-[10%]">
            <div className="flex flex-col">
              <div className="text-3xl sm:text-5xl text-[#FFFFFF] mb-5 mt-5">
                Get instant 1:1s with community members
              </div>
              <div className="text-[#AEAEAE]">
                {`Once in the community, we will also arrange weekly 1:1s with
              members we believe you’ll like. With yhe public directory however,
              you can also do so yoursefl:)`}
              </div>
            </div>
          </div>
          <div className="flex w-full md:w-1/2 justify-between mt-[10vh]">
            <div>
              <Image
                src="/anala.svg"
                alt="Oliver Tonucci"
                width={480}
                height={300}
                priority
              />
            </div>
            <div className="ml-5 sm:ml-[3vh] mt-[50px] sm:mt-[180px]">
              <Image
                src="/gabi.svg"
                style={{ zIndex: 1, position: "relative" }}
                alt="Oliver Tonucci"
                width={480}
                height={300}
                priority
              />
              <div
                className="landing-main-gradient-angles h-[100px] rounded-[24px] mt-[-60px]"
                style={{ zIndex: 100, position: "relative" }}
              ></div>
              {/* <div
              className="landing-main-gradient-angles rounded-[24px]"
              style={{ zIndex: 100, position: "relative" }}
            /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-10">
          <div className="bg-[#000] full-width sm:w-[47%] border border-[1px] border-[#AEAEAE] border-opacity-50 rounded-[24px] flex flex-col justify-center items-center">
            <div className="m-3 sm:m-20">
              <div className="text-3xl sm:text-[45px] text-[#fff] leading-[45px] text-gradient my-5">
                Create a public profile and share it
              </div>
              <div className="mt-3 text-[#868686]">
                When you sign up to mindOS, take the opportunity to create a
                public profile.
              </div>
            </div>
            <Image
              className="rounded-b-[24px] mt-10 sm:mt-0"
              src="/gabiDash.svg"
              alt="Social Icons"
              width={570}
              height={30}
              priority
            />
          </div>
          <div className="bg-[#000] full-width sm:w-[47%] mt-5 sm:mt-0 border border-[1px] border-[#AEAEAE] border-opacity-50 rounded-[24px] flex flex-col justify-center items-center">
            <div className="m-3 sm:m-20">
              <div className="text-3xl sm:text-[45px] leading-10 text-gradient text-[#fff] my-5">
                Be part of a high-growth community
              </div>
              <div className="mt-3 text-[#868686]">
                Your profile will then be shared under your chosen category and
                people will have access to it.
              </div>
            </div>
            <Image
              className="rounded-b-[24px] mt-10 sm:mt-0"
              src="/memberDir.svg"
              alt="Social Icons"
              width={570}
              height={30}
              priority
            />
          </div>
        </div>
        <div className="lineargradient2  mt-20 " />
        <div className="mt-20 " />
        {/* <div className="flex flex-col sm:flex-row w-full items-center justify-between py-5 mb-20">
          <div>
            <Image
              src="/AVENUE.svg"
              alt="Social Icons"
              width={100}
              height={30}
              priority
            />
          </div>
          <div className="flex mt-5 sm:mt-0 flex-col sm:flex-row ml-[20px] text-[#ABABAB]">
            <p className="ml-[20px] mt-2 sm:mt-0 cursor-pointer">Platform</p>
            <p className="ml-[20px] mt-2 sm:mt-0 cursor-pointer">Solution</p>
            <p className="ml-[20px] mt-2 sm:mt-0 cursor-pointer">About us</p>
            <p className="ml-[20px] mt-2 sm:mt-0 cursor-pointer">Pricing</p>
            <p className="ml-[20px] mt-2 sm:mt-0 cursor-pointer">Contact us</p>
          </div>
        </div> */}

        {/* <div className="flex flex-col sm:flex-row w-full align-center justify-between py-5 mb-20">
          <div>
            <Image
              src="/AVENUE.svg"
              alt="Social Icons"
              width={100}
              height={30}
              priority
            />
          </div>
          <div className="flex flex-col sm:flex-row ml-[20px] text-[#ABABAB]">
            <p className="ml-[20px] cursor-pointer">Platform</p>
            <p className="ml-[20px] cursor-pointer">Solution</p>
            <p className="ml-[20px] cursor-pointer">About us</p>
            <p className="ml-[20px] cursor-pointer">Pricing</p>
            <p className="ml-[20px] cursor-pointer">Contact us</p>
          </div>
        </div> */}
        {/* <div className="grid grid-cols-2 divide-x w-full m-[4vh]">
        <div className=" border-none border-0 items-center justify-center mx-auto mt-[15vh]">
          <div
            className="mb-5  text-[#808080]"
            onChange={() => {
              mode?.setDarkMode(!mode?.darkMode);
            }}
          >
            <CustomizedSwitches />
          </div>
          <h1
            className="text-4xl text-left  w-[360px] login-style-heading "
            style={{ color: mode?.darkMode ? "white" : "black" }}
          >
            Welcome back
          </h1>
          <p
            className="text-left pt-[12px] login-style-text"
            style={{ color: mode?.darkMode ? "white" : "black" }}
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
                style={{ color: mode?.darkMode ? "#C0C0C0" : "#344054" }}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-white text-black text-xl border border-slate-300 rounded-md bg-black p-2 pl-5 w-full"
                style={{ color: mode?.darkMode ? "#C0C0C0" : "black" }}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="pb-5">
              <label
                className="pb-[6px]"
                style={{ color: mode?.darkMode ? "#C0C0C0" : "#344054" }}
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
                style={{ color: mode?.darkMode ? "#C0C0C0" : "#344054" }}
              >
                Remember for 30 days
              </label>
              <button
                className="text-[#0353CC] ml-[6vh] forgot-password"
                style={{ color: mode?.darkMode ? "#8ec3eb" : "#0353cc" }}
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
                  style={{ color: mode?.darkMode ? "#C0C0C0" : "#344054" }}
                >
                  Sign in with Google
                </span>
              </button>
            </div>
            <div
              className="text-center  pt-[32px]"
              style={{ color: mode?.darkMode ? "white" : "#475467" }}
            >
              <span>Don’t have an account?&nbsp;</span>
              <span
                className="cursor-pointer sign-up"
                onClick={handleSignupClick}
                style={{ color: mode?.darkMode ? "#8ec3eb" : "#0353cc" }}
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
        <div className=" border-none border-0 pl-[96px]">
          <LoginPageImage />
        </div>
      </div> */}
      </div>
    </div>
  );
}
