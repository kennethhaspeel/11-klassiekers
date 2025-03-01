import React from "react";
import VerwerkUrl from "./VerwerkUrl";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeenToegang from "@/components/GeenToegang";

type Params = Promise<{ wedstrijdid: number }>;

const VerwerkWedstrijd = async ({ params }: { params: Params }) => {
  const { isAuthenticated, getPermissions } = getKindeServerSession();

  const auth = await isAuthenticated();
  const rechten = await getPermissions();
  if (!auth || (rechten && !rechten?.permissions.includes("admin")) ) {
    return <GeenToegang />;
  }
  const { wedstrijdid } = await params;

  return (
    <>
      <VerwerkUrl wedstrijdid={wedstrijdid}/>
    </>
  );
};

export default VerwerkWedstrijd;
