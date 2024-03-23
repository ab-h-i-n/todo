import React, { useRef } from "react";
import { Label, TextInput } from "flowbite-react";
import SubmitButton from "../components/SubmitButton";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const newUsr = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const responce = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsr),
      });

      if (responce.ok) {
        const responceJson = await responce.json();

        localStorage.setItem('user',JSON.stringify({
          _id : responceJson._id
        }))

      } else {
        console.error("There is an erro!");
      }

    } catch (error) {

      console.error(error);
    }finally{
      alert('User created succesfully!');
      navigate('/');
    }
  };

  return (
    <div className="grid place-items-center h-screen mx-12">
      <Header />
      <form
        onSubmit={handleSignUp}
        className="grid w-full max-w-[600px] lg:py-20 lg:px-12 gap-4 bg-[#fcfeff87] backdrop-blur-sm p-10 rounded-3xl shadow-2xl shadow-themeShadow"
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
          to={"/signin"}
          className="my-2 text-xs lg:text-base tracking-tighter text-themeShadow hover:underline "
        >
          Already have an account?{" "}
          <span className="text-themeBlue font-semibold">Sign In</span>
        </Link>
        <SubmitButton text={"Sign Up"} />
      </form>
    </div>
  );
};

export default SignupPage;
