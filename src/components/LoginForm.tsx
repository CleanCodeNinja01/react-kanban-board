import React, { useState } from "react";
import { loginWithEmail } from "../authService";
import App from "../App";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    try {
      const result = await loginWithEmail(email, password);
      if (result.success) {
        setMsg(`Welcome, ${result.user.email}`);
        // Redirect or store user info here
      } else {
        setMsg(`Login failed: ${result.error}`);
      }
    } catch {
      setMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const isError = msg.includes("failed") || msg.includes("error");

  const renderErrorMessage = () => {
    if (isError) {
      return (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {msg}
        </p>
      );
    }
  };

  const renderSuccessMessage = () => {
    if (!isError) {
      return (
        <>
          <p
            style={{
              color: "green",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {msg}
          </p>
          <App />
        </>
      );
    }
  };

  const renderLoadingMessage = () => {
    if (loading) {
      return (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #007BFF",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
      );
    }
  }

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 300,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 5,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
            fontSize: "16px",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
            fontSize: "16px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: 10,
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: "16px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          Submit
          {/* {loading ? "Submitting..." : "Submit"} */}
        </button>
      </form>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {loading && renderLoadingMessage()}
      {!msg && !loading && renderForm()}
      {msg && isError && renderErrorMessage()}
      {msg && !isError && renderSuccessMessage()}
    </div>
  );
}

export default LoginForm;
