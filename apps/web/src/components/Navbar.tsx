import { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaGithub,
  FaCompass,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", icon: <FaHome />, href: "#" },
    { name: "About", icon: <FaInfoCircle />, href: "#about" },
    { name: "Explore", icon: <FaCompass />, href: "/explore" },
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com/Ashutosh-Mall/GitBrain" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-lg bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight"
        >
          Git
          <span className="text-gray-400">Brain</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                group flex items-center gap-2
                text-gray-600 font-medium
                hover:text-gray-900
                transition-all duration-300
              "
            >
              <span className="group-hover:scale-110 transition">
                {link.icon}
              </span>
              {link.name}
            </a>
          ))}
        </div>


        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`
          md:hidden absolute top-full left-0 w-full
          bg-white shadow-xl border-t
          transition-all duration-300
          ${open ? "block" : "hidden"}
        `}
      >
        <div className="flex flex-col p-6 gap-6">

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                text-gray-700
                hover:text-gray-900
                font-medium
              "
            >
              {link.icon}
              {link.name}
            </a>
          ))}

        </div>
      </div>
    </nav>
  );
}