import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-svh p-6 md:p-10">
      <div className="w-full flex flex-col max-w-sm gap-6">
        <Link
          href={"/"}
          className="flex items-center font-medium text-neutral-700 self-center gap-2"
        >
          <Image src={"/logo.svg"} alt="n16n" width={30} height={30} />
          n16n
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
