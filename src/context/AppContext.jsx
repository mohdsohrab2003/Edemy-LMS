import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourse, setAllCourse] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const navigate = useNavigate();

  const fetchAllCourse = async () => {
    setAllCourse(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourse();
  });

  // Function to calculate average rating
  const calAverageRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const value = {
    currency,
    allCourse,
    calAverageRating,
    isEducator,
    navigate,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
