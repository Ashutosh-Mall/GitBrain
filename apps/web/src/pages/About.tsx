export default function About() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-600">
          About GitBrain
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Understand Any GitHub Repository Faster
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          <strong>GitBrain</strong> is an AI-powered codebase assistant built
          with <strong>React</strong> and <strong>Express</strong>. Simply
          provide a GitHub repository, and GitBrain helps you explore the
          project structure, understand the codebase, and quickly find relevant
          files without manually digging through hundreds of folders.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/Ashutosh-Mall/GitBrain.git"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-black px-6 py-3 text-white font-medium transition hover:bg-gray-800"
          >
            View Repository
          </a>

          <a
            href="/"
            className="rounded-lg border border-black px-6 py-3 font-medium transition hover:bg-black hover:text-white"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-16 grid gap-6 border-t border-gray-200 pt-10 sm:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">⚡ Fast</h3>
            <p className="mt-2 text-gray-600">
              Navigate large repositories without wasting time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🧠 AI Powered</h3>
            <p className="mt-2 text-gray-600">
              Ask questions about the codebase and receive contextual answers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">💻 Developer Friendly</h3>
            <p className="mt-2 text-gray-600">
              Built with React, Express, and modern web technologies for a
              smooth developer experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}