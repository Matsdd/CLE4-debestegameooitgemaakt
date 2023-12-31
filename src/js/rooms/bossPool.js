import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { ghoul } from '../enemies/ghoul.js'
import { spirit } from '../enemies/spirit.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { bossTp } from '../ui/bossTP.js'
import { Licht } from '../props/licht.js'
import { Healwater } from '../props/healwater.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bossPoolRoom extends room {
    roomBackground = Resources.BossPool
    zwart

    tpx = 0
    tpy = 0
    spawnBarriers() {

        const zwembadlinks = new Barrier(510,510,10,480)
        this.add(zwembadlinks)
        const zwembadrechts = new Barrier(1025,510,10,480)
        this.add(zwembadrechts)
        const zwembadonder1 = new Barrier(610,750,200,10)
        this.add(zwembadonder1)
        const zwembadonder2 = new Barrier(925,750,200,10)
        this.add(zwembadonder2)
        const zwembadboven1 = new Barrier(610,270,200,10)
        this.add(zwembadboven1)
        const zwembadboven2 = new Barrier(925,270,200,10)
        this.add(zwembadboven2)

        const up = new Barrier(767,80,950,10)
        this.add(up)
        const tp = new bossTp(767,80, 80, 30,this.game)
        this.add(tp)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)

        const licht = new Licht(this,Resources.LichtAan,700,50)
        this.add(licht)
    }

    onDeactivate() {
        this.Sjaak.kill()
        this.Sjaak.shootAvailable = false
        this.Sjaak.scoreLabel.text = ''
        this.Sjaak.roomCountLabel.text = ''
        this.Sjaak.hp.kill()
        this.Sjaak.ammo.kill()
        this.Sjaak.score.kill()
        this.Sjaak.sprint.kill()
        this.water.kill()

        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800,this.game)
        this.add(this.Sjaak)
        this.water = new Healwater(760,520,400,400)
        this.add(this.water)
    }
}