"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useSubscription } from "@clerk/nextjs/experimental";

export default function Home() {
  const { user } = useUser();
  const { data } = useSubscription();
  console.log(data?.id);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/logo.png" alt="Logo" width={300} height={300} />
      {user ? (
        <>
          <p>Hello {user?.firstName || "User"}</p>
          <Button
            variant="contained"
            color="primary"
            href="/script-generator"
            sx={{ mt: 2, backgroundColor: "rgb(100,126,220)", color: "#fff" }}
          >
            Get Started
          </Button>
        </>
      ) : (
        <SignInButton>
          <button className="bg-[rgb(100,126,220)] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
}
