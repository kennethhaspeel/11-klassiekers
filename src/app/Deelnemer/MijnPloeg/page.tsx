import GeenToegang from '@/components/GeenToegang';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'

import { CheckPeriode } from '@/components/DatumFuncties';
import { GetWedstrijden } from '../../../../prisma/queries/WedstrijdenQueries';

const MaakSelectie = async () => {
    // const { getUser, isAuthenticated } = getKindeServerSession();
    // const auth = await isAuthenticated();
    // if (!auth) {
    //   return <GeenToegang />;
    // }
    // const user = await getUser();
   
const lijst = await GetWedstrijden();
// periode 1 = eerste selectie
// periode 2 = wedstrijddag
// periode 3 = tussen wedstrijden
const periode = CheckPeriode(lijst)
console.log(periode)
  return (
    <div>MaakSelectie</div>
  )
}

export default MaakSelectie