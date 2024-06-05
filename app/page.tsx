'use client'
const publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";


async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/api", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" }
  })
}


export default function Home() {
  return (
    <div className="m-4 flex gap-4 [&>div]:cursor-pointer">
      <div
        onClick={() => {
          if ('serviceWorker' in navigator) {
            registerServiceWorker().catch(console.log)
          }
        }}
        className="bg-sky-500 text-white rounded px-4 py-2">
        subscribe
      </div>
      <div
        onClick={() => { fetch('/api') }}
        className="border border-sky-500 text-sky-500 rounded px-4 py-2">
        ping
      </div>
    </div>
  );
}