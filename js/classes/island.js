export default class Island {
  constructor(name) {}

  getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  removeIsland(island) {
    // Create a fade-out animation
    island.animate(
      [
        { opacity: 1 }, // Start with full opacity
        { opacity: 0 }, // End with completely transparent
      ],
      {
        duration: 1000, // Duration of the animation in milliseconds
        fill: "forwards", // Keep the final style of the animation
      }
    ).onfinish = () => {
      // Remove the island from the DOM after the animation ends
      console.log("Island removed");
      island.remove();
    };
  }

  getRandomName() {
    // array with 10 random island names
    const names = [
      "Palmtree beach",
      "Sandy beach",
      "Tropical beach",
      "Palm beach",
      "Sunny beach",
      "Paradise beach",
      "Sunny island",
      "Tropical island",
      "Palm island",
      "Paradise island",
    ];

    // return a random name from the array
    return names[Math.floor(Math.random() * names.length)];
  }
}
