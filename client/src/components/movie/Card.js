export default function MovieCard({ movie }) {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow h-72 hover:bg-gray-100">
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
          Tags: {movie?.tags?.join(", ") ?? ""}
        </p>
        <p className="mb-2 font-normal text-gray-700">
          Casts: {movie.Casts?.map((cast) => cast.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
