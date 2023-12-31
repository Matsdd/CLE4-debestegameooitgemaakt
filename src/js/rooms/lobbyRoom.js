import { Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import * as ex from 'excalibur'
import { mainCharacter } from '../mainCharacter.js'
import { frederik } from '../frederik.js'
import { Resources } from '../resources.js'
import { Barrier } from '../ui/barrier.js'
import { Licht } from '../props/licht.js'
import { upgradeHp } from '../artifacts/upgradeHp.js';
import { upgradeFlame } from '../artifacts/upgradeFlame.js';
import { upgradeAmmo } from '../artifacts/upgradeAmmo.js';
import { upgradeSpeed } from '../artifacts/upgradeSpeed.js';

import { room } from './room.js'

export class lobbyRoom extends room {
    roomBackground = Resources.Lobby
    zwart
    previousScene
    tpx = 1290
    tpy = 80
    spawnBarriers(engine) {
        this.previousScene = this.engine.currentScene

        const barriertopleft = new Barrier(205,215,410,430)
        this.add(barriertopleft)
        const barriertop = new Barrier(980,40,1150,80)
        this.add(barriertop)
        const barrierbali1 = new Barrier(600,390,600,80)
        this.add(barrierbali1)
        const barrierbali2 = new Barrier(865,280,70,200)
        this.add(barrierbali2)
        const barrierfridge1 = new Barrier(20,650,40,200)
        this.add(barrierfridge1)
        const barrierfridge2 = new Barrier(1520,465,40,450)
        this.add(barrierfridge2)
        
        const licht = new Licht(this,Resources.LichtAan,1000,50)
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
        this.Frederik.kill()

        if (this.zwart != null) {
            this.zwart.kill()
        }
    }

    onActivate() {
        this.Sjaak = new mainCharacter(400, 700,this.game)
        this.add(this.Sjaak)

        this.Frederik = new frederik(this.Sjaak, 495, 315)
        this.add(this.Frederik)
    }
}