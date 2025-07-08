import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/Student/SearchBar";
import { use } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/Student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/Student/Footer";

const CourseList = () => {
  const { navigate, allCourse } = useContext(AppContext);
  const { input } = useParams();
  const [filterCourse, setFilterCourse] = useState([]);

  // console.log(input);
  useEffect(() => {
    if (allCourse && allCourse.length > 0) {
      const tempCourses = allCourse.slice();
      input
        ? setFilterCourse(
            tempCourses.filter((course) =>
              course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilterCourse(tempCourses);
    }
  }, [allCourse, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col justify-between items-center gap-6  w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-500  ">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="cross icon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-3 my-16 md:p-0">
          {/* {filterCourse.map((course,idx)=> <CourseCard key={idx} course={course}/>)} */}
          {filterCourse.length === 0 ? (
            <div className="text-center text-4xl font-semibold text-gray-500">
              No courses found.
            </div>
          ) : (
            filterCourse.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CourseList;
