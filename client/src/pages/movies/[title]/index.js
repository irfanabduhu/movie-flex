import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MovieDetailsUser({ movie }) {
  const [userInfo, setUserInfo] = useUserInfo();
  const [playAccess, setPlayAccess] = useState(
    () => userInfo.plan === "premium"
  );
  console.log(userInfo);

  const handleRentMovie = async () => {
    const userId = userInfo.userId;
    const movieId = movie.id;

    try {
      const res = await axios.post("http://localhost:3333/rent", {
        userId,
        movieId,
        rentPeriod: movie.rentPeriod,
        rentPrice: movie.rentPrice,
      });

      if (res.status === 201) {
        alert("Successfully rented the movie");
        setPlayAccess(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const checkStatus = async () => {
      const userId = userInfo.userId;
      const movieId = movie.id;

      try {
        const res = await axios.get("http://localhost:3333/rent/status", {
          params: { movieId, userId },
        });

        if (res.status === 200) {
          setPlayAccess(true);
        }
      } catch (err) {}
    };

    if (movie.plan === "premium" && userInfo.plan === "basic") checkStatus();
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
          <Link href="/">Movie Flix</Link>
        </h1>
        <h3 className="text-right text-red-700 align-baseline">
          <Link href="/movies">Go back to movie catalogue &#10230;</Link>
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
            {playAccess || movie.plan === "basic" ? (
              <Link
                href={`/movies/${movie.title}/play`}
                className="w-48 py-2 mr-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
              >
                Play
              </Link>
            ) : (
              <button
                type="submit"
                className="w-48 py-2 mr-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:text-black"
                onClick={handleRentMovie}
              >
                Rent
              </button>
            )}
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
