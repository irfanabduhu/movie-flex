import axios from "axios";
import Link from "next/link";

export default function Dashboard({ movies }) {
  return (
    <div className="w-4/5 mx-auto mt-4">
      <Link href="/admin/add" className="text-sm text-blue-700">
        Add to catalogue &#10230;
      </Link>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        Current Catalogue
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {movies.map((movie) => (
          <Link href={`/admin/movie/${movie.title}`} key={movie.id}>
            <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <img
                src={movie.posterUrl}
                className="object-cover w-48 h-full rounded-l-lg"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios("http://localhost:3333/movie");
  const { movies } = data;

  return {
    props: { movies },
  };
}
