class Notification {
  constructor(info) {
    this.info = info;
  }
  createObject() {
    if (document.querySelector(".notification")) {
      document.body.removeChild(document.querySelector(".notification"));
    }
    const notificationElement = Object.assign(document.createElement("div"), { className: "notification" });
    const spanElement = Object.assign(document.createElement("span"), { textContent: this.info });
    const hrElement = document.createElement("hr");

    notificationElement.appendChild(spanElement);
    notificationElement.appendChild(hrElement);
    document.body.appendChild(notificationElement);
  }
  removeObject() {
    document.body.removeChild(document.querySelector(".notification"));
  }
}
