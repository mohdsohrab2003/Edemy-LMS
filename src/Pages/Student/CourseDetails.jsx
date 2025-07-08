import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const {
    allCourse,
    calAverageRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLecture,
    currency,
  } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const fetchCourseData = async () => {
    if (!allCourse || allCourse.length === 0) return;

    const findCourse = allCourse.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourse]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !openSection[index] }));
  };
  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between  md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        {/* Left side */}
        <div className="max-w-xl z-10 text-gray-500 ">
          <h1 className="md:text-[36px] md:leading-[46px] text-[36px]leading-[46px] font-semibold text-gray-800 ">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* review and rating  */}
          <div className="flex items-center space-x-2 pt-3 pb-1 test-sm ">
            <p>{calAverageRating(courseData)}</p>
            <div className="flex gap">
              {[...Array(5)].map((_, i) => (
                <img
                  src={
                    i < Math.floor(calAverageRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  key={i}
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "Rating" : "Rating"}){" "}
            </p>
            <p className="">
              {courseData.enrolledStudents.length > 0 ? "Student" : "Student"}
            </p>
          </div>
          <p>
            Course By{" "}
            <span className="text-blue-600 font-semibold">Mohd Sohrab</span>
          </p>

          {/* course Structure  */}
          <div className="pt-8 text-gray-500 ">
            <h1 className="text-xl font-semibold">Course Structure</h1>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, idx) => {
                return (
                  <div
                    key={idx}
                    className="border border-gray-300 bg-white mb-2 rounded"
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                      onClick={() => toggleSection(idx)}
                    >
                      <div className="flex items-center gap-2 ">
                        <img
                          src={assets.down_arrow_icon}
                          alt="icons arrow"
                          className={`transform transition-transform ${
                            openSection[idx] ? "rotate-180" : ""
                          }`}
                        />
                        <p className="font-medium md:text-base text-sm">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-sm md:text-default">
                        {chapter.chapterContent.length} lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>
                    {/* chapter content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSection[idx] ? "max-h-96" : "max-h-0"
                      }  `}
                    >
                      <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300 ">
                        {chapter.chapterContent.map((lecture, i) => {
                          return (
                            <li
                              key={i}
                              className="flex items-center gap-2 py-1 cursor-pointer "
                            >
                              <img
                                src={assets.play_icon}
                                alt="play icons"
                                className="w-4 h-4 mt-1 "
                              />
                              <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default ">
                                <p>{lecture.lectureTitle}</p>
                                <div className="flex gap-2 ">
                                  {lecture.isPreviewFree && (
                                    <p
                                      onClick={() =>
                                        setPlayerData({
                                          videoId: lecture.lectureUrl
                                            .split("/")
                                            .pop(),
                                        })
                                      }
                                      className="text-blue-500 cursor-pointer"
                                    >
                                      Preview
                                    </p>
                                  )}
                                  <p className="">
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ["h", "m"] }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="py-20 text-sm md:text-default">
            <h1 className="text-xl font-semibold  text-gray-800 ">
              Course Description
            </h1>
            <p
              className="pt-3 rich-text "
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>

        {/* Right side */}
        <div className="max-w-[424px] shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] overflow-hidden md:rounded-none bg-white z-10 rounded-t min-w-[300px] sm:min-w-[420px] ">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-ratio"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-4 ">
              <img src={assets.time_clock_icon} alt="" className="w-3.5" />

              <p>
                <span className="text-red-500">5 Days</span> left at this price{" "}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2 ">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-gray-500 line-through md:text-lg ">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-gray-500 md:text-lg ">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center  text-sm md:text-default gap-6 pt-2  md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" />
                <p>{calAverageRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-cneter">
                <img src={assets.time_clock_icon} alt="clock icons" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-cneter">
                <img src={assets.time_clock_icon} alt="clock icons" />
                <p>{calculateNoOfLecture(courseData)}Lesson</p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white cousor-pointer font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
