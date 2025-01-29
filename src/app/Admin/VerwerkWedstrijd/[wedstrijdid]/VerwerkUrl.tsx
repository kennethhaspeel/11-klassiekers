"use client";
import { ExtractDataUrl } from "@/components/ExtractUrlData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { startTransition, useActionState, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { PostUitslagWedstrijdAction } from "../../../../../prisma/actions/UitslagActions";

interface uitslagInterface {
  positie: number;
  naam: string;
}
interface Params {
  wedstrijdid: number;
}
const VerwerkUrl = ({ wedstrijdid }: Params) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(
    "https://www.procyclingstats.com/race/omloop-het-nieuwsblad/2024/result"
  );
  const [uitslag, setUitslag] = useState<uitslagInterface[] | null>();
  const [error, action,  isPending] = useActionState(
    PostUitslagWedstrijdAction,
    null
  );
  const getData = async () => {
    setLoading(true);
    setUitslag(null);

    const data: uitslagInterface[] = await ExtractDataUrl(url);
    setUitslag(data);
    setLoading(false);
  };

  const saveData = async () => {
    console.log(uitslag);
    const formData = new FormData();
    formData.append("wedstrijdid", wedstrijdid.toString());
    formData.append("uitslag", JSON.stringify(uitslag));
    startTransition(()=>{action(formData)});
    setUitslag(null)
  };
  return (
    <>
      {error ? <p>{error}</p> : <p></p>}
      <div className="flex flex-col w-full">
      {isPending ? <p>bezig</p> : <p>niet bezig</p>}
        <div>
          <form className="flex flex-row w-full gap-3">
            <Input
              type="text"
              name="zoekterm"
              defaultValue="https://www.procyclingstats.com/race/omloop-het-nieuwsblad/2024/result"
              placeholder="geen url ingegeven"
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
        {uitslag == null && loading ? (
          <div className="grid grid-col-1 text-2xl justify-items-center w-full gap-4">
            <Loader2 className="animate-spin text-red-600" size={40} />
            <Loader2 className="animate-spin text-green-600" size={40} />
            <Loader2 className="animate-spin text-cyan-600" size={40} />
          </div>
        ) : (
          ""
        )}
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
              {
                isPending ? (
                  <Button disabled>
                  <Loader2 className="animate-spin" />
                  Bewaren
                </Button>
                ) : (
                  <Button type="button" onClick={saveData}>
                  Bewaar
                </Button>
                )
              }

            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default VerwerkUrl;
