import React from 'react'
import { GetDeelnemersPush, UsersMetPush } from '../../../../prisma/queries/UserQueries'
import StuurBericht from './StuurBericht'

const ZendPushBericht = async () => {
const deelnemers:UsersMetPush = await GetDeelnemersPush()
  return (
    <>
    <StuurBericht deelnemers={deelnemers}/>
    </>
  )
}

export default ZendPushBericht