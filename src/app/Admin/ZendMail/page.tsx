import React from 'react'
import Quill from './Quill'
import { Deelnemer } from '@prisma/client'
import { GetDeelnemersEmail } from '../../../../prisma/queries/UserQueries'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import GeenToegang from '@/components/GeenToegang'



const QuillServer = async() => {
  const { isAuthenticated, getPermissions } = getKindeServerSession();

  const auth = await isAuthenticated();
  const rechten = await getPermissions();
  if (!auth || (rechten && !rechten?.permissions.includes("admin")) ) {
    return <GeenToegang />;
  }
  const deelnemers:Deelnemer[] = await GetDeelnemersEmail()
  return (
    <>
    <Quill deelnemers={deelnemers}/>
    </>
  )
}

export default QuillServer