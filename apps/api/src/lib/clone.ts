import {simpleGit} from "simple-git";
const git = simpleGit();

export async function cloneRepo(
  repoUrl: string,
  repoPath: string,
): Promise<void> {
  await git.clone(repoUrl, repoPath);
}


