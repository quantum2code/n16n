import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { user } from "@/schema/auth-schema";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getUsers: protectedProcedure.query(({ ctx }) =>
    db.query.user.findMany({
      where: eq(user.id, ctx.auth.session.userId),
    })
  ),
});
// export type definition of API
export type AppRouter = typeof appRouter;
