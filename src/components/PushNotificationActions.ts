"use server";

import webPush, { PushSubscription } from "web-push";
import {
  CreatePushData,
  DeletePushData,
  GetAllPushData,
} from "../../prisma/queries/UserQueries";
import { PushData } from "@prisma/client";

webPush.setVapidDetails(
  "mailto:11klassiekers@haspeel.be",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

interface IsubscribeUser {
  sub: PushSubscription;
  id: string;
}
export async function subscribeUser({ sub, id }: IsubscribeUser) {
  await CreatePushData(id, sub.endpoint, sub.keys.p256dh, sub.keys.auth);
  return { success: true };
}

interface IunsubscribeUser {
  sub: PushSubscription;
  id: string;
}
export async function unsubscribeUser({ sub, id }: IunsubscribeUser) {
  await DeletePushData(id, sub.endpoint, sub.keys.p256dh, sub.keys.auth);
  return { success: true };
}

interface IZendBericht {
  titel: string;
  boodschap: string;
  subData: PushData[];
}

export async function ZendBericht({ subData, titel, boodschap }: IZendBericht) {
  try {
    subData.map(async (d) => {
      const subscription: PushSubscription = {
        endpoint: d.endpoint,
        keys: {
          p256dh: d.p256,
          auth: d.auth,
        },
      };
      await webPush.sendNotification(
        subscription,
        JSON.stringify({
          title: titel,
          body: boodschap,
          icon: "/favicon-32x32.png",
        })
      );
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

export async function sendNotification(title: string, message: string) {
  try {
    const data = await GetAllPushData();

    data.map(async (sub) => {
      const subscription: PushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256,
          auth: sub.auth,
        },
      };
      await webPush.sendNotification(
        subscription,
        JSON.stringify({
          title: title,
          body: message,
          icon: "/favicon-32x32.png",
        })
      );
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
