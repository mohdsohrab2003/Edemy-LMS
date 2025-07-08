import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const MyEnrollment = () => {
  const { enrolledCourse, setEnrolledCourse, calculateCourseDuration } =
    useContext(AppContext);
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
                        className="mb-1 max-sm:text-sm"
                        onClick={() => navigate(`/course/${course._id}`)}
                      >
                        {course.courseTitle}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    4 / 10 <span>Lecture</span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden ">
                    <button>On Going</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEnrollment;
