import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { cellarTp} from '../ui/cellartp.js'
import { Licht } from '../props/licht.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'
import { poltergeist } from "../enemies/poltergeist.js"

export class storageRoom extends room {
    roomBackground = Resources.Storage
    zwart
    spawnBarriers() {

        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)

        const leftCounter = new Barrier(330,335,80,330)
        this.add(leftCounter)
        const upperCounter = new Barrier(1210,315,80,160)
        this.add(upperCounter)
        const lowerCounter = new Barrier(1210,630,80,340)
        this.add(lowerCounter)

        const cellarteleporter = new cellarTp(430,745,140,120, this.game)
        this.add(cellarteleporter)
        const teleporter = new Tp(790,80,90,20, this.game)
        this.add(teleporter)
    }
    onDeactivate() {
        this.Sjaak.kill()
        this.Poltergeist.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)

        this.Poltergeist = new poltergeist(this.Sjaak, 767, 200)
        this.add(this.Poltergeist)
    }
}