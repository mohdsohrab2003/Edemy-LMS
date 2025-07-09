import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Footer from "../../components/Student/Footer";
import { Line } from "rc-progress";

const MyEnrollment = () => {
  const {
    enrolledCourse,
    setEnrolledCourse,
    calculateCourseDuration,
    navigate,
  } = useContext(AppContext);

  const [progressAraay, setProgressArray] = useState([
    { lectureComplete: 2, totalLecture: 5 },
    { lectureComplete: 8, totalLecture: 8 },
    { lectureComplete: 4, totalLecture: 5 },
    { lectureComplete: 4, totalLecture: 7 },
    { lectureComplete: 2, totalLecture: 5 },
    { lectureComplete: 1, totalLecture: 8 },
    { lectureComplete: 6, totalLecture: 9 },
    { lectureComplete: 3, totalLecture: 5 },
    { lectureComplete: 1, totalLecture: 4 },
    { lectureComplete: 4, totalLecture: 8 },
  ]);
 

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollment </h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden ">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Complete</th>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourse.map((course, idx) => {
              return (
                <tr key={idx} className="border-b border-gray-500/20 ">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3  ">
                    <img
                      src={course.courseThumbnail}
                      alt={course.name} // It's a good practice to add alt text
                      className="w-14 sm:w-24 md:w-28"
                    />
                    <div className="flex-1">
                      <p
                        className="mb-1 max-sm:text-sm "
                        onClick={() => navigate(`/course/${course._id}`)}
                      >
                        {course.courseTitle}
                      </p>
                      <Line
                        strokeWidth={2}
                        percent={
                          progressAraay[idx]
                            ? (progressAraay[idx].lectureComplete * 100) /
                              progressAraay[idx].totalLecture
                            : 0
                        }
                        className="bg-gray-300  rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    {progressAraay[idx] &&
                      `${progressAraay[idx].lectureComplete} / ${progressAraay[idx].totalLecture}`}{" "}
                    <span>Lecture</span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    <button
                      className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white "
                      onClick={() => navigate(`/player/${course._id}`)}
                    >
                      {progressAraay[idx] &&
                      progressAraay[idx].lectureComplete /
                        progressAraay[idx].totalLecture ===
                        1
                        ? "Completed"
                        : "In Progress"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollment;
