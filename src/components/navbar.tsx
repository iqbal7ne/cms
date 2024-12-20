"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function Navbar() {
  const Status = () => {
    const [active, setActive] = useState<string>("b1");
  };
  return (
    <div className="navbar bg-slate-400 fixed z-10 text-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/category"}>Categories</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Article</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Homepage</Link>
          </li>
          <li>
            <Link href={"/category"}>Categories</Link>
          </li>
          <li>
            <Link href={"/About"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="join">
          <input
            className="input input-bordered join-item bg-white border-none"
            placeholder="Search"
          />
          <button className="btn join-item rounded-r-lg bg-white border-none">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
