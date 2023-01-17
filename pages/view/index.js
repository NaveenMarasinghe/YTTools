import Head from "next/head";
import Image from "next/image";
import * as effectsdk from "@effectai/effect-js";
import Web3 from "web3";
import { useContext, useState } from "react";
import Link from "next/link";
import { useApp } from "../context/appContext";

const campaignToIpfs = {
  title: "TheTestCampaign",
  description: "Testing 12345",
  instructions: "Test me here",
  template:
    `<div style="text-align:center">
  <div className="content">
      <h2>Make chapters for this video 🎬</h2>
      <iframe height="200" src='` +
    "${video_url}" +
    `'></iframe>
      <div style="display:flex;justify-content:center">
          <div style="flex: 1">Start</div>
          <input style="flex: 1" type="text" id="inputStart"></input>
      </div>
      <div style="display: flex; justify-content:center">
          <div style="flex: 1">End</div>
          <input style="flex: 1 " type="text" id="inputEnd"></input>
      </div>
      <div style="display: flex; justify-content: center">
          <div style="flex: 1">Title</div>
          <input style="flex: 1" type="text" id="inputTitle"></input>
      </div>
      <div style="display:flex; justify-content: center">
          <button onclick="addChapter();">Add</button>
      </div>
      <h4>Chapter List</h4>
      <div style="
        display: flex;
        align-items:center;
        flex-direction:column;" id="chapterList">
      </div>
      <script>
          function addChapter() {
              let titleText = document.getElementById("inputTitle").value;
              let startText = document.getElementById("inputStart").value;
              let endText = document.getElementById("inputEnd").value;
              let newChapter = "<div style='display:flex; align-items:center; flex-direction:colomn'><div style='padding-right: 5px'>" + titleText + ":</div><div>" + startText + " - " + "</div> <div>" + endText + "</div></div>";
              alert(newChapter);
              document.getElementById("chapterList").insertAdjacentHTML('beforeend', newChapter);
          }
          
      </script>
  </div>
</div>`,
  image:
    "https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4",
  category: "Video Chapters",
  example_task: {
    video_url: "https://www.youtube.com/embed/xx8QEtZQieI",
  },
  tasks: [{ video_url: "https://www.youtube.com/embed/xx8QEtZQieI" }],
  version: 1,
  reward: 1,
};

export default function Home() {
  const [address, setAddress] = useState();
  const { cxtAddress, login } = useApp();
  const buttonClick = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const web3 = new Web3(ethereum);
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const client = new effectsdk.EffectClient("jungle");
          const effectAccount = await client.connectAccount(web3);
          login(effectAccount.accountName);
          console.log(effectAccount);
          return web3;
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onCreate = async () => {
    const client = new effectsdk.EffectClient("jungle");
    const account = effectsdk.createAccount("");
    console.log(account);
    const web3 = effectsdk.createWallet(account);
    const effectAccount = await client.connectAccount(web3);
    console.log(effectAccount);
    //const uploadData = getUploadData();
    // console.log(uploadCampaignIpfs);
    //const campaign = await client.force.getMyLastCampaign();
    const makeCampaign = await client.force.makeCampaign(campaignToIpfs, "1");
    console.log(makeCampaign);
  };

  const onCreateWithMetamask = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const web3 = new Web3(ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const client = new effectsdk.EffectClient("jungle");
        const effectAccount = await client.connectAccount(web3);
        login(effectAccount.accountName);
        console.log(effectAccount);
        const makeCampaign = await client.force.makeCampaign(
          campaignToIpfs,
          "1"
        );
        console.log(makeCampaign);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Head>
        <title>YouTube Tools</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar bg-base-100 fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link href={"/"} legacyBehavior>
            <a className="btn btn-ghost normal-case text-xl">YouTube Tools</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Crowdsource your YouTube tasks
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {!cxtAddress && (
              <button className="btn btn-primary" onClick={() => buttonClick()}>
                Sign in
              </button>
            )}
            {cxtAddress && (
              <button
                className="btn btn-primary"
                onClick={() => onCreateWithMetamask()}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}