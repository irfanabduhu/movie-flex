import { useState } from "react";

function Card({ movie }) {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={movie.posterUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Release Year: {movie.releaseYear}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Tags:{" "}
          {movie.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Casts: {movie.Casts?.map((cast) => cast.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default function MoviesPage({ movies }) {
  return (
    <div className="grid grid-cols-3 w-4/5 mx-auto">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3333/movie");
  const data = await res.json();
  const { movies } = data;

  return {
    props: { movies },
  };
}
