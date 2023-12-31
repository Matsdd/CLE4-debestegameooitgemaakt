import { Actor, Vector } from "excalibur"
import { Resources } from "../resources.js"

export class Startbutton extends Actor {

    constructor(x,y) {
        super({width:Resources.Play.width/1, height:Resources.Play.height/1})
        this.graphics.use(Resources.Play.toSprite())
        this.pos = new Vector(x,y)
        this.scale = new Vector(0.8,0.8)
    }

    onInitialize() {
    }
}