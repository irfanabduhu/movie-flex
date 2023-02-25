import axios from "axios";
import Link from "next/link";
import Card from "@/components/movie/Card";

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
            <Card movie={movie} />
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
