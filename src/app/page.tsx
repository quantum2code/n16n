"use client";
import { cn } from "@/lib/utils";
import LogOut from "./logout";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

const Home = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflow.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries(trpc.createWorkflow.mutationOptions()),
    })
  );
  return (
    <div
      className={cn(
        "flex flex-col gap-3 items-center justify-center min-h-screen"
      )}
    >
      <p className="">{JSON.stringify(data, null, 2)}</p>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogOut />
    </div>
  );
};

export default Home;
