import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import glassyBg from "../assets/glassy-bg.png";

export default function HeroCard() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md mr-5 md:mr-0">
      <div className="absolute inset-0 translate-x-12 translate-y-12 rounded-[2rem] bg-white" />

      <div className="absolute inset-0 translate-x-8 translate-y-8 rounded-[2rem] bg-gray-900 shadow-xl" />

      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-white" />

      <div
        className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-xl"
        style={{
          backgroundImage: `url(${glassyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-6 left-6 right-6 flex justify-between">
          <button className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <FaGithub />
            GitHub
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <FiExternalLink />
            Open
          </button>
        </div>
      </div>
    </div>
  );
}