import { db } from "@/lib/db";
import { inngest } from "./client";
import { workflow } from "@/schema/schema";

export const demoWorkflow = inngest.createFunction(
  { id: "demo" },
  { event: "test/demo" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");
    await step.sleep("wait-a-moment", "5s");
    await step.sleep("wait-a-moment", "5s");
    await step.run("save-to-db", () =>
      db.insert(workflow).values({ name: "workflow-inngest-demo" })
    );
    return { success: true };
  }
);
