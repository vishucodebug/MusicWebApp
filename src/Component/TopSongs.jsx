import { useState } from "react";
import SongPlayer from "./SongPlayer";
// import Player from "./player";

// eslint-disable-next-line react/prop-types
const TopSongs = ({
  songs,
  filter,
  resetFilter,
  getBollywood,
  getPop,
  getLatest,
  handleLikedSong,
}) => {
  
  // Selected Song for Song Player
  const [selectedSong, setSelectedSong] = useState(null);
   
   const handleClick = (e) => {
    e.target.classList.toggle("rotate-360");
    e.target.classList.toggle("duration-800");
  };
  
  // to handle selected song for song player
  const handleSelectedSong = (song) => {
    if (!selectedSong) {
      setSelectedSong(song);
    } else if (selectedSong && selectedSong.title.label !== song.title.label) {
      //if new song selected it will reset the songPlayer
      setSelectedSong(null);
      setTimeout(() => setSelectedSong(song), 0);
    }
  };
  
  return (
    (songs.length > 0 || filter.length > 0) && (
      <div>
        <h2 className="text-xl ml-3">Result By Song</h2>
        <div className="text-sm ml-3">
          <button
            onClick={resetFilter}
            className="border-1 m-1 rounded-md px-4 py-1 duration-300 hover:bg-[#ff951d] hover:text-[#000] hover:border-[#ff851d] hover:font-semibold focus:bg-[#ff951d] focus:text-[#000] focus:border-[#ff851d] focus:font-semibold"
          >
            All
          </button>
          <button
            onClick={() => getLatest(songs)}
            className="border-1 m-1 rounded-md px-4 py-1 duration-300 hover:bg-[#ff951d] hover:text-[#000] hover:border-[#ff851d] hover:font-semibold focus:bg-[#ff951d] focus:text-[#000] focus:border-[#ff851d] focus:font-semibold"
          >
            Latest
          </button>
          <button
            onClick={() => getBollywood(songs)}
            className="border-1 m-1 rounded-md px-4 py-1 duration-300 hover:bg-[#ff951d] hover:text-[#000] hover:border-[#ff851d] hover:font-semibold focus:bg-[#ff951d] focus:text-[#000] focus:border-[#ff851d] focus:font-semibold"
          >
            Bollywood
          </button>{" "}
          <button
            onClick={() => getPop(songs)}
            className="border-1 m-1 rounded-md px-4 py-1 duration-300 hover:bg-[#ff951d] hover:text-[#000] hover:border-[#ff851d] hover:font-semibold focus:bg-[#ff951d] focus:text-[#000] focus:border-[#ff851d] focus:font-semibold"
          >
            Pop
          </button>
        </div>

        <div className="flex flex-wrap 1-full">
          {(filter.length > 0 ? filter : songs).map((song, index) => (
            <div
              key={index}
              className=" bg-[#222] shadow-xl m-2  rounded-sm flex lg:basis-1/3 grow-1 cursor-pointer duration-800
              hover:bg-[#333] border-2 border-[#222] 
              relative group p-2"
            >
              <div className="basis-1/3 pr-2  flex items-center ">
                <img
                  src={song["im:image"][2].label}
                  alt={song.title.label}
                  className=" h-30 w-full object-cover rounded-sm"
                />
              </div>
              <div className="basis-2/3 flex flex-col justify-start">
                <p className=" sm:text-lg font-semibold text-[#ff951d]">
                  {song["im:name"].label}
                </p>
                <p className=" text-sm sm:text-md">
                  {" "}
                  By {song["im:artist"].label}
                </p>
                <p className="text-sm ">
                  <span> {song.category.attributes.term}</span> |{" "}
                  <span>
                    {" "}
                    {new Date(song["im:releaseDate"].label).getFullYear()}
                  </span>
                </p>
                <a
                  href={song["im:artist"].attributes.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffe93d] text-sm hover:underline"
                >
                  Artist Popular Songs
                </a>
              </div>
              <div
                onClick={() => handleSelectedSong(song)}
                className="w-16 h-16 flex md:hidden group-hover:flex bg-[#db462a] absolute bottom-2 right-2  rounded-full justify-center border-1 border-[#333] hover:border-[#ffe93d] sm:opacity-75 items-center duration-800 hover:opacity-100 hover:rotate-360 "
              >
                <i className="fa-solid fa-play text-3xl "></i>
              </div>
               <div
                onClick={() => handleLikedSong(song)}
                className="w-8 h-8 flex md:hidden group-hover:flex absolute top-1 bg-[#f1f1f1] right-1  rounded-full justify-center border-1 border-[#333] hover:border-[#ffe93d] sm:opacity-75 items-center duration-800 hover:opacity-100  "
              >
            <i
      className="fa-solid fa-heart text-xl text-[#db462a]  cursor-pointer" 
      onClick={handleClick} ></i>
               
              </div>
            </div>
          ))}
        </div>

        <SongPlayer selectedSong={selectedSong} />
      </div>
    )
  );
};

export default TopSongs;
