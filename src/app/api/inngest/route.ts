import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { groqText } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [groqText],
});
