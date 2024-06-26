import React, { useRef, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import SubmitButton from "../components/SubmitButton";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SigninPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const [isLoading,setLoading] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();

    if(isLoading){
      return;
    }

    setLoading(true);
    try {
      const existingUser = {
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const responce = await fetch(`${serverUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingUser),
      });

      const { data, error } = await responce.json();

      if (data) {
        secureLocalStorage.setItem(
          "user",
          JSON.stringify({
            _id: data._id,
          })
        );

        alert("User Signed succesfully!");
        navigate("/");
      } else {
        alert(error);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen mx-12 ">
      <Header />
      <div className="grid place-items-center h-screen">
        <form
          onSubmit={handleSignIn}
          className="grid w-full max-w-[600px] gap-4 bg-[#fcfeffdb] backdrop-blur-sm p-10 lg:py-20 lg:px-12 rounded-3xl shadow-2xl shadow-themeShadow"
        >
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email1" value="Email" className="lg:text-lg" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              ref={emailRef}
              required
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label
                htmlFor="password1"
                value="Password"
                className="lg:text-lg"
              />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="........"
              ref={passRef}
              required
            />
          </div>
          <Link
            to={`${isLoading ? '/signin' : '/signup'}`}
            className="my-2 text-xs lg:text-base tracking-tighter text-themeShadow hover:underline "
          >
            Don't have an account?{" "}
            <span className={`${isLoading ? 'text-themeBlueLight' : 'text-themeBlue'} font-semibold`}>Sign Up</span>
          </Link>
          <SubmitButton text={"Sign In"} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
