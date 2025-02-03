import { Wedstrijd } from "@prisma/client";
import { format } from "date-fns";

const GetDatumFromDate = (datum: Date) => {
  return datum.setHours(0, 0, 0, 0);
};
export const DatumVoorbij = (datum: Date) => {
  const vandaag = new Date();
  return GetDatumFromDate(datum) < GetDatumFromDate(vandaag) ? true : false;
};

export const DateToDDMMYYYY = (datum: Date, metTijd = false) => {
  //const d = toZonedTime(datum,"Europe/Brussels")
  return metTijd
    ? format(datum, "dd/MM/yyyy HH:mm")
    : format(datum, "dd/MM/yyyy");
};

export const CheckPeriode = (wedstrijden: Wedstrijd[]) => {
  const datumArr = wedstrijden.reduce((acc: string[], obj) => {
    acc.push(obj.datum.toISOString().split("T")[0]);
    return acc;
  }, []);
  //check of wedstrijddag
  const vandaag = new Date();
  const dateToCheck = vandaag.toISOString().split("T")[0];

  if (datumArr.includes(dateToCheck)) {
    return 2;
  }

  // check of eerste selectie
  if (!!!DatumVoorbij(new Date(datumArr[0]))) {
    return 1;
  }

  return 3;
};

export const KlaarVoorUitslag=(datum:Date)=>{
  const dateToCheck = new Date(datum.toISOString().split("T")[0]);
  const vandaag = new Date((new Date()).toISOString().split("T")[0]);
  return dateToCheck <= vandaag
}
