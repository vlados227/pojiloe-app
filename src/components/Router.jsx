import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ExcursionList from "../components/Excursions/ExcursionList";
import AddExcursion from "./Admin/AddExcursion";
import ManageExcursions from "../components/Admin/ManageExcursions";
import UpdateExcursion from "../components/Admin/UpdateExcursion";
import ExcursionDetails from "../components/Excursions/ExcursionDetails";
import UserProfile from "./User/UserGetsSelf";
import Layout from "./Layouts/Layout";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExcursionList />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="excursions/all" element={<ExcursionList />} />
          <Route path="excursions/:id" element={<ExcursionDetails />} />
          <Route path="admin/add-excursion" element={<AddExcursion />} />
          <Route path="admin/manage-excursions" element={<ManageExcursions />} />
          <Route path="admin/update-excursion/:id" element={<UpdateExcursion />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterComponent;