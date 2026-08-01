interface TreeNode {
  name: string;
  path: string;
  children: TreeNode[];
}

export default function buildTree(
  paths: string[]
): TreeNode[] {
  const root: TreeNode[] = [];

  for (const filePath of paths) {
    const parts = filePath
      .replace(/\\/g, "/")
      .split("/")
      .filter(Boolean);

    let current = root;
    let currentPath = "";

    for (const part of parts) {
      currentPath = currentPath
        ? `${currentPath}/${part}`
        : part;

      let node = current.find(
        (item) => item.name === part
      );

      if (!node) {
        node = {
          name: part,
          path: currentPath,
          children: [],
        };

        current.push(node);
      }

      current = node.children;
    }
  }

  return root;
}