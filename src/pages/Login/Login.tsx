import "./Login.css";
import { useState } from "react";
import { onChange } from "../../utils/event";
import { type JsonData } from "../../utils/types";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handledLogin, setHandledLogin] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const responseJSON: JsonData = await res.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      setHandledLogin(true);
      localStorage.setItem("jwt", responseJSON.data.jwt);
    }
  }

  if (handledLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          required
          onChange={onChange(setEmail)}
        />

        <input
          type="password"
          value={password}
          required
          onChange={onChange(setPassword)}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}
