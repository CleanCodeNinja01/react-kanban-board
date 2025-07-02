import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import LoginForm from "./components/LoginForm.tsx";
// import Counter from "./components/Counter.tsx";
import App from "./App.tsx";
// import LoginClassForm from "./components/LoginClassForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App/>
    {/* <LoginForm /> */}
    {/* <div>
      <LoginClassForm />
    </div> */}
  </StrictMode>
);
