'use client'

import Image from "next/image";
//import { useState, useEffect } from 'react'
//import { sendNotification, subscribeUser, unsubscribeUser } from "./actions";
// import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
 
// function InstallPrompt() {
//   const [isIOS, setIsIOS] = useState(false)
//   const [isStandalone, setIsStandalone] = useState(false)
 
//   useEffect(() => {
//     setIsIOS(
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
//     )
 
//     setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
//   }, [])
 
//   if (isStandalone) {
//     return null // Don't show install button if already installed
//   }
 
//   return (
//     <div>
//       <h3>Installeer App</h3>
//       <button>Toevoegen aan Home Screen</button>
//       {isIOS && (
//         <p>
//           Om deze app te installeren, druk op de Deel knop
//           <span role="img" aria-label="share icon">
//             {' '}
//             ⎋{' '}
//           </span>
//           aen dan &quot;Toevoegen aan startcherm (of zoiets)&quot;
//           <span role="img" aria-label="plus icon">
//             {' '}
//             ➕{' '}
//           </span>.
//         </p>
//       )}
//     </div>
//   )
// }

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
 
//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)
 
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

// function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false)
//     const [subscription, setSubscription] = useState<PushSubscription | null>(
//       null
//     )
//     const [message, setMessage] = useState('')
   
//     useEffect(() => {
//       if ('serviceWorker' in navigator && 'PushManager' in window) {
//         setIsSupported(true)
//         registerServiceWorker()
//       }
//     }, [])
   
//     async function registerServiceWorker() {
//       const registration = await navigator.serviceWorker.register('/sw.js', {
//         scope: '/',
//         updateViaCache: 'none',
//       })
//       const sub = await registration.pushManager.getSubscription()
//       setSubscription(sub)
//     }
   
//     async function subscribeToPush() {
//       const registration = await navigator.serviceWorker.ready
//       const sub = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(
//           process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//         ),
//       })
//       setSubscription(sub)
//       const serializedSub = JSON.parse(JSON.stringify(sub))
//       await subscribeUser(serializedSub)
//     }
   
//     async function unsubscribeFromPush() {
//       await subscription?.unsubscribe()
//       setSubscription(null)
//       await unsubscribeUser()
//     }
   
//     async function sendTestNotification() {
//       if (subscription) {
//         await sendNotification(message)
//         setMessage('')
//       }
//     }
   
//     if (!isSupported) {
//       return <p>Push berichten worden niet ondersteund</p>
//     }
   
//     return (
//       <div>
//         <h3>Push Berichten</h3>
//         {subscription ? (
//           <>
//             <p>U hebt toestemming gegeven voor push berichten.</p>
//             <button onClick={unsubscribeFromPush}>Toestemming intrekken</button>
//             <input
//               type="text"
//               placeholder="Enter notification message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendTestNotification}>Send Test</button>
//           </>
//         ) : (
//           <>
//             <p>U hebt (nog) geen toestemming voor push berichten.</p>
//             <button onClick={subscribeToPush}>Toestemming geven</button>
//           </>
//         )}
//       </div>
//     )
//   }



export default function Home() {
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
            alt="Pagina niet gevonden"
            priority={true}
            title="Pagina niet gevonden"
          />
        </div>
        {/* <div>
        <PushNotificationManager />
        <InstallPrompt />
        </div> */}
      </div>


  );
}
