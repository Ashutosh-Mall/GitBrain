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
        content:
          `You are a codebase assistant. Available filePaths: ${paths.join("\n")} Tools: * getRelevantPath * getData
        Rules: * For repository/codebase questions, use getRelevantPaths first only when the relevant file is not obvious. * If the user mentions a specific file, analyze only that file whenever possible. * Call getData only for the minimum number of files required. * If a single file is sufficient, make only one tool call. * Do not fetch imported files unless the user's question explicitly requires their contents.* Stop calling tools immediately once enough information is available.* Every tool call must include: * input: original user request * filePaths: array of paths* Never use "path"; always use "filePaths".* Prefer precision over completeness.* Retrieve the smallest amount of content needed to answer.* Answer strictly and only from retrieved content.* Do not infer, assume, or invent files, code, behavior, or architecture.* If the required information is unavailable, say so.* For non-codebase questions, answer directly without tools.* Return only a plain text string.* Never return JSON, Markdown, HTML, XML, code fences, explanations, reasoning, metadata, or structured objects unless explicitly requested.* Keep answers concise, accurate, and focused on the user's question.* Avoid unnecessary context, summaries, or repetition. * Use "\n" for line breaks and "\n\n" between sections when needed. * Minimize token usage while preserving correctness.`.trim(),
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  const content =
  result.messages[result.messages.length - 1].content;

  return content;
};
