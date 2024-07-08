import React, { useState } from "react";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: "664fa4abef33997041cfb15e",
      Title: "Lost in Translation",
      Description:
        "A faded movie star and a lonely neglected young woman form an unlikely bond after crossing paths in the amazing city of Tokyo.",
      Genre: "Comedy",
      Name: "Sofia Coppola",
      Bio: "Sofia Carmina Coppola (/ˈkoʊpələ/ KOH-pəl-ə[1] Italian pronunciation: [soˈfiːa karˈmiːna ˈkoppola]; born May 14, 1971) is an American film director, screenwriter, producer, and former actress.",
      BirthDate: "May 14, 1971",
      DeathDate: null,
      imageURL: "https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg",
      Featured: false,
      movieid: 6,
    },
  ]);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} onMovieClick={setSelectedMovie} movie={movie} />
      ))}
    </div>
  );
};
