import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export default function MovieDetails({ movie }) {
  const [rentPrice, setRentPrice] = useState(movie.rentPrice);
  const [rentPeriod, setRentPeriod] = useState(movie.rentPeriod);
  const [plan, setPlan] = useState(movie.plan);

  const updateMovie = async () => {
    const res = await axios.put(`http://localhost:3333/movie/${movie.id}`, {
      rentPeriod,
      rentPrice,
      plan,
    });

    if (res.status === 200) {
      alert("Successfully updated the movie details");
    } else {
      alert("Failed to update movie details");
    }
  };

  const deleteMovie = async () => {
    const shouldDelete = confirm("Are you sure you want to delete this movie?");
    if (!shouldDelete) return;
    const res = await axios.delete(`http://localhost:3333/movie/${movie.id}`);
    if (res.status === 204) {
      Router.push("/admin");
    } else {
      alert("Failed to delete the movie");
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
              Tags: {movie.tags.join(", ")}
            </p>
            <p className="mb-2 font-normal text-gray-700">
              Casts: {movie.Casts.map((cast) => cast.name).join(", ")}
            </p>
            <div className="mb-2">
              <label
                for="rentPrice"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 block p-2.5"
              />
            </div>
            <div className="mb-2">
              <label
                for="rentPeriod"
                className="block mb-1 mr-2 font-normal text-gray-700 "
              >
                Rent Period:
              </label>
              <input
                id="rentPeriod"
                value={rentPeriod}
                onChange={(e) => setRentPeriod(e.target.value)}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 block p-2.5"
                placeholder="Rent period"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 block p-2.5"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-48 py-2 mr-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
                disabled={!rentPrice || !rentPeriod}
                onClick={updateMovie}
              >
                Update movie
              </button>
              <button
                type="submit"
                className="w-48 py-2 font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-gray-400 disabled:text-black"
                disabled={!rentPrice || !rentPeriod}
                onClick={deleteMovie}
              >
                Delete movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { title } = context.params;
  const { data } = await axios.get(`http://localhost:3333/movie/${title}`);
  const { movie } = data;
  return {
    props: { movie },
  };
}
