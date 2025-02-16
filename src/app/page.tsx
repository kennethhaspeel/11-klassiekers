import Image from "next/image";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PushNotificationManager from "@/components/PushNotificationManager";
import PushNotificationIos from "@/components/PushNotificationIos";
//import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

export default async function Home() {
  const {getUser, isAuthenticated, getPermissions } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const rechten = await getPermissions();
const user =await getUser()
  return (
    <div className="flex-grow justify-center text-center mx-auto p-3">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">De 11 Klassiekers</h2>
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
        {authenticated && rechten?.permissions.includes("admin") ? (
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
