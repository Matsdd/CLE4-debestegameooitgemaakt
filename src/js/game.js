import '../css/style.css'
import {Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

import { titleMenu } from './menu/titleMenu'
import { settingsMenu } from './menu/settingsMenu'
import { deathMenu } from './menu/deathMenu'

import { lobbyRoom } from './rooms/lobbyRoom'
import { poolRoom } from './rooms/poolRoom.js'
import { wineCellar } from './rooms/wineCellar.js'
import { bossRoom } from './rooms/bossRoom.js'
import { storageRoom } from './rooms/storageRoom.js'
import { Bedroom1 } from './rooms/bedroom1'
import { bedroom2 } from './rooms/bedroom2'
import { officeRoom1 } from './rooms/officeRoom1'
import { officeRoom2 } from './rooms/officeRoom2'
import { mirrorroom } from './rooms/mirrorRoom'
import { playroom } from './rooms/playRoom'
import { bathroom } from './rooms/bathroom'
import { kitchen1 } from './rooms/kitchen1'
import { kitchen2 } from './rooms/kitchen2'
import { engineRoom } from './rooms/engineRoom'
import { barRoom } from './rooms/barRoom'
import { dormRoom } from './rooms/dormRoom'
import { bossPoolRoom } from './rooms/bossPool'

export class Game extends Engine {
    score = 0
    playerHp = 3
    maxPlayerHp = 3
    difficulty = 0
    rooms = 0
    previousscene = 13
    //health,ammo,speed,dualshot,fire,pierce,hoedj
    cosmetics = [0,0,0,false,false,false,'']
    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        // this.showDebug(true)
    }

    startGame() {  
        this.titlemenu = new titleMenu(this)
        this.settingsmenu = new settingsMenu(this)
        this.deathmenu = new deathMenu(this)

        this.lobbyroom = new lobbyRoom(this)
        this.poolroom = new poolRoom(this)
        this.bosspoolroom = new bossPoolRoom(this)
        this.winecellar = new wineCellar(this)
        this.bossroom = new bossRoom(this)
        this.storageroom = new storageRoom(this)
        this.Bedroom1 = new Bedroom1(this)
        this.Bedroom2 = new bedroom2(this)
        this.officeroom1 = new officeRoom1(this)
        this.officeroom2 = new officeRoom2(this)
        this.Mirrorroom = new mirrorroom(this)
        this.Playroom = new playroom(this)
        this.Bathroom = new bathroom(this)
        this.Kitchen1 = new kitchen1(this)
        this.Kitchen2 = new kitchen2(this)
        this.engine = new engineRoom(this)
        this.Barroom = new barRoom(this)
        this.Dormroom = new dormRoom(this)

        this.addScene('titleMenu', this.titlemenu)  
        this.addScene('settingsMenu', this.settingsmenu)
        this.addScene('deathMenu', this.deathmenu)

        this.addScene('lobbyRoom', this.lobbyroom)  

        this.addScene('poolRoom', this.poolroom)
        this.addScene('wineCellar', this.winecellar)
        this.addScene('bossPoolRoom', this.bosspoolroom)
        this.addScene('bossRoom', this.bossroom)
        this.addScene('storageRoom', this.storageroom)
        this.addScene('Bedroom1', this.Bedroom1)
        this.addScene('Bedroom2', this.Bedroom2)
        this.addScene('officeRoom1', this.officeroom1)
        this.addScene('officeRoom2', this.officeroom2)
        this.addScene('mirrorroom', this.Mirrorroom)
        this.addScene('playroom', this.Playroom)
        this.addScene('bathroom', this.Bathroom)
        this.addScene('kitchen1', this.Kitchen1)
        this.addScene('kitchen2', this.Kitchen2)
        this.addScene('engine', this.engine)
        this.addScene('barRoom', this.Barroom)
        this.addScene('dormRoom', this.Dormroom)

        this.goToScene('titleMenu')

        console.log("Enjoy!")
    }

    addScore(score,room) {
        this.score += score
        if (room) {
            this.rooms++
        }
    }
}



new Game()
