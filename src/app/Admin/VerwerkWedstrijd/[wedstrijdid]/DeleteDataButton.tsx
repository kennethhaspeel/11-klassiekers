"use client";
import React, { startTransition, useActionState } from "react";
import { DeleteUitslagWedstrijdenAction } from "../../../../../prisma/actions/UitslagActions";
import { Button } from "@/components/ui/button";

interface Props {
  wedstrijdid: number;
}
const DeleteDataButton = ({ wedstrijdid }: Props) => {
  const [error, action, isPending] = useActionState(
    DeleteUitslagWedstrijdenAction,
    null
  );

  const Verwijder = () => {
    const formData = new FormData();
    formData.append("wedstrijdid", wedstrijdid.toString());
    startTransition(() => {
      action(formData);
    });
  };
  return (
    <>
      <div>{error ? <p>Fout bij verwijderen</p> : ""}</div>
      <Button onClick={() => Verwijder} disabled={isPending}>
        Verwijder uitslag
      </Button>
    </>
  );
};

export default DeleteDataButton;
