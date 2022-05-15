console.log('Service Worker loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received..');

    self.registration.showNotification(data.title, {
        body: 'Notified by Switch',
        icon: 'https://res.cloudinary.com/dzkyrqr5e/image/upload/v1598965863/others/switch_logo.png'
    });
});