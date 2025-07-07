import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./Pages/Student/Home";
import CourseList from "./Pages/Student/CourseList";
import CourseDetails from "./Pages/Student/CourseDetails";
import MyEnrollment from "./Pages/Student/MyEnrollment";
import Player from "./Pages/Student/Player";
import Loading from "./components/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import Dashboard from "./Pages/Educator/Dashboard";
import AddCourse from "./Pages/Educator/AddCourse";
import MyCourse from "./Pages/Educator/MyCourse";
import StudentEnrolled from "./Pages/Educator/StudentEnrolled";
import Navbar from "./components/Student/Navbar";
import EduNavbar from "./components/Educator/EduNavbar";
const App = () => {
  const isEudcator = useMatch("/educator/*");
  return (
    <div className="text-default min-h-screen bg-white">
      {isEudcator ? <EduNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollment" element={<MyEnrollment />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-course" element={<MyCourse />} />
          <Route path="student-enrolled" element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
