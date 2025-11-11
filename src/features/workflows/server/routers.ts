import { PAGINATION } from "@/config/constants";
import { db } from "@/lib/db";
import { workflow } from "@/schema/schema";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { and, eq, like } from "drizzle-orm";
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
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE_NUMBER),
        pageSize: z
          .number()
          .max(PAGINATION.MAX_PAGE_SIZE)
          .min(PAGINATION.MIN_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const [items, totalItems] = await Promise.all([
        db.query.workflow.findMany({
          where: (workflow, { eq, and, like }) =>
            and(
              eq(workflow.userId, ctx.auth.user.id),
              search ? like(workflow.name, `%${search}%`) : undefined
            ),
          limit: pageSize,
          offset: (page - 1) * pageSize,
        }),
        db.$count(
          workflow,
          and(
            eq(workflow.userId, ctx.auth.user.id),
            search ? like(workflow.name, `%${search}%`) : undefined
          )
        ),
      ]);

      const totalPages = Math.ceil(totalItems / pageSize);
      return {
        items,
        totalItems,
        totalPages,
        page,
      };
    }),
});
