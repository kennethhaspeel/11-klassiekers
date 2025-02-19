import Image from "next/image";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PushNotificationManager from "@/components/PushNotificationManager";
import PushNotificationIos from "@/components/PushNotificationIos";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default async function Home() {
  const {getUser, isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

const user =await getUser()
  return (
    <div className="flex-grow justify-center text-center mx-auto p-3">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">De 11 Klassiekers</h2>
        <Alert className="bg-red-600 rounded p-4">
        <AlertTitle>Even geduld</AlertTitle>

          <AlertDescription>Er is een probleem met de database host. Deze worden zo snel mogelijk opgelost. Als zaken niet bewaard lijken te worden, probeer het later eens opnieuw</AlertDescription>

      </Alert>
        <Image
          className="m-0 rounded-xl"
          src="/images/vintage1.jpg"
          width={700}
          height={700}
          sizes="700px"
          alt="van in tiede"
          priority={true}
          title="van in tiede"
          style={{height:'auto',width:'auto'}}
        />
      </div>
      <div>
        {authenticated ? (
          <>
            <div className="flex flex-col gap-4">

              <PushNotificationManager id={user?.id }/>
              <hr />
              <PushNotificationIos />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
