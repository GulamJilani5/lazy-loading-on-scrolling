import { useEffect } from "react";
export default function Testimonial() {
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Mimic a network call with a delay of 200 milliseconds
    delay(500).then(() => {
      console.log("Header component loaded after delay.");
    });
  }, []);
  return (
    <section className="bg-purple-500 min-h-screen flex justify-center uppercase">
      Testimonial
    </section>
  );
}
