/* eslint-disable react/prop-types */
function SongPlayer({ selectedSongData }) {
  if (!selectedSongData) return null;

  let handleClose = () => {
    document.getElementById("SearchSongPlayer").style.display = "none";
  };
  return (
    <>
      <div
        id="SearchSongPlayer"
        className=" bg-[#072833] shadow-xl rounded-sm flex flex-col w-full sm:w-1/3 flex-grow cursor-pointer duration-800 hover:bg-[#072866] border-2 border-[#222] 
             fixed sm:absolute bottom-0 left-0 group p-2"
      >
        <div className="flex  flex-row sm:flex-col lg:flex-row mb-2 ">
          <div className="basis-1/3 pr-2  flex items-center ">
            <img
              src={selectedSongData.artworkUrl100}
              alt="Song Image"
              className="  h-25 sm:h-30 w-full object-cover rounded-sm shadow-lg"
            />
          </div>
          <div className="basis-2/3 flex flex-col justify-start pr-2">
            <p className="text-lg sm:text-xl font-semibold text-[#ff951d]">
              {selectedSongData.trackName}
            </p>
            <p className="text-sm sm:text-md">
              {" "}
              By {selectedSongData.artistName}
            </p>
            <p className="text-sm ">
              <span> {selectedSongData.primaryGenreName}</span> |{" "}
              <span>
                {" "}
                {new Date(selectedSongData.releaseDate).getFullYear()}
              </span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-[#db462a] rounded-full "
          >
            <i className="fa-solid fa-xmark text-lg px-2 py-1"></i>
          </button>
        </div>
        <div className=" w-full ">
          <audio
            className="w-full h-8 sm:h-12"
            controls
            autoPlay
            onPlay={(e) => {
              document.querySelectorAll("audio").forEach((audio) => {
                if (audio !== e.target) {
                  audio.pause();
                }
              });
            }}
          >
            <source src={selectedSongData.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </>
  );
}
export default SongPlayer;
