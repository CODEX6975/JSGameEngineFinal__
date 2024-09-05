// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    this.timeRemaining = 60; // start timer of 60 seconds
    this.collectedCollectibles = 0; // start with collected coins 0

    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);

    // Add the player UI object to the game
    const playerUI = new PlayerUI(100, 100); 
    this.addGameObject(playerUI);

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 20;
    const platformHeight = this.canvas.height; 

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0, this.canvas.height - 20, 2000, 20),                                // Bottom border
      new Platform(0, 0, 2000, 20),                                                      // Top Border
      new Platform(0, 0, platformWidth, platformHeight),                                 // Left border
      new Platform(this.canvas.width - platformWidth, 0, platformWidth, platformHeight), // Right border
      new Platform(400, 300, 800, 20),
      new Platform(200, 250, 200, 20),
      new Platform(0, 180, 200, 20), 
      new Platform(300, 130, 200, 20), 
      new Platform(500, 150, 100, 20),            
      new Platform(600, 150, 2000, 20),           
      new Platform(1300, 380, 150, 20),
      new Platform(600, 450, 2000, 20),
      new Platform(0, 600, 1200, 20),
      new Platform(250, 525, 200, 20),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(340, this.canvas.height - 200, 20, 20));
    this.addGameObject(new Collectible(50, this.canvas.height - 50, 20, 20));
    this.addGameObject(new Collectible(this.canvas.width - 100, 100, 20, 20));

    // Create and add the pause menu UI to the game
    this.pauseMenu = this.createPauseMenu();
    this.isMenuVisible = false; // Initially, the menu is not visible

    // Listen for the pause key ("P") to toggle the pause state
    document.addEventListener('keydown', (event) => {
      if (event.key === 'p' || event.key === 'P') {
        this.togglePause();
      }
    });
  }

  // Create the pause menu UI
  createPauseMenu() {
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = '50%';
    menu.style.left = '50%';
    menu.style.transform = 'translate(-50%, -50%)';
    menu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    menu.style.color = 'white';
    menu.style.padding = '20px';
    menu.style.textAlign = 'center';
    menu.style.display = 'none'; // Initially hidden

    // Create the Reset button
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset';
    resetButton.onclick = () => {
      window.location.reload(); // Reload the page to reset the game
    };
    menu.appendChild(resetButton);

    // Create the Quit button
    const quitButton = document.createElement('button');
    quitButton.innerText = 'Quit';
    quitButton.onclick = () => {
      window.close(); // Close the browser tab
    };
    menu.appendChild(quitButton);

    // Add the menu to the document body
    document.body.appendChild(menu);
    return menu;
  }

  // Toggle between paused and playing states
  togglePause() {
    if (this.state === 'paused') {
      this.state = 'playing';
      this.start(); // Resume the game loop
      this.pauseMenu.style.display = 'none'; // Hide the pause menu
    } else {
      this.state = 'paused';
      this.pauseMenu.style.display = 'block'; // Show the pause menu
      this.stop(); // Stop the game loop
    }
  }

  update(deltaTime) {
    // Only update the game logic if the state is "playing"
    if (this.state === 'playing') {
      this.timeRemaining -= deltaTime; // Update timer

      // Check for progress
      if (this.timeRemaining <= 0) {
        this.resetGame(); // Game reset if no time left
      }

      // Check for collectibles
      if (this.collectedCollectibles >= 3) {
        console.log('You win!');
      }

      super.update(deltaTime);
    }
  }

  // Reload the game
  resetGame() {
    window.location.reload();
  }
}

// Export the Level class as the default export of this module
export default Level;
