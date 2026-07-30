import {tool} from "@langchain/core/tools";
import {createVectorStore} from "../lib/embedding.js";
import {ChatGroq} from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

export const llmTool = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.2,
  maxTokens: 1000,
});

export const getData = tool(
  async ({filePaths, input}: {filePaths: string[]; input: string}) => {
    try {
      console.log(filePaths, input);

      if (!input?.trim() || !filePaths?.length) {
        return {
          retrievedDocs: "",
        };
      }

      const vectorStore = await createVectorStore();

      const results = await vectorStore?.similaritySearch(input, 5, {
        must: [
          {
            key: "metadata.path",
            match: {
              any: filePaths,
            },
          },
        ],
      });

      return {
        retrievedDocs:
          results?.map((doc) => doc.pageContent).join("\n\n") ?? "",
      };
    } catch (error) {
      console.log(error);
      return {
        retrievedDocs: "",
      };
    }
  },
  {
    name: "getData",
    description:
      "Retrieve code content from selected filePaths. Always provide the original user request as input and never call this tool with empty input.",
    schema: {
      type: "object",
      properties: {
        input: {
          type: "string",
        },
        filePaths: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["input", "filePaths"],
    },
  },
);

export const getReleventPaths = tool(
  async ({input, filePaths}: {input: string; filePaths: string[]}) => {
    const response = await llmTool.invoke([
      {
        role: "system",
        content: `Return ONLY valid JSON. Rules:
- Select the most relevant file paths from the provided Available Paths.
- Return only paths that exist in Available Paths.
- Do not create or modify paths.
- If one file is enough, return one path.
- If multiple files are required for understanding the request, return multiple paths.
- Do not explain anything. 
Format:
{
  "selectedPaths": [
    "C:\\\\repo\\\\file.ts"
  ]
}
`.trim(),
      },
      {
        role: "user",
        content: `User Request: ${input} Available Paths: ${JSON.stringify(filePaths, null, 2)} Choose the single most relevant file.`.trim(),
      },
    ]);

    return response.content;
  },
  {
    name: "getRelevantPaths",
    description:
      "Select exactly one most relevant file path from available filePaths for the user's request.",
    schema: {
      type: "object",
      properties: {
        input: {
          type: "string",
          description: "User request or question.",
        },
        filePaths: {
          type: "array",
          description: "Available file paths. Choose only one.",
          items: {
            type: "string",
          },
        },
      },
      required: ["input", "filePaths"],
    },
  },
);
