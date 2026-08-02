import HeroCard from "../components/HeroCard";
import { FiArrowRight } from "react-icons/fi";
import FolderCard from "../components/FolderCard";

export default function Home() {
  return (
    <section className="min-h-screen bg-white bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-[size:18px_18px]">
      {/* <div className="mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center gap-12 px-6 py-12 sm:px-8 md:flex-row md:gap-16 lg:px-12">
        <div className="flex w-full flex-1 flex-col justify-center">
          <span className="mb-5 w-fit rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
            Built for Developers
          </span>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Spend less time
            <span className="block">
              searching through code.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Navigate projects faster, discover architecture patterns,
            inspect repositories, and collaborate more effectively with
            tools designed around real development workflows.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:-translate-y-1">
              Get Started
              <FiArrowRight />
            </button>

            <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100">
              Documentation
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                100%
              </h3>
              <p className="text-sm text-gray-600">
                Open Source
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Fast
              </h3>
              <p className="text-sm text-gray-600">
                Repository Analysis
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Modern
              </h3>
              <p className="text-sm text-gray-600">
                Developer Experience
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-1 items-center justify-center">
          <HeroCard />
        </div>
      </div> */}
      <FolderCard/>
    </section>
  );
}