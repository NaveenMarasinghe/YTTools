import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "../../context/appContext";

export default function Create() {
  const { cxtAddress, login } = useApp();
  const [youtubeUrl, setYoutubeUrl] = useState();

  const onYouTubeUrlChange = (url) => {
    let text = url.substr(32, 11);
    setYoutubeUrl(text);
  };

  return (
    <div>
      <div className="navbar bg-base-100 fixed">
        <div className="navbar-start">
          <Link href={"/"} legacyBehavior>
            <a className="btn btn-ghost normal-case text-xl">YouTube Tools</a>
          </Link>
        </div>

        <div className="navbar-end">
          {cxtAddress ? (
            <Link href={"/create"} legacyBehavior>
              <a className="btn">{cxtAddress}</a>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex mt-16 min-h-full min-w-full">
          <ul className="menu bg-base-100 w-56 p-2">
            <li>
              <a>Create</a>
            </li>
            <li>
              <a>View</a>
            </li>
          </ul>
          <div className="bg-violet-700 w-full rounded-md m-4 flex-col">
            <div className="text-center text-black text-3xl my-2 font-bold">
              Create New Task
            </div>
            <div className="flex justify-center my-2">
              {youtubeUrl && (
                <iframe
                  width="560"
                  height="315"
                  src={"https://www.youtube.com/embed/" + youtubeUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
              {!youtubeUrl && (
                <div style={{ width: "560px", height: "315px" }}>
                  <img src="https://i.imgur.com/06CGCNl.jpeg"></img>
                </div>
              )}
            </div>
            <div className="text-center text-black font-medium">
              Add YouTube URL below
            </div>
            <div className="text-center my-2">
              <input
                type="text"
                placeholder="Youtube URL"
                className="input w-full max-w-xs"
                onChange={(e) => {
                  onYouTubeUrlChange(e.target.value);
                }}
              />
            </div>
            <div className="text-center my-2">
              <button className="btn btn-primary" onClick={() => buttonClick()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
