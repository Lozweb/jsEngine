import { Screen } from "./lib/Screen.js"
import { Player } from "./Entities/PLayer.js"
import { Collision } from "./lib/Collision.js"
import { LevelManager } from "./lvl/LevelManager.js"

import { GameOver } from "./lib/layer-type/GameOver.js" 

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)

        this.loopControl = null
        this.control = new Collision(this)

        this.levelManager = new LevelManager(this, 2)

        this.player = null

        this.intervalArray = new Array()
    }

    load(){

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.levelManager.loadLevel('./js/lvl/level1.json')

    }

    run(){
        
        //add start screen
        this.levelManager.start()

        this.player.getPosition()
        this.player.animate()

        this.loopControl = setInterval(this.loop.bind(this), 16)
    }

    loop(){

        this.control.checkHitsAndCollidEnemies()
        this.control.cleanScreen()
        
        if(this.player.isDead) this.levelManager.gameOver()

    }

}