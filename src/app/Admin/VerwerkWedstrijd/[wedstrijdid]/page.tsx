import React from 'react'
import VerwerkUrl from './VerwerkUrl'

const VerwerkWedstrijd = async ({
  params,
}: {
  params: { wedstrijid:number };
})  => {
  console.log(params.wedstrijid)
  return (
    <>
    <VerwerkUrl/>
    </>
  )
}

export default VerwerkWedstrijd