"use client";

import { Button } from "@/components/ui/button";
import { VerwijderTussenstand, VerwijderUitslag } from "../../../../prisma/queries/TussenstandQueries";

interface Props {
  wedstrijdid: number;
}
const VerwijderButton = ({ wedstrijdid }: Props) => {
  const Verwijder = async (wedstrijdid: number) => {
   const uitslag =  await VerwijderUitslag(wedstrijdid);
   console.log(uitslag)
    const tussenstand = await VerwijderTussenstand(wedstrijdid);
    console.log(tussenstand)
  };
  return (
    <Button
      className="bg-red-500 text-white w-full"
      onClick={() => Verwijder(wedstrijdid)}
    >
      Verwijder
    </Button>
  );
};

export default VerwijderButton;
