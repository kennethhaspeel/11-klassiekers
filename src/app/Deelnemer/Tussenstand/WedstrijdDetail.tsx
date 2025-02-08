"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  data: ({
    renner: {
      id: number;
      naam: string;
      foto: string;
      vlag: string;
      nationaliteit: string;
      url: string;
      uciranking: number;
      teamid: number;
    };
  } & {
    id: number;
    deelnemerid: string;
    rennerid: number;
    wedstrijdid: number;
    punten: number;
  })[] | undefined;
  ploegnaam: string;
  wedstrijd: string;
}
const WedstrijdDetail = ({ data, wedstrijd, ploegnaam }: Props) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Toon Detail</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex flex-col">
                <div>{wedstrijd}</div>
                <div>{ploegnaam}</div>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col">
                {data
                  ? data?.map((renner) => (
                      <div key={renner.id} className="flex flex-row w-full border-b-2 mb-2">
                        <div className="w-3/4">{renner.renner.naam}</div>
                        <div className="w-1/4 text-right">{renner.punten}</div>
                      </div>
                    ))
                  : ""}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WedstrijdDetail;
