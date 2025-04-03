import TopSongs from "./TopSongs";
import SearchSong from "./SearchSong";
import Wireframe from "./Wireframe"
import SearchSongInfo from "./SearchSongInfo";
import AppIcon from "../assets/img/AppIcon.png";
import { useState } from "react";

export default function MainPage() {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState([]);
  const [songData, setSongData] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [isLiked, setIsLiked] = useState([]);
  const [likedData, setLikedData] = useState([]);
  const [ticked, setTicked] =useState(false);
  

  // console.log("Song data", songs);
  // console.log("search Song data", songData);
  // console.log("Current view data", currentView);
  const fetchTopSongs = async () => {
    try {
      const response = await fetch(
        "https://itunes.apple.com/in/rss/topsongs/limit=30/json"
      );
      const data = await response.json();
      const result = data.feed.entry;
      // console.log("top song fetch", result);
      return result;
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const fetchRomSongs = async () => {
    try {
      const response = await fetch(
        "https://itunes.apple.com/in/rss/topsongs/limit=20/genre=14/json"
      );
      const data = await response.json();
      const result = data.feed.entry;
      // console.log("sad song", result);
      return result;
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  let fetchTopSong = async () => {
    let data = await fetchTopSongs();
    setSongs(data);
    //setting which data we fetched on current view
    setCurrentView("songs"); 
  };
  let fetchRomSong = async () => {
    let data = await fetchRomSongs();
    setSongs(data);
    //setting which data we fetched on current view
    setCurrentView("songs"); 
  };
    let fetchTrackSong = async() =>{
    let data = await fetchTopSongs();
    setSongs(
       data.filter(song =>
         new Date(song["im:releaseDate"].label).getFullYear() == 2024));
    //setting which data we fetched on current view 
    setCurrentView("songs"); 
  }
  let showLikedSong= () =>{
   setCurrentView("songs")
   setSongs(likedData)   
  }


  //Liked Songs
  const handleLikedSong = (song) =>{
    setIsLiked(song);
    setTicked(true);
    setLikedData((preData) => {
        const songId = song.id.attributes["im:id"];
        if(preData.some((s) => s.id.attributes["im:id"] === songId)){
        //unlike: Remove the song from the liked list
        return preData.filter((s) => s.id.attributes["im:id"] !== songId)
    }else {     
       // Like: Add the song to the liked list
      return [...preData, song];
    }
  });
};
  // console.log(" Liked DATA",likedData)
  // Search result data 
  let fetchSongData = (result) => {
    setSongData(result);
    setCurrentView("songData"); //setting which data we fetched on current view  for song data
  };


  //Filtering Button of Top songs
  const resetFilter = (songs) => {
    setFilter(songs);
    // console.log(songs);
  };
  const getBollywood = (songs) => {
    setFilter(
      songs.filter((song) => song.category.attributes.term === "Bollywood")
    );
  };
  const getPop = (songs) => {
    setFilter(
      songs.filter((song) => song.category.attributes.term === "Pop")
    );
  };
  const getLatest = (songs) => {
    const sortedSongs = [...songs].sort(
      (a, b) =>
        new Date(b["im:releaseDate"].label) -
        new Date(a["im:releaseDate"].label)
    );
    setFilter(sortedSongs); // Set the sorted songs to state
  };

 

  return (
    <>
      <nav className="container mx-auto flex flex-col sm:flex-row ">
        <div className="flex justify-center sm:justify-start items-center sm:basis-1/3 p-2 sm:p-4">
          <div className="mr-4">
            <img
              src={AppIcon}
              alt="App Icon"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold md:text-2xl">
              MusicTune
            </h2>
            <p className="text-sm font-light -mt-1 md:text-md">
              Listen with love
              <i className="fa-solid fa-heart pl-1 text-[#ff0000]"></i>
            </p>
          </div>
        </div>
        <div className="flex basis-2/3 mb-2  ">
          <div className="border-1 border-[#ff951d] w-full mx-4 px-4 py-2 rounded-full flex items-center sm:my-4 sm:py-0  ">
            <i className="fa-duotone  fa-solid fa-magnifying-glass pr-4  text-lg sm:text-xl "></i>
            <SearchSong fetchSongData={fetchSongData} />
          </div>
        </div>
      </nav>
{/* Section  */}
      <section className="container mx-auto flex flex-col sm:flex-row max-h-[87vh] relative ">
        <div className="flex flex-wrap sm:max-h-0 basis-1/3  p-2 ">
          <div
            className="sm:w-40 sm:min-w-30  max-h-24 grow-1 m-1 mt-0 flex flex-col justify-center items-center  rounded-lg  p-2 sm:p-4  text-center text-lg sm:text-xl bg-[#db462a] group cursor-pointer opacity-90 hover:opacity-100 active:opacity-100"
            onClick={fetchTopSong}
          >
            <p>Top Indian Song</p>
            <i className="fa-solid sm:text-2xl fa-location-arrow pt-1 duration-300   group-hover:rotate-45 "></i>
          </div>
          <div
            className="sm:w-40 sm:min-w-30  max-h-24 grow-1 m-1 mt-0 flex flex-col justify-center items-center rounded-lg  p-2 sm:p-4 text-center text-lg sm:text-xl text-[#000] bg-[#ffe93d] group cursor-pointer opacity-90 hover:opacity-100 "
            onClick={fetchRomSong}
          >
            <p>Romantic Song</p>
            <i className="fa-solid sm:text-2xl fa-location-arrow pt-1 duration-300   group-hover:rotate-45"></i>
          </div>
           <div
            className="sm:w-40 sm:min-w-30  max-h-24 grow-1 m-1 mt-0 flex flex-col justify-center items-center rounded-lg  p-2 sm:p-4 text-center text-lg sm:text-xl text-[#000] bg-[#b7cf9c] group cursor-pointer opacity-90 hover:opacity-100 "
            onClick={fetchTrackSong}
          >
            <p>Tracks 2024 </p>
            <i className="fa-solid sm:text-2xl fa-location-arrow pt-1 duration-300   group-hover:rotate-45"></i>
          </div>
           <div
            className="sm:w-40 sm:min-w-30  max-h-24 grow-1 m-1 mt-0 flex flex-col justify-center items-center rounded-lg  p-2 sm:p-4 text-center text-lg sm:text-xl text-[#fff] bg-[#ff0011] group cursor-pointer opacity-90 hover:opacity-100 "
            onClick={showLikedSong}
          >
            <p>Liked Song </p>
            <i className="fa-solid fa-heart sm:text-2xl text-[#f1f1f1] pt-1 duration-800   group-hover:rotate-360"></i>
          </div>
        </div>
        <div className="flex basis-2/3 h-[87vh]  max-h-[50rem] overflow-y-scroll">
        {/* Show skeleton */}
        {currentView === "" && ( <Wireframe/> )}
 
        {/* Show  song  */}
          {currentView === "songs" && (
            <TopSongs
              songs={songs}
              filter={filter}
              resetFilter={resetFilter}
              getBollywood={getBollywood}
              getPop={getPop}
              getLatest={getLatest}
              handleLikedSong={handleLikedSong}
              ticked={ticked}     
            />
          )}
          {/* display search song data  */}
          {currentView === "songData" && <SearchSongInfo songData={songData} />}
        </div>
      </section>
    </>
  );
}
