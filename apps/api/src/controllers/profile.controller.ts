import { Request, Response } from "express";
import axios from "axios";
import { prisma } from "../lib/prisma.js";

interface GithubProfileResponse {
  avatar_url: string;
  public_repos: number;
  repos_url: string;
}

interface GithubRepositoryResponse {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  private: boolean;
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user || !user.profile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { data: githubProfile } =
      await axios.get<GithubProfileResponse>(
        `https://api.github.com/users/${user.githubUsername}`
      );

    const { data: repositories } =
      await axios.get<GithubRepositoryResponse[]>(
        githubProfile.repos_url
      );

    await prisma.profile.update({
      where: {
        id: user.profile.id,
      },
      data: {
        avatarUrl: githubProfile.avatar_url,
        totalReps: githubProfile.public_repos,
      },
    });

    await prisma.repository.deleteMany({
      where: {
        profileId: user.profile.id,
      },
    });

    for (const repo of repositories) {
      await prisma.repository.create({
        data: {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics,
          isPrivate: repo.private,
          profileId: user.profile.id,
        },
      });
    }

    const updatedProfile = await prisma.profile.findUnique({
      where: {
        id: user.profile.id,
      },
      include: {
        repositories: {
          orderBy: {
            stars: "desc",
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};