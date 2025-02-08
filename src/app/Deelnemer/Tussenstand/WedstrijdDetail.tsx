"use client";
import { Button } from "@/components/ui/button";
import React from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {
  data:
    | ({
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
      })[]
    | undefined;
  ploegnaam: string;
  wedstrijd: string;
}
const WedstrijdDetail = ({ data, wedstrijd, ploegnaam }: Props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Toon Detail</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {wedstrijd}
              <br />
              {ploegnaam}
            </DialogTitle>
          </DialogHeader>
          <Table>
            <TableBody>
              {data
                ? data?.map((renner) => (
                    <TableRow key={renner.id}>
                      <TableCell>{renner.renner.naam}</TableCell>
                      <TableCell>{renner.punten}</TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WedstrijdDetail;
