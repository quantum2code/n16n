import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/demo",
    });
    return { success: true };
  }),
  getWorkflow: protectedProcedure.query(() => db.query.workflow.findMany()),
});
// export type definition of API
export type AppRouter = typeof appRouter;
