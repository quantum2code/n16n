import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";
import React from "react";

const Page = async () => {
  await requireUnAuth();
  return (
    <div className="flex flex-col items-center">
      <RegisterForm />
    </div>
  );
};

export default Page;
