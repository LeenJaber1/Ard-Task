import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import SignUp from "./pages/SignupPage";
import { RequireAuth } from "./utils/AuthUtil";

function MainContent() {
  return (
    <div style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

function App() {
  return <MainContent />;
}

export default App;
