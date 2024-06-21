importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyA4NlmazdAOEweehYLywZgOGtUm_INKAA0",
  authDomain: "galaxy-c1178.firebaseapp.com",
  databaseURL: "https://galaxy-c1178-default-rtdb.firebaseio.com",
  projectId: "galaxy-c1178",
  storageBucket: "galaxy-c1178.appspot.com",
  messagingSenderId: "231752062766",
  appId: "1:231752062766:web:ccbea905f9e9826d060cbf",
  measurementId: "G-FMV4J1CL20",
};

try {
  const init = firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging(init);

  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/favicon.png",

      dir: "rtl",
      actions: [{ action: "archive", title: "Archive" }],
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {}
self.addEventListener(
  "notificationclick",
  function (event) {
    if (event.action === "archive") {
      event.notification.close();
    } else {
      clients.openWindow("/");
      event.notification.close();
    }
  },
  false
);
