"use client";
import { ExtractDataUrl } from "@/components/ExtractUrlData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SpinnersBlok from "@/components/spinners";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SaveUitslagWedstrijdAction } from "../../../../../prisma/actions/UitslagActions";
import { VerwerkTussenstandAction } from "../../../../../prisma/actions/TussenstandActions";

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
    "https://www.procyclingstats.com/race/omloop-het-nieuwsblad/2025/result"
  );
  const [uitslag, setUitslag] = useState<uitslagInterface[] | null>();
  const [error, setError] = useState<string | null>(null);
  const [uitslagBewaard, setUitslagBewaard] = useState<boolean>(false);
  const [uitslagVerwerkt, setUitslagVerwerkt] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const data: uitslagInterface[] = await ExtractDataUrl(url);
    setUitslag(data);
    setLoading(false);
  };

  const saveData = async () => {
    setLoading(true);
    const resultaat = await SaveUitslagWedstrijdAction({
      wedstrijdid: wedstrijdid,
      resultaat: uitslag!,
    });
    if (resultaat.error) {
      setError(resultaat.error);
    } else {
      setUitslagBewaard(true);
      const u = await VerwerkTussenstandAction(wedstrijdid);
      if (u?.success) {
        setUitslagVerwerkt(true);
      } else {
        setError(u!.message!);
      }
      console.log(u);
    }
    setLoading(false);
  };
  if (loading) {
    return <SpinnersBlok />;
  }
  if (error) {
    return (
      <div className="flex flex-col w-full">
        <Alert className="bg-red-600">
          <AlertTitle>Fout bij Bewaren</AlertTitle>
          <AlertDescription>
            Volgende fout deed zich voor: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (uitslagBewaard) {
    return (
      <div className="flex flex-col w-full">
        <div className="w-full m-4">
          <Alert className="bg-green-600">
            <AlertTitle>Alles Bewaard</AlertTitle>
            <AlertDescription>
              De uitslag voor deze wedstrijd werd bewaard
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full">
          {uitslagVerwerkt ? (
            <div className="w-full m-4">
              <Alert className="bg-green-600">
                <AlertTitle>Alles Bewaard</AlertTitle>
                <AlertDescription>De tussenstand werd bewaard</AlertDescription>
              </Alert>
            </div>
          ) : uitslagVerwerkt ? (
            <div className="w-full m-4">
              <Alert className="bg-green-600">
                <AlertTitle>Alles Bewaard</AlertTitle>
                <AlertDescription>De tussenstand werd bewaard</AlertDescription>
              </Alert>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-col">
          <div className="w-full">
            <SpinnersBlok />
          </div>
          {uitslagBewaard ? (
            <div className="w-full m-4">
              <Alert className="bg-green-600">
                <AlertTitle>Alles Bewaard</AlertTitle>
                <AlertDescription>
                  De uitslag voor deze wedstrijd werd bewaard
                </AlertDescription>
              </Alert>
            </div>
          ) : uitslagVerwerkt ? (
            <div className="w-full m-4">
              <Alert className="bg-green-600">
                <AlertTitle>Alles Bewaard</AlertTitle>
                <AlertDescription>De tussenstand werd bewaard</AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="w-full m-4">
              <Alert className="bg-orange-600">
                <AlertTitle>Verwerken</AlertTitle>
                <AlertDescription>
                  De uitslag wordt verwerkt en tussenstand wordt opgemaakt
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="w-full">
            <form className="flex flex-row w-full gap-3">
              <Input
                type="text"
                name="zoekterm"
                defaultValue="https://www.procyclingstats.com/race/omloop-het-nieuwsblad/2025/result"
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
          {uitslag == null && loading ? <SpinnersBlok /> : ""}
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

                <Button type="button" onClick={saveData}>
                  Bewaar
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VerwerkUrl;
