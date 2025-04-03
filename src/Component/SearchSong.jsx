import { useState } from "react";

export default function SearchSong({ fetchSongData }) {
  const [search, setSearch] = useState("");
  
  const searchApi = async () => {
    try {
      let query = search;
      console.log(query);
      let URL = "https://itunes.apple.com/search";
      const response = await fetch(`${URL}?term=${query}&media=music&limit=10`);
      let Info = await response.json();
      return Info;
    } catch (err) {
      console.error("error while fetching", err);
    }
  };

  const handleSearch = (evt) => {
    setSearch(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setSearch("");
      let songData = await searchApi();
      fetchSongData(songData);
    } catch (err) {
      console.error("Error while fetching", err);
    }
  };

  return (
    <div className="w-full ">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="w-full outline-none"
          type="text"
          placeholder="Search Song, Artist, Album etc"
          value={search}
          onChange={handleSearch}
        />
        <button type="Submit" className="hidden"></button>
      </form>
    </div>
  );
}
