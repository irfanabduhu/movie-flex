import Card from "@/components/movie/Card";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

export default function MoviesPage({ movies }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = () => {
    const filtered = movies.filter(
      (movie) =>
        (!title || movie.title.toLowerCase().includes(title.toLowerCase())) &&
        (!tag ||
          movie.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [movies, title, tag]);

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
          <Link href="/">Movie Flix</Link>
        </h1>
        <h3 className="text-right text-red-700 align-baseline">
          <Link href="/login">Log out &#10230;</Link>
        </h3>
      </div>
      <div className="mt-4">
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
            Filter Movies
          </h1>
          <div>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              className="bg-gray-50 mb-2 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5 h-10"
            />

            <input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="tag"
              className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5 h-10"
            />
          </div>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0" />
        <div className="grid grid-cols-2 gap-2">
          {filteredMovies.map((movie) => (
            <Link key={movie.id} href={"/movies/" + movie.title}>
              <Card movie={movie} />
            </Link>
          ))}
        </div>
      </div>
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
