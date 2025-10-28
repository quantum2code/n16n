import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import Client from "./client";
import { Suspense } from "react";

const Home = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={cn("flex flex-col items-center justify-center min-h-screen")}
      >
        <Button>Click me</Button>
        <Suspense fallback={<p>....Loading</p>}>
          <Client />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Home;
