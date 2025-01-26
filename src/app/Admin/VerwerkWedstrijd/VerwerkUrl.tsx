"use client";
import { ExtractDataUrl } from "@/components/ExtractUrlData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const VerwerkUrl = () => {
  const [url, setUrl] = useState<string>('https://www.procyclingstats.com/race/milano-sanremo/2024/result');

  const getData =async ()=>{
    console.log(url)
    const data = await ExtractDataUrl(url)
console.log(data)
  }
  return (
    <form className="flex flex-row w-full gap-3">
      <Input
        type="text"
        name="zoekterm"
        defaultValue="https://www.procyclingstats.com/race/milano-sanremo/2024/result"
        placeholder="geen url in"
        onChange={(e) => setUrl(e.target.value)}
        className="w-full"
      />
      <Button
        type="button"
        onClick={()=>getData()}
        //disabled={isPending}
      >
        Start
      </Button>
    </form>
  );
};

export default VerwerkUrl;
