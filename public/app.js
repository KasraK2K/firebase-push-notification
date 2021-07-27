// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsouuLftlGcBKG4k8QYY87tGuc7uwYE-g",
  authDomain: "fcm-web-demo-67273.firebaseapp.com",
  projectId: "fcm-web-demo-67273",
  storageBucket: "fcm-web-demo-67273.appspot.com",
  messagingSenderId: "885727063733",
  appId: "1:885727063733:web:217947bc31410aa9f918fc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

function SubscribeUser() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      messaging
        .getToken({
          vapidKey:
            "BDFpsBW57B9ecMUwTP1xFG8MN50ioyQea36J-pWoCjQN2pQWnwP5Ps_jZ5WvyiiWJBbwM-Tzcc3KhKypnw1GDkk",
        })
        .then((currentToken) => {
          console.log("SubscribeUser", currentToken);
          // firebase.firestore().collection('notification').add();
          document.getElementById("tokenId").innerHTML = currentToken;
        });
    }
  });
}

messaging.onMessage((payload) => {
  console.log("Message received.", payload);
});

function sendNotification() {
  const token = document.getElementById("token").value;
  const title = document.getElementById("title").value;
  const msg = document.getElementById("msg").value;

  const body = {
    to: token,
    notification: {
      title: title,
      body: msg,
      icon: "https://img.icons8.com/color/452/firebase.png",
      image: "https://firebase.google.com/images/social.png",
      click_action: "https://www.google.com",
    },
  };

  const potions = {
    method: "POST",
    headers: new Headers({
      Authorization:
        "key=AAAAzjlybrU:APA91bEo7U7qMd6US6kUUwnU2sod80Ko1WdULycBe4QkUaDNzCTIqT0lm8_iDzEoIFVies2nJNTGuC13GCTzaPFOtUuAgjPZyku_iR1hd9d_FQeIwDzDmtcIuQ196AodJkH2oE92dAIN",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  };

  fetch("https://fcm.googleapis.com/fcm/send", potions)
    .then((res) => {
      console.log("sendNotification", res);
    })
    .catch(console.log);
}
