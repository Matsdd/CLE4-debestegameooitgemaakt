import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { mainCharacter } from '../mainCharacter.js'
import { mare } from '../enemies/mare.js'
import { wisp } from '../enemies/wisp.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Tp } from '../ui/tp.js'
import { Licht } from '../props/licht.js'
import { Mirror } from '../ui/mirror.js'
import { Stof } from '../ui/STOOFZUGER.js'

import { roomBack } from './roomBack.js'
import { room } from './room.js'

export class bathroom extends room {
    roomBackground = Resources.Bathroom
    zwart
    previousScene
    tpx = 730
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene
        const mirror = new Mirror(465,80,200,30, this.game)
        this.add(mirror)
        const up = new Barrier(767,80,950,10)
        this.add(up)
        const left = new Barrier(300,510,10,860)
        this.add(left)
        const right = new Barrier(1234,510,10,860)
        this.add(right)
        const leftSink = new Barrier(345,628,150,335)
        this.add(leftSink)
        const leftTable = new Barrier(320,330,80,230)
        this.add(leftTable)
        const rightwall = new Barrier(1050,330,380,100)
        this.add(rightwall)
        const middlewall = new Barrier(870,730,20,300)
        this.add(middlewall)
        const middlewall2 = new Barrier(870,350,20,250)
        this.add(middlewall2)
        const middlewall3 = new Barrier(905,120,85,80)
        this.add(middlewall3)
        const toiler = new Barrier(1088,120,110,130)
        this.add(toiler)

        const licht = new Licht(this,Resources.LichtAan,800,70)
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
        this.Wisp.kill()
        this.Wisp2.kill()
        this.Mare.kill()
        if (this.teleporten != null) {
            this.teleporter.kill()
        }
        this.teleportActive = false
        this.teleporterInRoom = false
        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(767, 800,this.game)
        this.add(this.Sjaak)

        this.Wisp = new wisp(this.Sjaak, 1150, 450,this.game,true)
        this.add(this.Wisp)
        this.Wisp2 = new wisp(this.Sjaak, 1150, 750,this.game,true)
        this.add(this.Wisp2)

        this.Mare = new mare(this.Sjaak, 830, 190, 1,this.game)
        this.add(this.Mare)
        
        const stof = new Stof()
        this.add(stof)
    }
}