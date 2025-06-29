import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const Testimonial = () => {
  return (
    <>
      <div className="pb-14 px-8 md:px-0">
        <h2 className="text-3xl font-medium text-gray-800">Testimonials </h2>
        <p className="md:text-base text-gray-500 mt-3">
          Here from our learners as they share their journeys of
          transformation,success, and how our <br /> platform has mad a
          difference in their in their lives.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mt-14">
          {/* {dummyTestimonial.map((testimonial, idx) => {
            <div
              key={idx}
              className="tex-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            >
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-13 w-12 rounded-full"
                />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-800">{testimonial.role}</p>
                </div>
              </div>
              <div className="p-7 pb-7">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 mt-5 ">{testimonial.feedback}</p>
            </div>;
          })} */}
          {dummyTestimonial.map((testimonial, idx) => (
            <div
              key={idx}
              className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
            >
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-13 w-12 rounded-full"
                />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-800">{testimonial.role}</p>
                </div>
              </div>
              <div className="p-7 pb-7">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="rating star"
                    />
                  ))}
                </div>
                <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
              </div>
              <a href="#" className="text-blue-500 underline px-5">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
