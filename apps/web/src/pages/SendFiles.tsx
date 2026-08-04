import {useState} from "react";
import axios from "axios";
import FileTree from "../components/FileTree";

export interface FileNode {
  name: string;
  path: string;
  children: FileNode[];
}

export default function SendFiles() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<FileNode[]>([]);
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoPath, setRepoPath] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!repoUrl.trim()) {
      setError("Please enter a repository URL");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/github/clone", {
        repoUrl,
      });

      setFiles(res.data.tree);
      setRepoPath(res.data.repoPath);
    } catch (err) {
      console.error(err);
      setError("Failed to load repository files");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a question");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("Please select at least one file");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const paths = selectedFiles.map((file) => {
        const cleanRepoPath = repoPath.endsWith("/")
          ? repoPath.slice(0, -1)
          : repoPath;

        const cleanFilePath = file.startsWith("/") ? file.slice(1) : file;

        return `${cleanRepoPath}/${cleanFilePath}`;
      });

      const {data} = await axios.post(
        " /api/github/response",
        {
          input,
          paths,
        },
      );

      const cleanResponse =
        typeof data?.data === "string"
          ? data.data
              .replace(/^The content of the file is:\s*/i, "")
              .replace(/\n{3,}/g, "\n\n")
              .trim()
          : "";

      setResponse(cleanResponse);
      setShowResponse(true);
    } catch (err) {
      console.error(err);
      setError("Failed to get response");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            GitHub Repository Analyzer
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Analyze repositories, inspect files, and ask AI-powered questions.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-gray-300 sm:mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {/* LEFT PANEL */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl sm:p-5">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  placeholder="https://github.com/user/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-gray-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {loading ? "Loading..." : "Load Repo"}
                </button>
              </form>
            </div>

            {files.length > 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold sm:text-xl">
                    Repository Structure
                  </h2>

                  <span className="rounded-full border border-zinc-700 bg-black px-3 py-1 text-xs text-gray-300">
                    {selectedFiles.length} selected
                  </span>
                </div>

                <div className="max-h-[400px] overflow-auto rounded-xl border border-zinc-800 bg-black p-3 sm:max-h-[500px] lg:max-h-[650px]">
                  <FileTree
                    files={files}
                    selectedFiles={selectedFiles}
                    onFileSelect={setSelectedFiles}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold sm:text-xl">
                  Selected Files
                </h2>

                <span className="rounded-full border border-zinc-700 bg-black px-3 py-1 text-xs text-gray-300">
                  {selectedFiles.length}
                </span>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-2 sm:max-h-72">
                {selectedFiles.length > 0 ? (
                  selectedFiles.map((file) => (
                    <div
                      key={file}
                      className="break-all rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-gray-300"
                    >
                      {file}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-gray-500">
                    No files selected yet
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl sm:p-5">
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                Ask a Question
              </h2>

              <form
                onSubmit={handleQuestionSubmit}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Explain the architecture, find bugs, summarize logic..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-gray-500"
                />

                <button
                  type="submit"
                  disabled={loading || selectedFiles.length === 0}
                  className="w-full rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Analyzing..." : "Ask AI"}
                </button>
              </form>
            </div>

            {showResponse && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl sm:p-5">
                <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                  AI Response
                </h2>

                <div className="max-h-[300px] overflow-auto rounded-xl border border-zinc-800 bg-black p-4 sm:max-h-[400px] lg:max-h-[500px]">
                  <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-300 sm:leading-7">
                    {response}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
