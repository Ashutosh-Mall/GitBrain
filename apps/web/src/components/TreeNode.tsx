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
    <li className="relative">
      <div className="flex items-center justify-between py-1">
        <div
          className={`flex items-center gap-2 ${
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
                <FaChevronDown className="text-xs text-gray-500" />
              ) : (
                <FaChevronRight className="text-xs text-gray-500" />
              )}

              {open ? (
                <FaFolderOpen className="text-yellow-500" />
              ) : (
                <FaFolder className="text-yellow-500" />
              )}
            </>
          ) : (
            <>
              <span className="w-3" />
              <FaFile className="text-gray-500" />
            </>
          )}

          <span>{node.name}</span>
        </div>

        {!isFolder && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="h-4 w-4 cursor-pointer rounded border-gray-300"
          />
        )}
      </div>

      {isFolder && open && (
        <ul className="ml-4 border-l border-gray-300 pl-4">
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