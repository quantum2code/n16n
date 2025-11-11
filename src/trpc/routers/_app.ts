import { createTRPCRouter } from "../init";
import { workflowRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  // createWorkflow: protectedProcedure.mutation(async () => {
  //   await inngest.send({
  //     name: "test/demo",
  //   });
  //   return { success: true };
  // }),
  // getWorkflow: protectedProcedure.query(() => db.query.workflow.findMany()),
  // testAI: protectedProcedure.mutation(async () => {
  //   await inngest.send({
  //     name: "groq/text",
  //   });
  //   return { success: true };
  // }),
  workflows: workflowRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
