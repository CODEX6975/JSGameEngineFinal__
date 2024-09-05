// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio('./resources/audio/jump.mp3'), // The Audio instance for the jump sound.
  collect: new Audio('./resources/audio/collect.mp3'), // The Audio instance for the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player and enemy images.
Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Method to play sound if the game is not paused
function playSound(soundName) {
  if (soundName in AudioFiles) {
    const sound = AudioFiles[soundName];
    if (sound) {
      // Check if the game is paused; if not, play the sound
      if (window.gameState === "playing") { // Assumes you have a global gameState variable
        sound.play();
      }
    }
  }
}

// Export the Images and AudioFiles objects and playSound method
export { Images, AudioFiles, playSound };
