import { db } from "@/lib/db";
import { inngest } from "./client";
import { workflow } from "@/schema/schema";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export const groqText = inngest.createFunction(
  { id: "groq-ai" },
  { event: "groq/text" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");
    const { steps } = await step.ai.wrap("gro-generate-text", generateText, {
      prompt: "How many rs are in the word strawberry?",
      providerOptions: {
        groq: {
          reasoningFormat: "parsed",
          reasoningEffort: "default",
          parallelToolCalls: true,
        },
      },
      model: groq("qwen/qwen3-32b"),
    });
    await step.run("save-to-db", () =>
      db.insert(workflow).values({
        name: `workflow-demo-${Date.now()}`,
        content: steps[0].response.messages,
      })
    );
    return { success: true, message: steps };
  }
);
