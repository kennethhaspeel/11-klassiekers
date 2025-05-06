"use client";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogIn, MenuIcon, UserPen } from "lucide-react";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const AnonMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block">
        <div className="py-2 px-4  bg-white/80 rounded-xl text-black dark:bg-black/40 dark:text-white rounded-b-lg flex flex-row">
          <div className="flex h-8 items-center justify-between w-full">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="default"
                aria-label="home"
                className="rounded-full"
                asChild
              >
                <Link
                  href="/"
                  className="flex justify-center items-center gap-2 ml-0"
                  title="Home"
                >
                  <h2> 11 Klassiekers</h2>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="default"
                aria-label="reglement"
                className="rounded-full"
                asChild
              >
                <Link
                  href="/Reglement"
                  className="flex justify-center items-center gap-2 ml-0"
                  title="Home"
                >
                  Reglement
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button variant="ghost" size="default" aria-label="log in" asChild>
              <LoginLink>
                <LogIn />
                Log In
              </LoginLink>
            </Button>

            {/* <Button asChild variant="ghost" size="default">
              <Link href="/Registratie">
                <UserPen />
                Registreer
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="py-2 px-4  bg-white/80 text-black dark:bg-black/40 dark:text-white flex flex-row justify-between">
        <div className="flex items-center">
              <Button
                variant="ghost"
                size="default"
                aria-label="home"
                className="rounded-full"
                asChild
              >
                <Link
                  href="/"
                  className="flex justify-center items-center gap-2 ml-0"
                  title="Home"
                >
                  <h2> 11 Klassiekers</h2>
                </Link>
              </Button>
            </div>
         
          <Sheet open={open} onOpenChange={setOpen}>
            {/* This button will trigger open the mobile sheet menu */}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <VisuallyHidden>
                <SheetDescription>Menu</SheetDescription>
              </VisuallyHidden>

              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col items-start gap-4 pt-4 divide-y-4 divide-white-800">
                <Button
                  key="home"
                  className="w-full py-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link
                    href="/"
                    className="flex justify-center items-center"
                    title="Home"
                  >
                    Home
                  </Link>
                </Button>
                <Button
                  className="w-full py-2 mt-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link
                    href="/Reglement"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="Reglement"
                  >
                    Reglement
                  </Link>
                </Button>
                <Button className="w-full py-2" asChild>
                  <LoginLink>
                    <LogIn />
                    Log In
                  </LoginLink>
                </Button>
                {/* <Button asChild className="w-full py-2">
                  <RegisterLink>
                    <UserPen />
                    Registreer
                  </RegisterLink>
                </Button> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default AnonMenu;
