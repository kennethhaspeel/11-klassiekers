"use client";
import { ExtractDataUrl } from "@/components/ExtractUrlData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface uitslagInterface {
  positie: number;
  naam: string;
}
const VerwerkUrl = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [uitslag, setUitslag] = useState<uitslagInterface[] | null>();

  const getData = async () => {
    const data: uitslagInterface[] = await ExtractDataUrl(url);
    setUitslag(data);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <form className="flex flex-row w-full gap-3">
            <Input
              type="text"
              name="zoekterm"
              placeholder="geen url in"
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              onClick={() => getData()}
              //disabled={isPending}
            >
              Start
            </Button>
          </form>
        </div>
        <div className="w-full">
          <h2 className="text-2xl mt-4 border-t-2 border-t-gray-400 w-full py-3">
            Overzicht
          </h2>
        </div>
        <div className="w-full">
          {uitslag ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Positie</TableHead>
                    <TableHead>Naam</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uitslag.map((rij) => (
                    <TableRow key={rij.positie}>
                      <TableCell>{rij.positie}</TableCell>
                      <TableCell>{rij.naam}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button">Bewaar</Button>
            </>
          ) : (
            "Nog geen data"
          )}
        </div>
      </div>
    </>
  );
};

export default VerwerkUrl;
