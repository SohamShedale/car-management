import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex p-5 items-center gap-10 h-[91vh]">
        <img
          src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="hero-img"
          className="w-[60%]"
        />
        <p className="w-[40%] text-justify flex flex-col gap-6">
          <header className="text-5xl text-[#5243e6] text-center leading-snug">
            Manage Your Fleet, Simplify Your Life
          </header>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          porro rerum est suscipit temporibus placeat iusto repellat asperiores
          quaerat aliquid? Accusantium reiciendis magnam sit in, aliquam
          similique commodi illum, corporis, animi obcaecati necessitatibus!
          Ratione, sunt! Voluptatibus dolore quod repellendus dolor, rerum, est
          reiciendis quibusdam doloremque aspernatur sapiente, perspiciatis
          possimus quis.
        </p>
      </div>
    </div>
  );
};

export default Home;
