import { Button } from "@/components/ui/button";
import { usersTable } from "@/db/schema";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

const Home = async () => {
  const users = await db.select().from(usersTable);
  return (
    <div
      className={cn(
        "text-blue-500 flex items-center justify-center min-h-screen",
        true ? "font-black" : ""
      )}
    >
      <Button>Click me</Button>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

export default Home;
