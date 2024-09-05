// Import necessary modules
import Camera from './camera.js';

// Define the Game class
class Game {
  // Constructor for initializing a new instance of the Game class
  constructor(canvasId) {
    // The canvas HTML element where the game will be drawn
    this.canvas = document.getElementById(canvasId);
    // The 2D rendering context for the canvas, which is used for drawing
    this.ctx = this.canvas.getContext('2d');
    // An array to hold all the game objects that are currently in the game
    this.gameObjects = [];
    // An array to hold game objects that are marked to be removed from the game
    this.gameObjectsToRemove = [];
    // The time at which the last frame was rendered
    this.lastFrameTime = 0;
    // The amount of time that passed between the last frame and the current frame
    this.deltaTime = 0;
    // Adjust the size of the canvas to match the window size
    this.resizeCanvas();
    // Add an event listener to resize the canvas whenever the window size changes
    window.addEventListener('resize', () => this.resizeCanvas());
    // Instantiate a new camera without a target and with dimensions equal to the canvas size
    this.camera = new Camera(null, this.canvas.width, this.canvas.height);

    // Control the main game loop
    this.isRunning = true;
    // Manage game states ("playing", "paused", etc.)
    this.state = 'playing';

    // Handle keyboard input for pausing, restarting, and quitting
    document.addEventListener('keydown', (event) => {
      if (event.key === 'p') {
        this.togglePause(); // Toggle pause state
      } else if (event.key === 'r' && this.state === 'paused') {
        this.reset(); // Restart the game
      } else if (event.key === 'q' && this.state === 'paused') {
        this.quitGame(); // Quit the game
      }
    });
  }

  // This method resizes the canvas to fill the window, with a small margin
  resizeCanvas() {
    this.canvas.width = window.innerWidth - 50;
    this.canvas.height = window.innerHeight - 50;
  }

  // This method starts the game loop
  start() {
    this.isRunning = true;
    this.state = 'playing';
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  // The main game loop, which is called once per frame
  gameLoop(currentFrameTime) {
    // Calculate the time passed since the last frame
    this.deltaTime = (currentFrameTime - this.lastFrameTime) / 1000;
    // Update the last frame time
    this.lastFrameTime = currentFrameTime;

    if (this.state === 'playing') {
      this.update(); // Update all game objects
      this.camera.update(); // Update the camera
      this.draw(); // Draw all game objects
    } else if (this.state === 'paused') {
      this.drawPauseMenu(); // Draw the pause menu
    }

    if (this.isRunning) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Continue the game loop
    }
  }

  // This method updates all game objects
  update() {
    // Call each game object's update method with the delta time
    for (const gameObject of this.gameObjects) {
      gameObject.update(this.deltaTime);
    }
    // Filter out game objects that are marked for removal
    this.gameObjects = this.gameObjects.filter(obj => !this.gameObjectsToRemove.includes(obj));
    // Clear the list of game objects to remove
    this.gameObjectsToRemove = [];
  }

  // This method draws all game objects on the canvas
  draw() {
    // Clear the entire canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Save the current state of the canvas and the context
    this.ctx.save();
    // Translate the canvas by the negative of the camera's position to follow the camera
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Draw each game object on the canvas
    for (const gameObject of this.gameObjects) {
      gameObject.draw(this.ctx);
    }

    // Restore the canvas and context to their state before the camera translation
    this.ctx.restore();
  }

  // This method draws the pause menu
  drawPauseMenu() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Paused', this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.fillText('Press "P" to Resume', this.canvas.width / 2, this.canvas.height / 2 + 20);
    this.ctx.fillText('Press "R" to Restart', this.canvas.width / 2, this.canvas.height / 2 + 60);
    this.ctx.fillText('Press "Q" to Quit', this.canvas.width / 2, this.canvas.height / 2 + 100);
  }

  // Pause the game
  pauseGame() {
    if (this.state === 'playing') {
      this.state = 'paused';
    }
  }

  // Resume the game
  resumeGame() {
    if (this.state === 'paused') {
      this.state = 'playing';
    }
  }

  // Toggle between paused and playing states
  togglePause() {
    if (this.state === 'playing') {
      this.pauseGame();
    } else if (this.state === 'paused') {
      this.resumeGame();
    }
  }

  // Add a game object to the game
  addGameObject(gameObject) {
    gameObject.game = this; // Set the game object's game property to this game instance
    this.gameObjects.push(gameObject); // Add the game object to the array of game objects
  }

  // Mark a game object for removal from the game
  removeGameObject(gameObject) {
    this.gameObjectsToRemove.push(gameObject); // Add the game object to the array of game objects to remove
  }

  // Reset the game to its initial state and then restart it
  reset() {
    // Stop the game
    this.isRunning = false;

    // Reset all game objects that have a reset method
    for (const gameObject of this.gameObjects) {
      if (gameObject.reset) {
        gameObject.reset();
      }
    }

    // Restart the game
    window.location.reload(); // Reload the page to reset the game
  }

  // Quit the game
  quitGame() {
    window.close(); // Close the current browser tab
  }
}

// Export the Game class as the default export of this module
export default Game;
