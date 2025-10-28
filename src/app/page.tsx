import { cn } from "@/lib/utils";
import { caller } from "@/trpc/server";
import LogOut from "./logout";
import { requireAuth } from "@/lib/auth-utils";

const Home = async () => {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen")}
    >
      <p className="">{JSON.stringify(data, null, 2)}</p>
      <LogOut />
    </div>
  );
};

export default Home;
