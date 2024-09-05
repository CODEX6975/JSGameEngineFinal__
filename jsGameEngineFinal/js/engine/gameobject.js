// This class represents a GameObject which is an entity in your game.
class GameObject {
  // The constructor initializes a new instance of the GameObject class.
  constructor(x = 0, y = 0) {
    // The x-coordinate of the GameObject's position.
    this.x = x;
    // The y-coordinate of the GameObject's position.
    this.y = y;
    // An array to hold all the components that are attached to this GameObject.
    this.components = [];
  }

  // The addComponent method is used to attach a new component to this GameObject.
  addComponent(component) {
    // Add the component to the list of this GameObject's components.
    this.components.push(component);
    // Set the gameObject property of the component to this GameObject.
    // This way, the component has a reference back to the GameObject it is attached to.
    component.gameObject = this;
  }

  // The update method is called once per game frame, and calls the update method on all of this GameObject's components.
  update(deltaTime) {
    // Check if the game is paused before updating components
    if (this.game && this.game.state === 'paused') {
      return;
    }
    for (const component of this.components) {
      component.update(deltaTime);
    }
  }

  // The draw method is called once per game frame, after the update method, and calls the draw method on all of this GameObject's components.
  draw(ctx) {
    for (const component of this.components) {
      component.draw(ctx);
    }
  }

  // The getComponent method is used to get the first component of this GameObject that is an instance of the given class.
  getComponent(componentClass) {
    // Find the first component that is an instance of componentClass.
    return this.components.find((component) => component instanceof componentClass);
  }
}

// The GameObject class is exported as the default export of this module.
export default GameObject;
