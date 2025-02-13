"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  InsertDeelnemerAction,
  NieuweDeelnemerSchemaErrorType,
} from "../../../prisma/actions/UserActions";

interface Props {
  kindeid: string;
  naam: string;
  voornaam: string;
  email: string;
}
const Aanvullen = ({ kindeid, naam, voornaam, email }: Props) => {
  const [state, action, isPending] = useActionState(InsertDeelnemerAction, {
    errors: {} as NieuweDeelnemerSchemaErrorType,
  });
  console.log(kindeid);
  return (
    <>
      <main className="flex flex-col">
        <div className="p-2">
          <h2 className="text-2xl">Gegevens aanvullen</h2>
          <p>
            Voor we verder kunnen gaan, dient u eerst nog enkele gegevens aan te
            vullen
          </p>
        </div>
        <div>
          {state?.errors?.fieldErrors ? (
            <Alert variant="destructive">
              <AlertTitle className="bg-red-600 m-2 p-3 text-white">Fouten</AlertTitle>
              <AlertDescription>
                <>
                  {state?.errors?.fieldErrors?.ploegnaam ? (
                    <p>{state?.errors?.fieldErrors?.ploegnaam}</p>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {state?.errors?.fieldErrors?.telefoon ? (
                    <p>{state?.errors?.fieldErrors?.telefoon}</p>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {state?.errors?.fieldErrors?.schiftingUur ? (
                    <p>{state?.errors?.fieldErrors?.schiftingUur}</p>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {state?.errors?.fieldErrors?.schiftingMinuten ? (
                    <p>{state?.errors?.fieldErrors?.schiftingMinuten}</p>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {state?.errors?.fieldErrors?.schiftingSeconden ? (
                    <p>{state?.errors?.fieldErrors?.schiftingSeconden}</p>
                  ) : (
                    ""
                  )}
                </>
              </AlertDescription>
            </Alert>
          ) : (
            ""
          )}
        </div>
        {/* <>{state?.allSaved && <p>Alles werd bewaard...</p>}</> */}
        <div className="p-2">
          <form action={action}>
            <div className="grid w-full max-w-sm items-center gap-2">
              <span className="p-2">Ploegnaam</span>
              <Input
                type="text"
                id="ploegnaam"
                name="ploegnaam"
                placeholder="uw magnifiek bedachte naam..."
                className="border rounded p-2 bg-gray-400"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-2 pt-3">
              <span className="p-2">Uw Telefoonnummer</span>
              <Input
                type="text"
                id="telefoon"
                name="telefoon"
                placeholder="+32499999999"
                className="border rounded p-2 bg-gray-400"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <span className="p-2">Schiftingsvraag</span>
              <div className="grid grid-cols-3">
                <Input
                  type="number"
                  className="border rounded p-2 bg-gray-400"
                  id="schiftingUur"
                  name="schiftingUur"
                  placeholder="uren"
                  
                />
                <Input
                  type="number"
                  className="border rounded p-2 bg-gray-400"
                  id="schiftingMinuten"
                  name="schiftingMinuten"
                  placeholder="minuten"
                />
                <Input
                  type="number"
                  className="border rounded p-2 bg-gray-400"
                  id="schiftingSeconden"
                  name="schiftingSeconden"
                  placeholder="seconden"
                />
              </div>
            </div>
            <div hidden>
              <Input
                type="text"
                id="voornaam"
                name="voornaam"
                defaultValue={voornaam!}
              />
              <Input type="text" id="naam" name="naam" defaultValue={naam!} />
              <Input
                type="text"
                id="email"
                name="email"
                defaultValue={email!}
              />
              <Input
                type="text"
                id="kindeid"
                name="kindeid"
                defaultValue={kindeid!}
              />
            </div>
            {state.allSaved ? (
              <div className="py-2">
                <Alert className="bg-green-600 rounded">
                  <AlertTitle>Alles Bewaard</AlertTitle>
                  <AlertDescription>
                    U kunt nu uw ploeg beginnen samenstellen
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="py-2">
                {isPending ? (
                  <Button variant="outline" disabled>
                    <Loader2 className="animate-spin" /> Bewaren...
                  </Button>
                ) : (
                  <Button variant="outline" type="submit">
                    Bewaar
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Aanvullen;
