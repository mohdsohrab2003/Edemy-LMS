import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
const Player = () => {
  const { enrolledCourse, calculateCourseDuration, calculateChapterTime } =
    useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const getCourseData = () => {
    // enrolledCourse.map((course)=>{
    //   if(course._id===courseId){
    //     setCourseData(course);
    //   }
    // })
    const course = enrolledCourse.find((course) => course._id === courseId);
    if (course) setCourseData(course);
  };
  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !openSection[index] }));
  };
  useEffect(() => {
    getCourseData();
  }, [enrolledCourse, courseId]);
  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse  md:grid md:grid-cols-2 gap-10 md:px-36  ">
        {/* left Column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Stucture</h2>
          <div className="pt-5">
            {courseData?.courseContent?.map((chapter, idx) => {
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
                              src={
                                false ? assets.blue_tick_icon : assets.play_icon
                              }
                              alt="play icons"
                              className="w-4 h-4 mt-1 "
                            />
                            <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default ">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2 ">
                                {lecture.lectureUrl && (
                                  <p
                                    onClick={() =>
                                      setPlayerData({
                                        ...lecture,
                                        chapter: idx + 1,
                                        lecture: i + 1,
                                      })
                                    }
                                    className="text-blue-500 cursor-pointer"
                                  >
                                    Watch Now
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
          <div className="flex items-center gap-2 py-3 mt-10">
            <h2 className="text-xl font-semibold">Rate this Course</h2>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {playerData ? (
            <div className="md:mt-10">
              <YouTube
                videoId={playerData?.lectureUrl?.split("/").pop()}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-ratio"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-blue-600">
                  {false ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} />
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
