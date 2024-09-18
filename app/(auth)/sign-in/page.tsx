import SignInForm from "@/components/forms/SigninForm";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Image from "next/image";
import React from "react";

const SigninPage = () => {
  return (
    <>
      <div>
        <div className="fle-col relative flex min-h-screen items-center justify-center px-4 py-6">
          <div className="absolute right-0 top-0 p-4">
            <ThemeToggle />
          </div>
          <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
            <div className="max-w-md rounded-lg border border-gray-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <SignInForm />
            </div>
            <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
              <Image
                src="https://readymadeui.com/login-image.webp"
                alt=""
                width={500}
                height={500}
                sizes="100vw"
                priority
                className="mx-auto block h-full w-full object-cover max-md:w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
