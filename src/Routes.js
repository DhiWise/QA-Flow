import React from "react";
import Answers from "pages/Answers";
import Questions from "pages/Questions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/answers" element={<Answers />} />
        <Route path="/dhiwise-dashboard" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
