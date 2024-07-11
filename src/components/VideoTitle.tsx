const VideoTitle = ({ title, overview }: { title: string; overview: string; }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-14 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-1xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-md w-1/3">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="font-bold bg-white text-black py-1 md:py-3 px-3 md:px-10 text-lg  rounded-lg hover:bg-opacity-80">
          {/* <span><IoMdPlay/></span> */}
          Play
        </button>
        <button className="font-bold hidden md:inline-block mx-2  bg-gray-500 text-white p-3 px-10 text-lg bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
