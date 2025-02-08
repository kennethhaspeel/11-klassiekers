'use client'

import { Button } from "@/components/ui/button"
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { UserPen } from "lucide-react"

const RegistratieComponent = () => {
  return (
    <>
    <div className='flex flex-col w-full mt-5'>
        <div className="flex flex-col w-full">
            <p className="w-full text-center">Er is gekozen voor een systeem zonder paswoord. U hebt dus enkel een emailadres nodig om te registeren</p>
            <p className="w-full text-center">Na registratie en bij het inloggen, krijg je op dit email adres een code gestuurd die je dan moet invullen</p>
        </div>
        <div>
            <div className="flex items-center justify-center mt-4">
                       <Button asChild variant="outline" size="lg">
              <RegisterLink>
                <UserPen />
                Registreer
              </RegisterLink>
            </Button> 
            </div>

        </div>
    </div>
    </>
  )
}

export default RegistratieComponent