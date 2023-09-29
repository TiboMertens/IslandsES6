import Island from "./island.js";

const island = new Island();

export default class World {
  constructor() {
    this.islands = []; // a good place to keep track of your islands
    this.hookEvents(); // let's kick things of by hooking up events
  }

  hookEvents() {
    // hook events like clicking buttons to a specific function
    // when the button with id btnAddIsland is clicked, call function addIsland()
    document.querySelector("#btnAddIsland").addEventListener("click", () => {
      this.addIsland(island);
    });

    // when btnSave is clicked, call function save()
    document.querySelector("#btnSave").addEventListener("click", () => {
      this.save();
    });

    // when btnLoad is clicked, call function load()
    document.querySelector("#btnLoad").addEventListener("click", () => {
      this.load();
    });

    // when an island is clicked, call function remove()
    this.islandsContainer = document.querySelector("#app");

    // Attach a single click event listener to the container
    this.islandsContainer.addEventListener("click", (event) => {
      // Check if the clicked element has the "island" class
      if (event.target.classList.contains("island")) {
        // Find the index of the clicked island in the this.islands array
        const indexToRemove = this.islands.findIndex((islandData) => {
          return islandData.name === event.target.innerText;
        });

        // If the island is found in the array, remove it
        if (indexToRemove !== -1) {
          const islandToRemove = this.islands[indexToRemove];
          this.islands.splice(indexToRemove, 1); // Remove from array

          // Call the remove function with the clicked island element
          console.log("Island removed");
          island.removeIsland(event.target);
        }
      }
    });
  }

  save() {
    // save array islands to localstorage as string
    // loop over all this.islands and save the names
    const savedIslands = this.islands.map((islandData) => {
      return {
        color: islandData.color,
        name: islandData.name,
      };
    });

    localStorage.setItem("islands", JSON.stringify(savedIslands));
  }

  load() {
    // load islands from localstorage into array
    // loop over the array and addIslands()
    const savedIslands = JSON.parse(localStorage.getItem("islands"));

    if (savedIslands) {
      // Clear existing islands from the DOM
      this.clearIslandsFromDOM();

      // Loop over the saved islands and add them back
      savedIslands.forEach((islandData) => {
        this.addIsland(islandData.color, islandData.name);
      });
    }
  }

  clearIslandsFromDOM() {
    // Remove all islands from the DOM
    const islandsInDOM = document.querySelectorAll(".island");
    islandsInDOM.forEach((island) => {
      island.remove();
    });

    // Clear the islands array
    this.islands = [];
  }

  getCoordinates() {
    // return coordinates within the screen at random, feel free to change it up!
    let randomSign = Math.random() < 0.5 ? -1 : 1;
    return {
      x: ((Math.random() * window.innerWidth) / 2) * randomSign,
      y: ((Math.random() * window.innerHeight) / 2) * randomSign,
    };
  }

  addIsland(color, name) {
    if (!color || !name) {
      // If color and name are not provided, generate random ones
      color = island.getRandomColor();
      name = island.getRandomName();
    }

    // create a div with class island
    let div = document.createElement("div");
    div.classList.add("island");
    div.style.backgroundColor = color;
    div.innerText = name;
    // append to #app
    document.querySelector("#app").appendChild(div);

    // add the island to the array
    this.islands.push({ color, name });

    this.moveIsland(div);
  }

  moveIsland(island) {
    // this might be a good point to animate the islands with JS Animations API
    // get random coordinates
    let coords = this.getCoordinates();
    // use js web animations api to animate div to these coords
    island.animate(
      [
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${coords.x}px, ${coords.y}px)` },
      ],
      {
        duration: 1000,
        iterations: 1,
        fill: "forwards",
      }
    );
  }
}
