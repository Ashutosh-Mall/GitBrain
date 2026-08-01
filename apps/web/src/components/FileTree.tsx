import TreeNode from "./TreeNode";
import { type FileNode } from "../pages/sendFiles";

interface FileTreeProps {
  files: FileNode[];
  selectedFiles: string[];
  onFileSelect: (files: string[]) => void;
}

export default function FileTree({
  files = [],
  selectedFiles,
  onFileSelect,
}: FileTreeProps) {
  console.log("Rendering FileTree with files:", files);
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <ul className="space-y-1">
        {files?.map((file) => (
          <TreeNode
            key={file.path}
            node={file}
            selectedFiles={selectedFiles}
            onFileSelect={onFileSelect}
          />
        ))}
      </ul>
    </div>
  );
} 