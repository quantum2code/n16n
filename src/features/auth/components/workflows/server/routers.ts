import { db } from "@/lib/db";
import { workflow } from "@/schema/schema";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { eq } from "drizzle-orm";
import { generateSlug } from "random-word-slugs";
import z from "zod";

export const workflowRouter = createTRPCRouter({
  create: premiumProcedure.mutation(({ ctx }) => {
    return db
      .insert(workflow)
      .values({
        name: generateSlug(),
        userId: ctx.auth.user.id,
      })
      .returning({
        id: workflow.id,
        name: workflow.name,
      });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return db
        .delete(workflow)
        .where(
          eq(workflow.id, input.id) && eq(workflow.userId, ctx.auth.user.id)
        );
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return db
        .update(workflow)
        .set({ name: input.name })
        .where(
          eq(workflow.userId, ctx.auth.user.id) && eq(workflow.id, input.id)
        );
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return db.query.workflow.findFirst({
        where: (workflow, { eq }) =>
          eq(workflow.id, input.id) && eq(workflow.userId, ctx.auth.user.id),
      });
    }),
  getMany: protectedProcedure.query(({ ctx }) => {
    return db.query.workflow.findMany({
      where: (workflow, { eq }) => eq(workflow.userId, ctx.auth.user.id),
    });
  }),
});
