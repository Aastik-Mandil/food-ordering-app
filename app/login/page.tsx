"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  async function handleFormSubmit(e: any) {
    e.preventDefault();

    setLoginInProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />

        <button type="submit" disabled={loginInProgress}>
          Login
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        <button
          type="button"
          className="flex gap-4 justify-center items-center"
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
          }}
        >
          <Image src="/google.png" alt="Google" width={32} height={32} /> Login
          with Google
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
