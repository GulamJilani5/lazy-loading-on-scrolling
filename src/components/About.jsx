import React, { useState, useEffect } from "react";
import { useFetchItems } from "../hooks/reactQueryCustomHooks";

const About = () => {
  const { data, isError, isPending } = useFetchItems();
  const products = data?.products || [];

  return (
    <section className="bg-lime-500 min-h-[calc(100vh-4rem)] p-4 uppercase flex justify-center">
      About Page
    </section>
  );
};

export default About;
