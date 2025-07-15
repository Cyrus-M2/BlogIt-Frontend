import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/blogs"
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/new"
        element={
          <ProtectedRoute>
            <BlogCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <ProtectedRoute>
            <BlogDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/:id/edit"
        element={
          <ProtectedRoute>
            <BlogEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
