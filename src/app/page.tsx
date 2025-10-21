import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "text-blue-500 flex items-center justify-center min-h-screen",
        true ? "font-black" : ""
      )}
    >
      <Button>Click me</Button>
    </div>
  );
}
