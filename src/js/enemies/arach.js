import { ImageSource, Sound, Resource, Loader, Actor, Vector, Input } from 'excalibur';
import { Resources, ResourceLoader } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js';
import { ghost } from '../enemies/ghost.js';
import { bullet } from '../bullet.js';
import { spin } from '../props/spin.js';

export class arach extends ghost {
  bounceTimer = 0
  constructor(target, posX, posY, chosenPath,game) {
    super({
      width: Resources.Arach.width / 1.1,
      height: Resources.Arach.height / 2,
    });
    this.target = target;
    this.speed = 130;
    this.minDistance = 1;
    this.maxDistance = 500;
    this.rotation = 0;
    this.hp = 16 + (game.difficulty * 3)
    this.timer = 0
    this.cooldown = 200
    this.soundInterval = null;
    this.graphics.use(Resources.Arach.toSprite());
    this.scale = new Vector(0.45, 0.45);
    this.pos = new Vector(posX, posY);
    this.prox = false
    this.path = [
      new Vector(100, 100),
      new Vector(200, 200),
      new Vector(300, 100),
      new Vector(400, 200),
    ]
    this.currentWaypoint = 0;
    this.chosenPath = chosenPath;
    this.aggro = false;
    this.burn = false;
    this.burnCount = 0;
    this.burnTimer = 0;
    this.burn1 = true;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  onInitialize() {

    this.on('collisionstart', (event) => {
      const hitSound = new Audio(Resources.hitSound.path);
      const ghostDeath1 = new Audio(Resources.ghostDeath1.path);
      const ghostDeath2 = new Audio(Resources.ghostDeath2.path);
      ghostDeath1.volume = 0.5
      ghostDeath2.volume = 0.5
      hitSound.volume = 0.3;
      if (event.other instanceof bullet) {
        this.hp -= 1;
        hitSound.play();
        this.aggro = true;
        if (this.hp <= 0) {
          this.kill();
          this.randomNumber
          this.randomNumber = this.getRandomInt(2);

          switch (this.randomNumber) {
            case 0:
              ghostDeath1.play();
              break;
            case 1:
              ghostDeath2.play();
              break;
          }
        }
      }
      if (event.other instanceof mainCharacter) {
        this.vel = new Vector(
          Math.cos(this.rotation) * -10 * this.speed,
          Math.sin(this.rotation) * -10 * this.speed
        )
        this.bounceTimer = 10
      }
    });

    switch (this.chosenPath) {
      case 0:
        this.maxDistance = 450;
        this.path = [
          new Vector(1430, 150),
          new Vector(1430, 300),
          new Vector(1430, 150),
          new Vector(1170, 150),
        ]
        break;
      case 1:
        this.maxDistance = 450;
        this.path = [
          new Vector(477, 230),
          new Vector(930, 230),
        ]
        break;
    }


    // Start playing sounds at random intervals
    this.playSoundAtRandomInterval();
  }

  playSoundAtRandomInterval() {
    const minInterval = 8000; // Minimum interval in milliseconds
    const maxInterval = 17000; // Maximum interval in milliseconds

    const randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

    // Play the sound
    // const sounds = new Audio[Resources.Ghost1.path, Resources.Ghost2.path, Resources.Ghost3.path];

    const sound = new Audio(Resources.Ghost1.path);
    const sound2 = new Audio(Resources.Ghost2.path);
    const sound3 = new Audio(Resources.Ghost3.path);
    const sound4 = new Audio(Resources.Ghost4.path);
    sound.volume = 0.2;
    sound2.volume = 0.2;
    sound3.volume = 0.2;
    sound4.volume = 0.2;

    // Set pitch
    const minPlaybackRate = 1; // Minimum playback rate
    const maxPlaybackRate = 4; // Maximum playback rate
    const randomPlaybackRate = Math.random() * (maxPlaybackRate - minPlaybackRate) + minPlaybackRate;
    sound.playbackRate = randomPlaybackRate;


    this.randomNumber
    this.randomNumber = this.getRandomInt(4);

    switch (this.randomNumber) {
      case 0:
        sound.play();
        break;
      case 1:
        sound2.play();
        break;
      case 2:
        sound3.play();
        break;
      case 3:
        sound4.play();
        break;
    }



    // Schedule the next sound playback
    this.soundInterval = setTimeout(() => {
      this.playSoundAtRandomInterval();
    }, randomInterval);
  }

  moveTowardsTarget(target) {
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    if (this.bounceTimer < 0) {
      if (distance > this.minDistance && distance < this.maxDistance || this.aggro === true) {
        const desiredVel = direction.normalize().scale(this.speed);
        this.vel = desiredVel.clampMagnitude(this.speed);

        // Calculate rotation based on movement direction
        this.rotation = Math.atan2(this.vel.y, this.vel.x);
      } else {
        // Follow the predefined path
        const targetWaypoint = this.path[this.currentWaypoint];
        const direction = targetWaypoint.sub(this.pos);
        const distance = direction.distance();

        if (distance > this.minDistance) {
          const desiredVel = direction.normalize().scale(this.speed);
          this.vel = desiredVel.clampMagnitude(this.speed);

          // Calculate rotation based on movement direction
          this.rotation = Math.atan2(this.vel.y, this.vel.x);
        } else {
          // Reached the current waypoint, move to the next one
          this.currentWaypoint = (this.currentWaypoint + 1) % this.path.length;
          this.vel = Vector.Zero;
        }
      }
    }

  }

  update(engine, delta) {

    if ( this.burn === true && this.burnTimer <= 0) {
      if (this.burn1 === false ){
      this.hp -= 1;
      }
      this.burn1 = false;
      this.burnTimer = 100;
      this.burnCount += 1;
      if ( this.burnCount === 3 ) {
        this.burn = false;
        this.burnCount = 0;
        this.burn1 = true;
      }
      if (this.hp <= 0) {
        this.kill();
      }
    }

    if ( this.burnTimer > 0 ) {
      this.burnTimer--
    }

    this.timer++
    const direction = this.target.pos.sub(this.pos);
    const distance = direction.distance();

    const currentScene = engine.currentScene;
    const poltergeistInScene = currentScene.actors.find(actor => actor instanceof arach);
    if (poltergeistInScene === this) {

      if (this.timer > this.cooldown && distance < this.maxDistance) {

        const Vaas = new spin(this.pos.x, this.pos.y, this.target);
        Vaas.rotation = this.rotation;
        currentScene.add(Vaas);

        this.timer = 0
      };
    }

    this.bounceTimer -= 1
    if (this.prox) {
      this.moveTowardsTarget(this.target.pos);
    } else {
      const targetWaypoint = this.path[this.currentWaypoint];
      this.moveTowardsTarget(targetWaypoint);
    }

    // Call the base update method to apply the calculated velocity and rotation
    super.update(engine, delta);
  }

  onPostKill() {
    // Clear the sound interval
    clearTimeout(this.soundInterval);
  }
}
