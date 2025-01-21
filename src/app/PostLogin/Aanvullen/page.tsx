"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InsertDeelnemerAction, NieuweDeelnemerSchemaErrorType } from "../../../../prisma/actions/UserActions";

interface Props {
  id: string;
  naam: string;
  voornaam: string;
  email: string;
}
const Aanvullen = ({ id, naam, voornaam, email }: Props) => {
  const [state, action, isPending] = useActionState(
    InsertDeelnemerAction,
    {
        errors: {} as NieuweDeelnemerSchemaErrorType,
      }
  );

  return (
    <>
      <div className="p-2">
        <h2 className="text-2xl">Gegevens aanvullen</h2>
        <p>
          Voor we verder kunnen gaan, dient u eerst nog enkele gegevens aan te
          vullen
        </p>
      </div>
      <>{state?.allSaved && <p>Alles werd bewaard...</p>}</>
      <div>
        <form action={action}>
          <div className="grid w-full max-w-sm items-center gap-2">
            <span>Ploegnaam</span>
            <Input
              type="text"
              id="ploegnaam"
              name="ploegnaam"
              placeholder="uw magnifiek bedachte naam..."
              className="border rounded p-2 bg-gray-800"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-2 pt-3">
            <span>Uw Telefoonnummer</span>
            <Input
              type="text"
              id="telefoon"
              name="telefoon"
              placeholder="+32499999999"
              className="border rounded p-2 bg-gray-800"
            />
          </div>
          <div hidden>
            <Input
              type="text"
              id="voornaam"
              name="voornaam"
              defaultValue={voornaam!}
            />
            <Input
              type="text"
              id="naam"
              name="naam"
              defaultValue={naam!}
            />
            <Input
              type="text"
              id="email"
              name="email"
              defaultValue={email!}
            />
                        <Input
              type="text"
              id="id"
              name="id"
              defaultValue={id!}
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
                  <Loader2 className="animate-spin/>" /> Bewaren...
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
    </>
  );
};

export default Aanvullen;
