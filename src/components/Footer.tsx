"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Footer() {
  return (
    <>
      <div className="flex sticky bottom-0">
        <div className="py-1 px-4  bg-white/80 text-black dark:bg-black/40 dark:text-white rounded-t-lg  w-full lg:max-w-7xl mx-auto">
          <div className="flex flex-row justify-between">
            <div className="align-middle">
              &copy; Kenneth Haspeel
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
