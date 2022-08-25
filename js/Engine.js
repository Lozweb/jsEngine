import { Screen } from "./lib/Screen.js"
import { Player } from "./Entities/PLayer.js"
import { EntitiesManager } from "./Entities/EntitiesManager.js"
import { Collision } from "./lib/Collision.js"
import { Level } from "./lvl/Level.js"
import { GameOver } from "./lib/layer-type/GameOver.js" 

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)

        this.loopControl = null
        this.control = new Collision(this)

        this.EnemiesArray = new Array()
        this.EnemiesShootArray = new Array()

        this.level1 = new Level("level 1", this)

        this.entitiesManager = new EntitiesManager(this, 2)

        this.player = null

        this.intervalArray = new Array()
    }

    load(){

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.entitiesManager.loadLevel('./js/lvl/level1.json')
        
    }

    run(){

        this.player = new Player('player')

        this.level1.configLayer()
        this.level1.addEntity(this.player, 2)
        this.level1.animateLayer("left", 0)
        this.level1.animateLayer("left", 1)
        
        this.player.getPosition()
        this.player.animate()

        this.entitiesManager.start()
    
        this.loopControl = setInterval(this.loop.bind(this), 16)
    }

    loop(){

        this.control.checkHitsAndCollidEnemies()
        this.control.cleanScreen()
        
        if(this.player.isDead){

            console.log('is Dead')

            let gameOver = new GameOver('gameOver', '', this)    
            gameOver.removePlayer()
            
            //play sound gameover
            //display score
            //stop anim
            //clean screen 
            
            //if life = 0 => gameOver screen
            //else reload level1, player.life --

        }

    }

}