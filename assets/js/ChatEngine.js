// class ChatEngine {
//   constructor() {
//     this.socket = io.connect("http://localhost:5000");

//     if (this.userEmail) {
//       this.connectionHandler();
//     }
//   }

//   connectionHandler() {
//     let self = this;

//     this.socket.on("connect", function () {
//       console.log("connection established using sockets...");
//     });
//   }
// }

class ChatEngine {
  constructor() {
    this.socket = io.connect("http://localhost:5000");

    this.handleConnect();
  }

  handleConnect() {
    let self = this;
    this.socket.on("connect", () => {
      console.log("working");

      self.socket.on("got_data", (data) => {
        console.log(data);
        let li = document.createElement("li");

        let nameContainer = document.createElement("p");
        let nameTag = document.createElement("span");
        nameTag.innerHTML = "Name : ";
        let name = document.createElement("span");
        name.innerHTML = data.name;
        nameContainer.append(nameTag);
        nameContainer.append(name);

        let originContainer = document.createElement("p");
        let originTag = document.createElement("span");
        originTag.innerHTML = "Origin : ";
        let origin = document.createElement("span");
        origin.innerHTML = data.origin;
        originContainer.append(originTag);
        originContainer.append(origin);

        let destinationContainer = document.createElement("p");
        let destinationTag = document.createElement("span");
        destinationTag.innerText = "Destination : ";
        let destination = document.createElement("span");
        destination.innerHTML = data.destination;

        destinationContainer.append(destinationTag);
        destinationContainer.append(destination);
        li.appendChild(nameContainer);
        li.append(originContainer);
        li.appendChild(destinationContainer);
        document.getElementById("show-data").prepend(li);
      });
    });
  }
}
