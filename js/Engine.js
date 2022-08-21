import { Screen } from "./lib/Screen.js"
import { Player } from "./Entities/PLayer.js"
import { Starchip } from "./Entities/Starchip.js"
import { Collision } from "./lib/Collision.js"
import { Level } from "./lvl/Level.js"

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)

        this.loopControl = null
        this.control = new Collision(this)

        this.EnemiesArray = new Array()

        this.level1 = new Level("level 1", this)
    }

    load(){

        this.screen.container.style.cssText += this.screen.configContainer("#000")
             
    }

    run(){

        this.player = new Player('player')
        this.en1 = new Starchip('en1', this.width-50, 350)
        this.en2 = new Starchip('en2', this.width-50, 400)

        //get layer config from json
        this.level1.configLayer()
        
        this.level1.addEntity(this.player, 2)
        this.level1.addEntity(this.en1, 2)
        this.level1.addEntity(this.en2, 2) 

        //get animate layer type from json
        this.level1.animateLayer("left", 0)
        this.level1.animateLayer("left", 1)
        
        this.player.getPosition()
        this.player.animate()

        this.en1.getPosition()
        this.en1.animate("straight")

        this.en2.getPosition()
        this.en2.animate("straight")

        this.EnemiesArray.push(this.en1)
        this.EnemiesArray.push(this.en2)
    
        this.loopControl = setInterval(this.loop.bind(this), 33)
    }

    loop(){

        this.control.checkHitsAndCollidEnemies()
        this.control.cleanScreen()
    
    }

}