import React from 'react'
import Quill from './Quill'
import { Deelnemer } from '@prisma/client'
import { GetDeelnemersEmail } from '../../../../prisma/queries/UserQueries'



const QuillServer = async() => {
  const deelnemers:Deelnemer[] = await GetDeelnemersEmail()
  return (
    <>
    <Quill deelnemers={deelnemers}/>
    </>
  )
}

export default QuillServer