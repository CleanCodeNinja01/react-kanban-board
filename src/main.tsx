import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginForm from "./components/LoginForm.tsx";
// import LoginClassForm from "./components/LoginClassForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginForm />
    {/* <div>
      <LoginClassForm />
    </div> */}
  </StrictMode>
);
