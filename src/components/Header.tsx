"use client";

import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobiel = useIsMobile();
  return (
    <>
      {isMobiel ? (
        <p>Dit is een mobiel scherm</p>
      ) : (
        <div className="py-2 px-4 bg-white/40 dark:bg-black/40 rounded-b-lg">Header</div>
      )}
    </>
  );
};

export default Header;
