import axios from "axios";
import Link from "next/link";
import Card from "@/components/movie/Card";

export default function Dashboard({ movies }) {
  return (
    <div className="w-4/5 mx-auto">
      <div className="flex justify-between py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
          <Link href="/">Movie Flix</Link>
        </h1>
        <div className="flex justify-end gap-8">
          <h3 className="text-right text-blue-700 align-baseline">
            <Link href="/admin/add">Add to Catalogue</Link>
          </h3>
          <h3 className="text-right text-red-700 align-baseline">
            <Link href="/">Exit &#10230;</Link>
          </h3>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          Current Catalogue
        </h1>
        <div className="grid grid-cols-2 gap-2">
          {movies.map((movie) => (
            <Link href={`/admin/movie/${movie.title}`} key={movie.id}>
              <Card movie={movie} />
            </Link>
          ))}
        </div>
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
