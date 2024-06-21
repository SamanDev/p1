import React, { Component } from "react";
function notifyMe() {
  const notification = new Notification("Hi there!");
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification() {
    var options = {
      body: "3,000,000 تومان",
      icon: "http://localhost:3000/assets/images/stars/lvl10.png",
      image: "http://localhost:3000/assets/images/stars/lvl9.png",
      dir: "rtl",
    };

    var notification = new Notification("پاداش افزایش لٍوٍل", options);
    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      //window.open("http://www.mozilla.org", "_blank");
      // document.getElementById("root").focus();
      //notification.close();
    };
    notification.addEventListener("show", (event) => {
      console.log(event);
    });

    return notification;
  }
  render() {
    return (
      <div>
        <button onClick={() => notifyMe()}>Notify me!</button>

        <button onClick={this.showNotification}>Show notification</button>
      </div>
    );
  }
}

export default DesktopNotification;
