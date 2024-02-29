import React from "react";
import Image from "next/image";
import Right from "../icons/Right";

function Hero() {
  return (
    <section className="hero md:mt-8">
      <div className="px-4 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br />
          is better <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>

        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>

        <div className="flex items-center gap-4 text-sm">
          <button className="bg-primary text-white px-4 py-2 rounded-full flex gap-2 uppercase justify-center items-center">
            Order now <Right />
          </button>

          <button className="flex border-0 items-center gap-2 py-2 text-gray-600 font-semibold">
            Learn more <Right />
          </button>
        </div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
}

export default Hero;
