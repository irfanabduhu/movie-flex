import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [searchFailed, setSearchFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Search failed.");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useUserInfo();

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult(null);
    setSearchFailed(false);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:3333/fetch?t=${title}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      const { data } = res;
      setResult(data);
    } catch (err) {
      if (err.response.status === 404)
        setErrorMessage(`No movie found with title: ${title}`);
      console.error(
        "An error occured while searching for a movie:",
        err.message
      );
      setSearchFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
          <Link href="/">Movie Flix</Link>
        </h1>
        <h3 className="text-right text-red-700 align-baseline">
          <Link href="/admin">Go back to dashboard &#10230; </Link>
        </h3>
      </div>

      <div className="mt-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          Add a new movie
        </h1>
        <form className="flex" onSubmit={handleSearch}>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            className="bg-gray-50 mb-2 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5 h-10"
          />
          <button
            type="submit"
            className="w-24 h-10 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
            disabled={!title}
          >
            Search
          </button>
        </form>
        <div>
          {loading ? (
            <div className="flex h-[70vh]">
              <div role="status" className="m-auto">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : result ? (
            <Summary movie={result.movie} casts={result.casts} />
          ) : searchFailed ? (
            <div className="flex h-[50vh]">
              <div role="status" className="m-auto">
                <h1 className="font-mono text-xl text-red-700">
                  {errorMessage}
                </h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Summary({ movie, casts }) {
  const [rentPrice, setRentPrice] = useState(1.99);
  const [rentPeriod, setRentPeriod] = useState(7);
  const [plan, setPlan] = useState("basic");
  const [userInfo, setUserInfo] = useUserInfo();

  const addToCatalogue = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3333/catalogue",
        {
          movie: {
            ...movie,
            rentPrice: +rentPrice,
            rentPeriod: +rentPeriod,
            plan,
          },
          casts,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      if (res.status === 201) {
        alert("Successfully added the movie to the catalogue");
      }
    } catch (err) {
      alert("Failed to add the movie to catalogue");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <img
        src={movie.posterUrl}
        className="object-cover w-auto h-full rounded-l-lg"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {movie.title}
        </h1>
        <p className="mb-2 font-normal text-gray-700">
          Release Year: {movie.releaseYear}
        </p>
        <p className="mb-2 font-normal text-gray-700">
          Tags: {movie?.tags?.join(", ") ?? ""}
        </p>
        <p className="mb-2 font-normal text-gray-700">
          Casts: {casts.join(", ")}
        </p>
        <div className="mb-2">
          <label
            htmlFor="rentPrice"
            className="block mb-1 mr-2 font-normal text-gray-700 "
          >
            Rent Price:
          </label>
          <input
            id="rentPrice"
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            type="number"
            placeholder="Rent price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="rentPeriod"
            className="block mb-1 mr-2 font-normal text-gray-700 "
          >
            Rent Period (in days):
          </label>
          <input
            id="rentPeriod"
            value={rentPeriod}
            onChange={(e) => setRentPeriod(e.target.value)}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
            placeholder="Rent period"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="plan"
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
          disabled={!rentPrice || !rentPeriod || rentPeriod == 0}
          onClick={addToCatalogue}
        >
          Add to Catalogue
        </button>
      </div>
    </div>
  );
}
