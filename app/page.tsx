import React from "react";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />

      <HomeMenu />

      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader="Our story" mainHeader="About us" />

        <div className="max-w-2xl text-gray-500 mx-auto mt-4 flex flex-col gap-4">
          <p className=" ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            impedit nulla et perspiciatis officiis laudantium rem, unde
            similique eaque velit repellat quaerat magni ea sint optio! Eius
            minima repudiandae temporibus.
          </p>

          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            impedit nulla et perspiciatis officiis laudantium rem, unde
            similique eaque velit repellat quaerat magni ea sint optio! Eius
            minima repudiandae temporibus.
          </p>

          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            impedit nulla et perspiciatis officiis laudantium rem
          </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact us" />

        <div className="mt-8">
          <a
            href="tel:+46738123123"
            className="text-4xl underline text-gray-500"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
