import { Actor, Vector } from "excalibur";
import { Resources } from '../resources.js';
import { mainCharacter } from '../mainCharacter.js'
import { Barrier } from '../ui/barrier.js';
import { bullet } from '../bullet.js'

export class vaas extends Actor {
  constructor(x, y, target) {
    super({ width: Resources.Vaas.width / 5, height: Resources.Vaas.height / 5 });
    this.pos = new Vector(x, y);
    this.target = target;
    this.speed = 700;
    this.offset = new Vector(40, 0);
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Vaas.toSprite());
    this.scale = new Vector(0.2, 0.2);

    this.on('collisionstart', (event) => {
      if (event.other instanceof mainCharacter) {
        this.kill();
        console.log(event.other.hp);
      }
    });
    this.on('collisionstart', (event) => {
      if (event.other instanceof Barrier) {
        this.kill()
      }
    })
    this.on('collisionstart', (event) => {
        if (event.other instanceof bullet) {
          this.kill()
        }
      })

    this.moveTowardsTarget();
  }

  moveTowardsTarget() {
    const direction = this.target.pos.sub(this.pos).normalize();
    const offsetDirection = direction.clone().normalize().scale(this.offset.x, this.offset.y);
    const offsetPosition = this.pos.add(offsetDirection);
    this.pos = offsetPosition;
    this.vel = direction.scale(this.speed);
    this.rotation = direction.toAngle();
  }

  onPreUpdate() {
    if (this.pos.x > 1600 || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > 1000) {
      this.kill()
    }
  }
}