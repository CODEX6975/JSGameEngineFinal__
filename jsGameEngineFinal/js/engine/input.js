import Component from './component.js';

// The Input class is responsible for handling keyboard and gamepad input.
// It extends from Component to integrate with game objects.
class Input extends Component {
  constructor() {
    super();
    this.keys = {}; // Object to store the state of each key (pressed or not).
    this.gamepadIndex = null; // Index of the connected gamepad.

    // Event listener for keydown events. Sets the corresponding key to true in the keys object.
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
      this.handleKeyPress(event); // Handle key actions (pause, reset, quit).
    });

    // Event listener for keyup events. Sets the corresponding key to false in the keys object.
    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });

    // Event listener for gamepad connection. Sets the gamepadIndex when a gamepad is connected.
    window.addEventListener('gamepadconnected', (event) => {
      console.log('Gamepad connected:', event.gamepad);
      this.gamepadIndex = event.gamepad.index;
    });

    // Event listener for gamepad disconnection. Resets the gamepadIndex when a gamepad is disconnected.
    window.addEventListener('gamepaddisconnected', (event) => {
      console.log('Gamepad disconnected:', event.gamepad);
      this.gamepadIndex = null;
    });
  }

  // Checks if a particular key is currently pressed.
  isKeyDown(key) {
    return this.keys[key] || false;
  }

  // Returns the current state of the gamepad or null if no gamepad is connected.
  getGamepad() {
    if (this.gamepadIndex !== null) {
      const gamepads = navigator.getGamepads();
      return gamepads[this.gamepadIndex];
    }
    return null;
  }

  // Checks if a particular button on the gamepad is pressed.
  isGamepadButtonDown(buttonIndex) {
    const gamepad = this.getGamepad();
    if (gamepad && gamepad.buttons[buttonIndex]) {
      return gamepad.buttons[buttonIndex].pressed;
    }
    return false;
  }

  // Handles pause, reset, and quit.
  handleKeyPress(event) {
    if (event.code === 'KeyP') {  // "P" key for pause
      if (this.gameObject.game.state === 'paused') {
        this.gameObject.game.resumeGame(); // Resume the game if already paused
      } else {
        this.gameObject.game.pauseGame(); // Pause the game
      }
    }

    if (event.code === 'KeyR') {  // "R" key for reset
      if (this.gameObject.game.state === 'paused') {
        this.gameObject.game.reset(); // Reset the game
      }
    }

    if (event.code === 'KeyQ') {  // "Q" key for quit
      if (this.gameObject.game.state === 'paused') {
        this.gameObject.game.quitGame(); // Quit the game
        window.close(); // Close the browser tab
      }
    }
  }
}

export default Input;
