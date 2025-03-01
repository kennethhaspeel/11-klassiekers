import { DateToDDMMYYYY } from "@/components/DatumFuncties";
import { GetWedstrijden } from "../../../prisma/queries/WedstrijdenQueries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wedstrijd } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Reglement = async () => {
  const lijst: Wedstrijd[] = await GetWedstrijden();
  return (
    <>
      <div className="flex flex-col w-full m-4">
        <Alert className="bg-gray-400 w-full p-4">
          <AlertTitle>
            <span className="text-2xl">Reglement</span>
          </AlertTitle>
          <AlertDescription>Het reglement voor 2025</AlertDescription>
        </Alert>
        <div className="p-2 w-full">
          De pronostiek is verspreid over 11 voorjaarsklassiekers
        </div>
        <p></p>
        <div className="w-full p-2">
          <Table className="bg-black/20 dark:bg-white/80 dark:text-black w-full lg:w-3/4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4 text-black text-lg">
                  Datum
                </TableHead>
                <TableHead className="w-1/2 text-black text-lg">
                  Benaming
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lijst?.map((wedstrijd) => (
                <TableRow key={wedstrijd.id}>
                  <TableCell>{DateToDDMMYYYY(wedstrijd.datum)}</TableCell>
                  <TableCell>{wedstrijd.naam}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-2 w-full">
          <p>Inschrijving kost 15 euro, iedere inkomende transfer kost 2 euro.</p>
          <p>Dit kan vereffend worden aan de toog van Kapittel of door overschrijving op BE30 4627 3025 6111 met <span className="font-bold">vermelding van uw naam of ploegnaam</span></p>
        </div>
        <div className="p-2 w-full">
        <Alert className="bg-gray-400 w-full p-4">
          <AlertTitle>
            Puntentelling
          </AlertTitle>
            <AlertDescription>
              <p>
                De puntentelling is de grootste verandering bij andere edities en is zo simpel als maar kan
              </p>
              <p>
                De top 50 krijgt hun positie als punten en de bedoeling is dus om <span className="font-semibold underline underline-offset-4 decoration-4 decoration-sky-200">zo weinig mogelijk punten</span> te verzamelen. Renners in uw selectie die buiten de top 50 aankomen of niet deelnemen, krijgen 100 punten
              </p>
            </AlertDescription>
          </Alert>
        </div>
        <div className="w-full p-2">
          Er zijn geen dagprijzen. Enkel het eindresultaat telt.
          <br />U kunt tien renners selecteren en u beschikt over vijf <strong>inkomende</strong> transfers.
          <br />
          Er is een schiftingsvraag voorzien: hoe lang (uren-minuten-seconden)
          doet de winnaar over Strade Bianche?
        </div>
        <div>
          <Alert className="bg-gray-400 w-full p-4">
            <AlertDescription>
              <p>
                <strong>
                  Deze pronostiek wordt amicaal opgezet. Behalve de winnaars is
                  er niemand die er op één of andere manier voordeel uit haalt.
                  Rivaliteit is leuk maar vriendschappelijkheid, sportiviteit en
                  plezier moeten primeren
                </strong>
              </p>
              <p className="underline decoration-2">
                Bij iedere discussie over het reglement, rangschikking of
                resultaten is de beslissing van de organisatie definitief
              </p>
            </AlertDescription>
          </Alert>
        </div>
        <div className="py-2">Verdeling van de pot gebeurt als volgt:</div>
        <div className="pb-2">
          <ul className="list-disc list-inside">
            <li>Eerste plaats: 50% van de pot met een maximum van 250 euro</li>
            <li>Tweede plaats: 30% van de pot met een maximum van 150 euro</li>
            <li>Derde plaats: 20% van de pot met een maximum van 100 euro</li>
          </ul>
        </div>
        <div>
          Er staat een maximum op het te winnen bedrag. Ook in het geval van
          zeer veel deelnames bleef het altijd maar de top 3 die iets wint.
          Daarom een maximum op het te winnen bedrag. Bestaat de
          pot uit meer dan 500 euro, wordt de rest verdeeld onder de volgende
          deelnemers in de rangschikking in schijven van 50,40,30,... De
          verdeling van de overschot wordt dan wel bekeken. Niet iedereen kan
          winnen maar het is niet de bedoeling dat drie mensen met alles
          weglopen.
        </div>
        <div className="pt-3">
          <Alert className="bg-red-400 w-full p-4">
            <AlertDescription>
              <p>
                Deze site is zeker niet vrij van fouten. Hoewel er (veel te
                weinig) getest werd, kan het zijn dat er een foutje door de
                mazen van het net glipt. U kunt dit melden en we zullen dit zo
                snel mogelijk oplossen
              </p>
              <p>
                Deze site is opgebouwd volgens de logica van één persoon. Het is
                dus mogelijk dat u andere informatie, waar niet onmiddellijk aan
                gedacht werd, ook nuttig zou vinden. Laat het gerust weten
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
};

export default Reglement;
