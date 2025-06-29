import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { calAverageRating } = useContext(AppContext);
  const { currency } = useContext(AppContext);
  return (
    <>
      <Link
        to={"/course/" + course._id}
        onClick={() => scrollTo(0, 0)}
        className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
      >
        <img
          src={course.courseThumbnail}
          alt="course thumbnail"
          className="w-full"
        />
        <div className="p-3 text-left">
          <h3 className="text-base font-semibold ">{course.courseTitle}</h3>
          <h3 className="text-gray-500">{course.educator.name}</h3>
          <div className="flex items-center space-x-2 ">
            <p>{calAverageRating(course)}</p>
            <div className="flex gap">
              {[...Array(5)].map((_, i) => (
                <img
                  src={
                    i < Math.floor(calAverageRating(course))
                      ? assets.star
                      : assets.star_blank
                  }
                  key={i}
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-gray-500">{course.courseRatings.length}</p>
          </div>
          <p className="text-base font-semibold text-gray-500">
            {currency}
            {(
              course.coursePrice -
              (course.discount * course.coursePrice) / 100
            ).toFixed(2)}
          </p>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
