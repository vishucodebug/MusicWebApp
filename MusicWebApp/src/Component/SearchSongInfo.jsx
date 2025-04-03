import { useState } from "react";
import SearchSongPlayer from "./SearchSongPlayer";

export default function SearchSongInfo({ songData }) {
  const [selectedSongData, setSelectedSongData] = useState(null);
  // to handle selected Searchsong for Searchsong player
  const handleSearchSongData = (song) => {
    setSelectedSongData(song);
    if (!selectedSongData) {
      setSelectedSongData(song);
    } else if (
      selectedSongData &&
      selectedSongData.trackName !== song.trackName
    ) {
      //   //if new song selected it will reset the songPlayer
      setSelectedSongData(null);
      setTimeout(() => setSelectedSongData(song), 0);
    }
  };

  return (
    <>
      <div className=" w-full">
        <h2 className="text-xl ml-3">Result By Search Song</h2>
        <p className="m-1 ml-3">Result Count : {songData?.resultCount}</p>
        <div className="flex flex-wrap ">
          {songData?.results?.map((song, index) => (
            <div
              key={index}
              className="  bg-[#222] shadow-xl m-2 p-2  rounded-sm flex lg:basis-1/3 grow-1 cursor-pointer duration-800
              hover:bg-[#333] border-2 border-[#222]
              relative group"
            >
              <div className="basis-1/3 mr-3  flex items-center ">
                <img
                  src={song.artworkUrl100}
                  alt="Image"
                  className="min-h-25 sm:min-h-30 w-full object-cover rounded-sm"
                />
              </div>
              <div className="basis-2/3 flex flex-col justify-start">
                <p className="text-md sm:text-lg font-semibold text-[#ff951d]">
                  {song.trackName}
                </p>
                <p className="sm:text-md">By {song.artistName}</p>
                <p className="text-sm">
                  {song.primaryGenreName} | &nbsp;
                  {new Date(song.releaseDate).getFullYear()}
                </p>
                <a
                  href={song.trackViewUrl}
                  target="_blank"
                  className="text-[#ffe93d] text-sm"
                >
                  See Album
                </a>
              </div>
              <div
                onClick={() => handleSearchSongData(song)}
                className="w-16 h-16 flex md:hidden group-hover:flex bg-[#db462a] absolute bottom-2 right-2  rounded-full justify-center border-1 border-[#333] hover:border-[#ffe93d] md:opacity-75 items-center duration-800 hover:opacity-100 hover:rotate-360 "
              >
                <i className="fa-solid fa-play text-2xl "></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SearchSongPlayer selectedSongData={selectedSongData} />
    </>
  );
}
