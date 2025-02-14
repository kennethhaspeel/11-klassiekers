"use client";

import { useEffect, useState } from "react";
import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "./PushNotificationActions";
import { Button } from "./ui/button";
import { UpdatePushData } from "../../prisma/queries/UserQueries";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

interface Props{
    id?:string
}

const PushNotificationManager = ({id}:Props) => {

    //https://felixgerschau.com/web-push-notifications-tutorial/

  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    console.log(id)
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await UpdatePushData(id!,serializedSub)
    console.log(serializedSub);
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    console.log(id)
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    // const sub = await GetUserPushData(id!)
    // console.log(sub)
    // setSubscription(JSON.parse(JSON.stringify(sub)))
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push berichten worden niet ondersteund</p>;
  }

  return (
    <div className="pt-3">
      <h3 className="text-xl font-bold">Push Berichten</h3>
      {subscription ? (
        <>
          <div className="flex flex-col">
            <div>U hebt toestemming gegeven voor push berichten.</div>
            <div><Button onClick={unsubscribeFromPush}>Toestemming intrekken</Button></div>
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendTestNotification}>Send Test</Button>
          </div>
        </>
      ) : (
        <>
          <p>U hebt (nog) geen toestemming voor push berichten.</p>
          <Button onClick={subscribeToPush}>Toestemming geven</Button>
        </>
      )}
      <div className="mt-3 text-sm">
        Disclaimer: Push berichten zijn een beetje een experiment. Het kan dus goed zijn dat je geen enkel bericht ontvangt
      </div>
    </div>
  );
};

export default PushNotificationManager;
