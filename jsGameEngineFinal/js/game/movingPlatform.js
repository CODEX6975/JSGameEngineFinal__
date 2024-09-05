// class MovingPlatform extends Platform {
//     constructor(x, y, width, height, speed, range) {
//       super(x, y, width, height);
//       this.initialX = 10; //starting position
//       this.speed = 1; //speed of platforms
//       this.range = 500; //movement distance of platform
//       this.direction = 1; //direction of movement
//     }
  
//     update(deltaTime) {
//       //move the platform within giben range
//       this.x += this.speed * this.direction * deltaTime;
  
//       //check if platform reached limit
//       if (this.x <= this.initialX - this.range || this.x >= this.initialX + this.range) {
//         this.direction *= -1; //reverse direction
//       }
  
//       super.update(deltaTime);
//     }
//   }