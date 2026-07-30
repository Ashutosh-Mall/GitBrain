import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-2",
});

export const getDocs = async ({ files, repoId }: { files: string[]; repoId: string }) => {
  try {
    const docs: Document[] = [];

    for (const file of files) {
      const content = await fs.readFile(file, "utf-8");

      docs.push(
        new Document({
          pageContent: content,
          metadata: {
            path: file,
            repoId,
          },
        })
      );
    }

    return docs;
  } catch (error) {
    console.error("Error occurred while generating documents:", error);
    return [];
  }
};

export const createVectorStore = async () => {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      collectionName: "github-repo-embeddings",
      url:`${process.env.QDRANT_URL}`,
      apiKey: `${process.env.QDRANT_API_KEY}`,
    });
    return vectorStore;
  } catch (error) {
    console.error("Error occurred while creating vector store:", error);
    return null;
  }
};
