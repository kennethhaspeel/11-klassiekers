import React from "react";
import VerwerkUrl from "./VerwerkUrl";

type Params = Promise<{ wedstrijdid: number }>;

const VerwerkWedstrijd = async ({ params }: { params: Params }) => {
  const { wedstrijdid } = await params;

  return (
    <>
      <VerwerkUrl wedstrijdid={wedstrijdid}/>
    </>
  );
};

export default VerwerkWedstrijd;
