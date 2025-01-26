import { Renner, Selectie, Team } from '@prisma/client';
import React from 'react'

type SelectieMetRenner = Selectie & { renner: Renner & { team: Team } };
interface Props {
  ploegnaam: string;
  selecties: SelectieMetRenner[];
  periode: number;
  inclFoto: boolean;
  deelnemerid: string;
}

const TransferPagina = ({
    ploegnaam,
    selecties,
    periode,
    inclFoto,
    deelnemerid,
  }: Props)=> {
    console.log(ploegnaam)
    console.log(selecties)
    console.log(periode)
    console.log(inclFoto)
    console.log(deelnemerid)
  return (
    <div>TransferPagina</div>
  )
}

export default TransferPagina