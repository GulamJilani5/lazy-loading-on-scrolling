import { Suspense, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import About from "../components/About";
import Spinner from "../components/spinner/Spinner";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Services from "../components/Services";

export default function Dashboard() {
  const [showServices, setShowServices] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const servicesRef = useRef();
  const testimonialRef = useRef();
  const contactRef = useRef();

  useEffect(() => {
    const loadSection = (entries) => {
      entries.forEach((entry) => {
        // console.log("Entry observed: ", entry.target);
        if (entry.isIntersecting) {
          if (entry.target === servicesRef.current) {
            setShowServices(true);
          } else if (entry.target === testimonialRef.current) {
            setShowTestimonial(true);
          } else if (entry.target === contactRef.current) {
            setShowContact(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(loadSection, {
      rootMargin: "0px 0px -100px 0px", // Adjust margin for better detection
      threshold: 0, // Trigger when element is even slightly visible
    });

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (testimonialRef.current) observer.unobserve(testimonialRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  return (
    <section>
      <Header />

      <About />

      {/* Lazy Load Services */}
      <div
        ref={servicesRef}
        className={`transition-opacity duration-500 delay-200 ${
          showServices ? "opacity-100" : "opacity-0"
        }`}
      >
        {showServices ? (
          <Suspense fallback={<Spinner />}>
            <Services />
          </Suspense>
        ) : (
          <Spinner />
        )}
      </div>

      {/* Lazy Load Testimonial */}
      <div
        ref={testimonialRef}
        className={`transition-opacity duration-500 delay-200 ${
          showTestimonial ? "opacity-100" : "opacity-0"
        }`}
      >
        {showTestimonial ? (
          <Suspense fallback={<Spinner />}>
            <Testimonial />
          </Suspense>
        ) : (
          <Spinner />
        )}
      </div>

      {/* Lazy Load Contact */}
      <div
        ref={contactRef}
        className={`transition-opacity duration-500 delay-200 ${
          showContact ? "opacity-100" : "opacity-0"
        }`}
      >
        {showContact ? (
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        ) : (
          <Spinner />
        )}
      </div>

      <Footer />
    </section>
  );
}
