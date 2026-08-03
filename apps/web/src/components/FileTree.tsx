import TreeNode from "./TreeNode";
import { type FileNode } from "../pages/SendFiles";

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
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-black p-2 sm:p-4">
      <div className="min-w-max">
        <ul className="space-y-1 text-sm sm:text-base">
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
    </div>
  );
}