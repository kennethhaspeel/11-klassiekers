"use client";
import React, { useState } from "react";
import { UsersMetPush } from "../../../../prisma/queries/UserQueries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { ZendBericht } from "@/components/PushNotificationActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  deelnemers: UsersMetPush;
}
const StuurBericht = ({ deelnemers }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [titel, setTitel] = useState<string>("");
  const [boodschap, setBoodschap] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [verstuurd, setVerstuurd] = useState<boolean>(false);
  const [fout, setFout] = useState<string | null>(null);

  const zendBericht = async () => {
    setSending(true);
    console.log(selected);
    console.log(titel);
    console.log(boodschap);
    const d = deelnemers
      .filter((x) => selected.indexOf(x.id) > -1)
      .flatMap((element) => element.PushData);
    const result = await ZendBericht({
      subData: d,
      titel: titel,
      boodschap: boodschap,
    });
    if (result?.success) {
      setVerstuurd(true);
    } else {
      setFout(result?.error || "Fout bij versturen");
    }
    console.log(result);
    setVerstuurd(true);
    setSending(false);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col mx-3">
          {fout ? (
            <Alert>
              <AlertTitle>Fout bij het versturen</AlertTitle>
              <AlertDescription>
                <p>fout</p>
              </AlertDescription>
            </Alert>
          ) : (
            ""
          )}
          <div className="text-2xl py-2">Selecteer Deelnemers</div>
          <div className="flex flex-row gap-4">
            {deelnemers.map((deel) =>
              selected.some((x) => x == deel.id) ? (
                <Button
                  key={deel.id}
                  className="bg-green-700 text-white"
                  onClick={() => {
                    setSelected(selected.filter((x) => x !== deel.id));
                  }}
                >
                  {deel.voornaam} {deel.naam}
                </Button>
              ) : (
                <Button
                  key={deel.id}
                  className="bg-gray-700 text-white"
                  onClick={() => {
                    setSelected([...selected, deel.id]);
                  }}
                >
                  {deel.voornaam} {deel.naam}
                </Button>
              )
            )}
          </div>
          <Separator className="my-2 bg-gray-500" decorative />

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="titel" className="text-xl">
              Titel
            </Label>
            <Input
              type="text"
              id="titel"
              placeholder="titel"
              className="bg-gray-400"
              onChange={(e) => {
                setTitel(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="boodschap" className="text-xl">
              Boodschap
            </Label>
            <Textarea
              id="boodschap"
              placeholder="boodschap"
              className="bg-gray-400"
              onChange={(e) => {
                setBoodschap(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            {verstuurd ? (
              <Button type="button" disabled className="bg-green-700">
                Alles Verstuurd
              </Button>
            ) : sending ? (
              <Button type="button" disabled>
                <Loader2 className="animate-spin" />
                Zend
              </Button>
            ) : (
              <Button type="button" onClick={zendBericht}>
                <Send /> Zend
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StuurBericht;
