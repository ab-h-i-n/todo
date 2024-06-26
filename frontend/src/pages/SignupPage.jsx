import React, { useRef, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import SubmitButton from "../components/SubmitButton";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SignupPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const [isLoading,setLoading] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(isLoading){
      return;
    }

    setLoading(true);
    try {
      const newUsr = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const responce = await fetch(`${serverUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsr),
      });

      const { data, error } = await responce.json();

      if (data) {
        secureLocalStorage.setItem(
          "user",
          JSON.stringify({
            _id: data._id,
          })
        );

        alert("User created succesfully!");
        navigate("/");
      } else {
        console.log(error);
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col h-screen mx-12">
      <Header />
      <div className="grid place-items-center h-screen">
        <form
          onSubmit={handleSignUp}
          className=" grid  w-full max-w-[600px] lg:py-20 lg:px-12 gap-4 bg-[#fcfeffdb] backdrop-blur-sm p-10 rounded-3xl shadow-2xl shadow-themeShadow"
        >
          <div>
            <div className="mb-1 block">
              <Label htmlFor="name" value="Name" className="lg:text-lg" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="example"
              required
              ref={nameRef}
            />
          </div>
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
            to={`${isLoading ? '/signup' : '/signin'}`}
            className="my-2 text-xs lg:text-base tracking-tighter text-themeShadow hover:underline "
          >
            Already have an account?{" "}
            <span className={`${isLoading ? 'text-themeBlueLight' : 'text-themeBlue'} font-semibold`}>Sign In</span>
          </Link>
          <SubmitButton text={"Sign Up"} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
