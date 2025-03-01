import React from 'react'
import { GetDeelnemersPush, UsersMetPush } from '../../../../prisma/queries/UserQueries'
import StuurBericht from './StuurBericht'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import GeenToegang from '@/components/GeenToegang';

const ZendPushBericht = async () => {
  const { isAuthenticated, getPermissions } = getKindeServerSession();

  const auth = await isAuthenticated();
  const rechten = await getPermissions();
  if (!auth || (rechten && !rechten?.permissions.includes("admin")) ) {
    return <GeenToegang />;
  }
const deelnemers:UsersMetPush = await GetDeelnemersPush()
  return (
    <>
    <StuurBericht deelnemers={deelnemers}/>
    </>
  )
}

export default ZendPushBericht