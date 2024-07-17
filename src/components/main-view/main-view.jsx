import React, { useEffect, useState } from "react";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]); // empty movie array

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = [
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
        {
          id: "664f99d8ef33997041cfb159",
          Title: "Scarface",
          Description: "A riveting drama about the rise and fall of a notorious drug dealer.",
          Genre: "Drama",
          Name: "Brian De Palma",
          Bio: "Brian Russell De Palma is an American film director and screenwriter. With a career spanning over 50 years, he is best known for work in the suspense, crime and psychological thriller genres.",
          BirthDate: "September 11, 1940",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/7/71/Scarface_-_1983_film.jpg",
          Featured: true,
          movieid: 1,
        },
        {
          id: "664f9a3fef33997041cfb15a",
          Title: "Good Will Hunting",
          Description:
            "A touching tale of a young man who struggles to find his identity, living in a world where he can solve any problem, except the one brewing deep within himself.",
          Genre: "Drama",
          Name: "Gus Van Sant",
          Bio: "Gus Green Van Sant Jr. is an American film director, producer, photographer, and musician who has earned acclaim as an independent filmmaker.",
          BirthDate: "July 24, 1952",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png",
          Featured: false,
          movieid: 2,
        },
        {
          id: "664fa455ef33997041cfb15b",
          Title: "Boiler Room",
          Description:
            "A college dropout, attempting to live up to his father's high standards, gets a job as a broker for a suburban investment firm which puts him on the fast track to success. But the job might not be as legitimate as it first appeared to be.",
          Genre: "Drama",
          Name: "Ben Younger",
          Bio: "Younger became disenchanted with politics, and by 1995 started to seek a creative outlet that would rekindle the excitement he felt as a stand-up comedian. He wrote and directed a short film, as well as working on a number of feature films as a grip, and directing music videos and commercials.",
          BirthDate: "October 7, 1972",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/5/5c/Boiler_room_ver3.jpg",
          Featured: false,
          movieid: 3,
        },
        {
          id: "664fa471ef33997041cfb15c",
          Title: "Zoolander",
          Description:
            "At the end of his career, a clueless fashion model is brainwashed to kill the Prime Minister of Malaysia.",
          Genre: "Comedy",
          Name: "Ben Stiller",
          Bio: "Benjamin Edward Meara Stiller is an American actor, filmmaker, and comedian.",
          BirthDate: "November, 30, 1965",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/7/7c/Movie_poster_zoolander.jpg",
          Featured: false,
          movieid: 4,
        },
        {
          id: "664fa48bef33997041cfb15d",
          Title: "Star Wars Episode IV",
          Description:
            "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
          Genre: "Science Fiction",
          Name: "George Lucas",
          Bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American filmmaker and philanthropist. He created the Star Wars and Indiana Jones franchises and founded Lucasfilm, LucasArts, Industrial Light & Magic and THX.",
          BirthDate: "May 14, 1944",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
          Featured: false,
          movieid: 5,
        },
        {
          id: "664fa4c2ef33997041cfb15f",
          Title: "Planes, Trains, and Automobiles",
          Description:
            "A Chicago advertising man must struggle to travel home from New York for Thanksgiving, with a lovable oaf of a shower-curtain-ring salesman as his only companion.",
          Genre: "Comedy",
          Name: "John Hughes",
          Bio: "John Wilden Hughes Jr. was an American film director, producer and screenwriter.",
          BirthDate: "February 18, 1950",
          DeathDate: "August 6, 2009",
          imageURL: "https://upload.wikimedia.org/wikipedia/en/d/d6/Planes_trains_and_automobiles.jpg",
          Featured: false,
          movieid: 7,
        },
        {
          id: "664fa4e0ef33997041cfb160",
          Title: "Forrest Gump",
          Description:
            "The history of the United States from the 1950s to the 70s unfolds from the perspective of an Alabama man with an IQ of 75. He yearns to be reunited with his childhood sweetheart.",
          Genre: "Comedy",
          Name: "Robert Zemeckis",
          Bio: "Robert Lee Zemeckis (born May 14, 1952) is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future trilogy, and the live-action/animated comedy Who Framed Roger Rabbit. He is considered one of the greatest directors in cinema history.",
          BirthDate: "May 14, 1952",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
          Featured: false,
          movieid: 8,
        },
        {
          id: "664fa4f9ef33997041cfb161",
          Title: "Back to the Future",
          Description:
            "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
          Genre: "Comedy",
          Name: "Robert Zemeckis",
          Bio: "Robert Lee Zemeckis (born May 14, 1952) is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future trilogy, and the live-action/animated comedy Who Framed Roger Rabbit. He is considered one of the greatest directors in cinema history.",
          BirthDate: "May 14, 1952",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg",
          Featured: false,
          movieid: 9,
        },
        {
          id: "664fa50eef33997041cfb162",
          Title: "My Cousin Vinny",
          Description:
            "Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.",
          Genre: "Comedy",
          Name: "Jonathan Lynn",
          Bio: "Jonathan Adam Lynn is an English stage and film director, producer, writer, and actor. He directed the comedy films Clue, Nuns on the Run, My Cousin Vinny, and The Whole Nine Yards.",
          BirthDate: "April 3, 1943",
          DeathDate: null,
          imageURL: "https://upload.wikimedia.org/wikipedia/en/7/76/My-Cousin-Vinny-Poster.jpg",
          Featured: false,
          movieid: 10,
        },
      ];
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

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

// This uses 'selectedMovie' to determine how to show the list of movies. If a selected movie is not 'null' then the 'MovieView' is rendered.
