const publicVapidKey = "BMQI8XZrC6RCdJ2t7jCgv2uYcMTIzfzsmYZaUCK3UyuEuhzFaxJEUE_NTDMQy3jlaWnNtyoqizpk6If-BWjpKhQ";

//Check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

//Register ServiceWorker, Register Push and Send Push
async function send() {

    //Register ServiceWorker
    console.log('Registering service worker...');

    const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    });
    console.log('Service worker Registered...');

    //Register Push
    console.log('Registering Push...');

    const  notification = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64toUint8Array(publicVapidKey)
    });
    console.log('Push Registered...');

    //Send Push Notification
    console.log('Sending Push...');

    await fetch('/notify', {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Notification sent...')
}

function urlBase64toUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}