import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaFile,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";
import { type FileNode } from "../pages/SendFiles";

interface TreeNodeProps {
  node: FileNode;
  selectedFiles: string[];
  onFileSelect: (files: string[]) => void;
}

export default function TreeNode({
  node,
  selectedFiles,
  onFileSelect,
}: TreeNodeProps) {
  const [open, setOpen] = useState(true);

  const children = Array.isArray(node.children)
    ? node.children
    : [];

  const isFolder = children.length > 0;

  const isSelected = selectedFiles.includes(node.path);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      onFileSelect([...selectedFiles, node.path]);
    } else {
      onFileSelect(
        selectedFiles.filter(
          (path) => path !== node.path
        )
      );
    }
  };

  return (
    <li className="relative min-w-max">
      <div
        className={`group flex items-center justify-between gap-2 rounded-md px-2 py-1 transition-colors ${
          isSelected
            ? "bg-zinc-800/70"
            : "hover:bg-zinc-900"
        }`}
      >
        <div
          className={`flex min-w-0 flex-1 items-center gap-2 ${
            isFolder ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            if (isFolder) {
              setOpen(!open);
            }
          }}
        >
          {isFolder ? (
            <>
              {open ? (
                <FaChevronDown className="shrink-0 text-xs text-zinc-500" />
              ) : (
                <FaChevronRight className="shrink-0 text-xs text-zinc-500" />
              )}

              {open ? (
                <FaFolderOpen className="shrink-0 text-zinc-300" />
              ) : (
                <FaFolder className="shrink-0 text-zinc-400" />
              )}
            </>
          ) : (
            <>
              <span className="w-3 shrink-0" />
              <FaFile className="shrink-0 text-zinc-500" />
            </>
          )}

          <span
            className="truncate text-xs text-zinc-200 sm:text-sm"
            title={node.name}
          >
            {node.name}
          </span>
        </div>

        {!isFolder && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="
              h-4 w-4 shrink-0 cursor-pointer
              rounded border-zinc-600
              bg-black text-white
              focus:outline-none focus:ring-0
            "
          />
        )}
      </div>

      {isFolder && open && (
        <ul className="ml-2 border-l border-zinc-800 pl-2 sm:ml-4 sm:pl-4">
          {children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              selectedFiles={selectedFiles}
              onFileSelect={onFileSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}