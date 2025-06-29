import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const { allCourse } = useContext(AppContext);
  return (
    <>
      <div className="py-16 md:px-40 px-8">
        <h2 className="text-gray-800 font-medium text-3xl">Learn form Best</h2>
        <p className=" text-gray-500 text-sm md:text-base mt-3">
          Discover our top-rated courses across various categories.From coding
          and desing to business <br /> and wellness, our courses are crafted to
          deliver to result.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-4 md:px-0 md:py-12 my-8 gap-8">
          {allCourse.slice(0, 4).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        <Link
          to={"/course-list"}
          onClick={() => scrollTo(0, 0)}
          className="text-gray border border-gray-500/30 px-10 py-3 rounded hover:bg-blue-500 hover:text-white"
        >
          {" "}
          Show all Course
        </Link>
      </div>
    </>
  );
};

export default CourseSection;
