"use client";

import React, { useState } from "react";
import { sendNotification } from "./PushNotificationActions";
import { PushSubscription as pushsubscription } from "web-push";
import { Button } from "./ui/button";
interface IpushNotificationSend {
    subscription:pushsubscription
}
const PushNotificationSend = ({subscription}:IpushNotificationSend) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(title, message);
      setMessage("");
      setTitle("");
    }
  }

  return (
    <div className="mt-2">
      <input
        type="text"
        placeholder="titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter notification message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={sendTestNotification}>Send Test</Button>
    </div>
  );
};

export default PushNotificationSend;
