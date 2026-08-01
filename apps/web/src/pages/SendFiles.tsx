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

      const res = await axios.post("http://localhost:5000/github/clone", {
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

      console.log("Selected file paths for question:", paths);
      console.log("User question:", input);

      const {data} = await axios.post("http://localhost:5000/github/response", {
        input,
        paths,
      });

      const cleanResponse =
        typeof data?.data === "string"
          ? data.data
              .replace(/^The content of the file is:\s*/i, "")
              .replace(/\n{3,}/g, "\n\n")
              .trim()
          : "";

      setResponse(
        cleanResponse
      );
      setShowResponse(true);
    } catch (err) {
      console.error(err);
      setError("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-semibold">
          GitHub Repository Analyzer
        </h1>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-4">
            <div className="rounded border bg-white p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter repository URL"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="flex-1 rounded border px-3 py-2 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load Repo"}
                </button>
              </form>
            </div>

            {files.length > 0 && (
              <div className="rounded border bg-white p-4">
                <h2 className="mb-4 text-lg font-medium">
                  Repository Structure
                </h2>

                <FileTree
                  files={files}
                  selectedFiles={selectedFiles}
                  onFileSelect={setSelectedFiles}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 space-y-4">
            <div className="rounded border bg-white p-4">
              <h2 className="mb-3 text-lg font-medium">
                Selected Files ({selectedFiles.length})
              </h2>

              <ul className="max-h-64 overflow-y-auto space-y-1 text-sm">
                {selectedFiles.map((file) => (
                  <li
                    key={file}
                    className="rounded border bg-gray-50 px-2 py-1"
                  >
                    {file}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded border bg-white p-4">
              <h2 className="mb-3 text-lg font-medium">Ask Question</h2>

              <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask something about selected files..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded border px-3 py-2 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading || selectedFiles.length === 0}
                  className="rounded bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Asking..." : "Ask"}
                </button>
              </form>
            </div>

            {showResponse && (
              <div className="rounded border bg-white p-4">
                <h2 className="mb-3 text-lg font-medium">Response</h2>

                <pre className="whitespace-pre-wrap rounded border bg-gray-50 p-3 text-sm">
                  {response}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
