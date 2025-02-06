"use client";
import { Button } from "../ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  isAdmin: boolean;
}
const AuthMenu = ({ isAdmin }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block">
        <div className="py-2 px-4  bg-white/80 text-black dark:bg-black/40 dark:text-white">
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

              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="default"
                  aria-label="wedstrijden"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href="/Deelnemer/WedstrijdenOverzicht"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="wedstrijdenOverzicht"
                  >
                    Wedstrijden
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  aria-label="home"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href="/Deelnemer/Selectie"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="Mijn Ploeg"
                  >
                    Mijn Ploeg
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  aria-label="tussenstand"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href="/Deelnemer/Tussenstand"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="tussenstand"
                  >
                    Tussenstand
                  </Link>
                </Button>
              </div>
            
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <div className="flex ">
                    <Button
                      variant="ghost"
                      size="default"
                      aria-label="home"
                      className="rounded-full"
                      asChild
                    >
                      <Link
                        href="/Admin/WedstrijdenOverzicht"
                        className="flex justify-center items-center gap-2 ml-0"
                        title="Uitslag Verwerken"
                      >
                        Uitslag verwerken
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="default"
                      aria-label="deelnemers"
                      className="rounded-full"
                      asChild
                    >
                      <Link
                        href="/Admin/deelnemers"
                        className="flex justify-center items-center gap-2 ml-0"
                        title="Deelnemers"
                      >
                        Deelnemers
                      </Link>
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="default"
                  aria-label="LogOut"
                  title="LogOut"
                  className="rounded-full"
                  asChild
                >
                  <LogoutLink>
                    <LogOut />
                    Log uit
                  </LogoutLink>
                </Button>
              </div>
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
                <Button
                  className="w-full py-2 mt-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link
                    href="/Deelnemer/wedstrijdenOverzicht"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="wedstrijdenOverzicht"
                  >
                    Wedstrijden
                  </Link>
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                  }}
                  asChild
                >
                  <Link
                    href="/Deelnemer/Selectie"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="Mijn Ploeg"
                  >
                    Mijn Ploeg
                  </Link>
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                  }}
                  asChild
                >
                  <Link
                    href="/Deelnemer/Tussenstand"
                    className="flex justify-center items-center gap-2 ml-0"
                    title="tussenstand"
                  >
                    Tussenstand
                  </Link>
                </Button>
                {isAdmin ? (
                  <>
                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        setOpen(false);
                      }}
                      asChild
                    >
                      <Link
                        href="/Admin/WedstrijdenOverzicht"
                        className="flex justify-center items-center gap-2 ml-0"
                        title="Uitslag Ingeven"
                      >
                        Uitslag Ingeven
                      </Link>
                    </Button>
                  </>
                ) : (
                  ""
                )}

                <Button
                  className="w-full mt-3"
                  onClick={() => {
                    setOpen(false);
                  }}
                  asChild
                >
                  <LogoutLink>
                    <LogOut />
                    Log uit
                  </LogoutLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default AuthMenu;
