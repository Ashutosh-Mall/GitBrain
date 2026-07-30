import {ChatGroq} from "@langchain/groq";
import {ToolNode} from "@langchain/langgraph/prebuilt";
import {StateGraph, MessagesAnnotation} from "@langchain/langgraph";
import {getData, getReleventPaths} from "./aitools.js";
import dotenv from "dotenv";
dotenv.config();

const tools = [getData, getReleventPaths];
const toolNode = new ToolNode(tools);
const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.2,
  maxTokens: 5000,
}).bindTools(tools);

async function callModel(state: any) {
  const response = await llm.invoke(state.messages);
  return {
    messages: [response],
  };
}

function shouldContinue(state: any) {
  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage.tool_calls?.length) {
    return "tools";
  }

  return "__end__";
}

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent")
  .compile();

export const response = async ({
  paths,
  input,
}: {
  paths: string[];
  input: string;
}) => {
  const result = await graph.invoke({
    messages: [
      {
        role: "system",
        content: `
You are a codebase assistant.

Available filePaths:
${paths.join("\n")}

Tools:
- getRelevantPaths
- getData

Rules:
- For repository questions, use getRelevantPaths first, then getData.
- Use tools only when needed.
- Every tool call must include:
  - input: original user request
  - filePaths: array of paths
- Never use "path".
- Fetch only the minimum required files.
- If the user mentions a specific file, prefer analyzing only that file.
- Stop using tools when enough information is available.
- Answer only from retrieved content.
- Do not invent files or details.
- If information is missing, say so.
- For non-repository questions, answer directly.
- Always return a plain text string.
- Use "\n" for line breaks and "\n\n" between sections.
- Do not return JSON, Markdown, HTML, or code blocks unless explicitly requested.
`
.trim()
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  return result;
};
