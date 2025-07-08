import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
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
  // function to calculate chapter time
  
  const calculateChapterTime = (chapters) => {
    let totalTime = 0;
    chapters.chapterContent.forEach((lecture) => {
      totalTime += lecture.lectureDuration;
    });
    // Assuming lectureDuration is in minutes, convert to milliseconds:
    return humanizeDuration(totalTime * 60 * 1000, { units: ["h", "m"] });
  };
  // function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time=0;
    course.courseContent.map((chapter)=>chapter.chapterContent.forEach((lecture)=>time+=lecture.lectureDuration))
    return humanizeDuration(time *60*100,{unit:["h","m"]});
  }

  // function to calculate No of lecture
  const calculateNoOfLecture = (course) => {
    let totalLecture = 0;
    course.courseContent.forEach((chapter) => {
      if(Array.isArray(chapter.chapterContent)){
        totalLecture+=chapter.chapterContent.length;
      }
    });
    return totalLecture;
  };


  const value = {
    currency,
    allCourse,
    calAverageRating,
    isEducator,
    navigate,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLecture,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
