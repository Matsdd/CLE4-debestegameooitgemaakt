import '../css/style.css'
import {Actor, Engine, Vector, TextAlign, Scene } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

import { titleMenu } from './menu/titleMenu'
import { settingsMenu } from './menu/settingsmenu'

import { lobbyRoom } from './rooms/lobbyRoom'
import { poolRoom } from './rooms/poolRoom.js'
import { wineCellar } from './rooms/wineCellar.js'
import { bossRoom } from './rooms/bossRoom.js'

export class Game extends Engine {

    constructor() {
        super({ width: 1530.01, height: 860.01 })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true)
    }

    startGame() {  
        this.titlemenu = new titleMenu()
        this.settingsmenu = new settingsMenu()

        this.lobbyroom = new lobbyRoom()
        this.poolroom = new poolRoom()
        this.winecellar = new wineCellar()
        this.bossroom = new bossRoom()

        this.addScene('titleMenu', this.titlemenu)  
        this.addScene('settingsMenu', this.settingsmenu)

        this.addScene('lobbyRoom', this.lobbyroom)  
        this.addScene('poolRoon', this.poolroom)
        this.addScene('wineCellar', this.winecellar)
        this.addScene('bossRoom', this.bossroom)

        this.goToScene('titleMenu')

        console.log("Enjoy!")
    }
}



new Game()
