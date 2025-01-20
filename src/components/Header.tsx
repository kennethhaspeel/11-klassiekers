"use client";

import { useIsMobile } from "@/hooks/use-mobile";
interface Props {
  authenticated: boolean;
  rechten: string[] | undefined;
}
const Header =({ authenticated, rechten }: Props) => {
  const isMobiel = useIsMobile();
  console.log(authenticated)
  console.log(rechten)
  return (
    <>
      {isMobiel ? (
        <p>Dit is een mobiel scherm</p>
      ) : (
        <div className="py-2 px-4  bg-white/40 rounded-xl text-black dark:bg-black/40 dark:text-white rounded-b-lg">Header</div>
      )}
    </>
  );
};

export default Header;
