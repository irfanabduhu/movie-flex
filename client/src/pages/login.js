import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import useUserInfo from "@/hooks/useUserInfo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useUserInfo();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3333/auth/login", {
        email,
        password,
      });

      console.log(res);

      if (res.status === 200) {
        const { name, plan, id: userId } = res.data.user;
        const { token } = res.data;
        setUserInfo({
          name,
          plan,
          userId,
          email,
          token,
        });
        Router.push("/movies");
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("Password do not match");
      } else if (err.response.status === 404) {
        alert(
          "There is no user with the given email. Please register to continue."
        );
      } else {
        alert("Unknown error occurred.");
        console.error("An error occurred while logging in user:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between px-8 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 ">
          <Link href="/">Movie Flix</Link>
        </h1>
        <h3 className="text-right align-baseline">
          <Link href="/admin">Admin dashboard &#10230;</Link>
        </h3>
      </div>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
                  disabled={loading || !email || !password}
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/register"
                    class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
