class ChatEngine {
  constructor() {
    this.socket = io.connect("http://localhost:5000");

    this.handleConnect();
  }

  handleConnect() {
    let self = this;
    this.socket.on("connect", () => {
    //   console.log("working");
      let ul = document.getElementById("show-data");
      let dataContainer = document.getElementsByClassName("data-container");

      let heading = document.createElement("h1");
      if (ul.innerHTML.length === 0) {
        //   console.log("zero")
        heading.innerHTML = "Please wait while fetching the data...";
        dataContainer[0].append(heading);
      }
      self.socket.on("got_data", (data) => {
        // console.log(data);
        // get the ul from dom
        // creating the li
        // if(data.)
        // dataContainer[0].remove(heading);
        heading.innerHTML=''
        let li = document.createElement("li");

        let nameContainer = document.createElement("p");
        let nameTag = document.createElement("span");
        nameTag.innerHTML = "Name : ";
        nameTag.className = "name-tag";
        let name = document.createElement("span");
        name.innerHTML = data.name;
        name.className = "data-tag";
        nameContainer.append(nameTag);
        nameContainer.append(name);

        let originContainer = document.createElement("p");
        let originTag = document.createElement("span");
        originTag.innerHTML = "Origin : ";
        originTag.className = "name-tag";
        let origin = document.createElement("span");
        origin.innerHTML = data.origin;
        origin.className = "data-tag";
        originContainer.append(originTag);
        originContainer.append(origin);

        let destinationContainer = document.createElement("p");
        let destinationTag = document.createElement("span");
        destinationTag.innerText = "Destination : ";
        destinationTag.className = "name-tag";
        let destination = document.createElement("span");
        destination.innerHTML = data.destination;
        destination.className = "data-tag";

        destinationContainer.append(destinationTag);
        destinationContainer.append(destination);
        li.appendChild(nameContainer);
        li.append(originContainer);
        li.appendChild(destinationContainer);
        // appending to the ul
        ul.prepend(li);
      });
    });
  }
}
