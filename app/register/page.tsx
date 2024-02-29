"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);

  function resetUserPrevStates() {
    setUserCreated(false);
    setError(false);
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();

    resetUserPrevStates();
    setCreatingUser(true);
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCreated(true);
        setCreatingUser(false);
        setError(false);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setUserCreated(false);
        setCreatingUser(false);
        setError(true);
      });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br /> Now you can{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
          .
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
          An error has occured.
          <br /> Please try again later.
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />

        <button type="submit" disabled={creatingUser}>
          Register
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

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link href="/login" className="underline">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;
