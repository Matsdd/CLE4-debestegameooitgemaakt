import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { wisp } from '../enemies/wisp.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Mirror } from '../ui/mirror.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bathroom extends room {
    roomBackground = Resources.Bathroom
    zwart
    tpx = 767
    tpy = 80
    spawnBarriers() {
        const mirror = new Mirror(465,80,200,30, this.game)
        this.add(mirror)
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
    }
    onDeactivate() {
        this.Sjaak.kill()
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800)
        this.add(this.Sjaak)

        this.Wisp = new wisp(this.Sjaak, 1150, 450)
        this.add(this.Wisp)
        this.Wisp2 = new wisp(this.Sjaak, 1150, 750)
        this.add(this.Wisp2)
    }
}