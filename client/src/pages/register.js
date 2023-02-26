import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import useUserInfo from "@/hooks/useUserInfo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("basic");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useUserInfo();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:3333/auth/register`, {
        name,
        email,
        password,
        plan,
      });

      if (res.status === 200) {
        const { userId, token } = res.data;
        setUserInfo({
          userId,
          token,
          name,
          email,
          plan,
        });
        Router.push("/movies");
      }
    } catch (err) {
      if (err.response.status === 409) {
        alert(`A user with email ${email} already exists.`);
      } else {
        alert("Could not register the user");
        console.error("An error occurred while registering user:", err.message);
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
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={handleRegistration}
              >
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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

                <div className="mb-3">
                  <label
                    for="plan"
                    className="block mb-1 mr-2 font-normal text-gray-700 "
                  >
                    Plan:
                  </label>

                  <select
                    id="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
                  disabled={loading || !email || !password || !name || !plan}
                >
                  Register
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you have an account?{" "}
                  <Link
                    href="/login"
                    class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Log in
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
