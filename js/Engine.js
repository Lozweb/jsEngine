import { Screen } from "./lib/Screen.js"
import { Player } from "./Entities/PLayer.js"
import { EntitiesManager } from "./Entities/EntitiesManager.js"
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

        this.entitiesManager = new EntitiesManager(this, 2)
    }

    load(){

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        
        fetch('./js/lvl/level1.json')
        .then(rep => {return rep.json()})
        .then(jsonData => this.entitiesManager.loadLevel(jsonData))
        
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
    
        this.loopControl = setInterval(this.loop.bind(this), 33)
    }

    loop(){

        this.control.checkHitsAndCollidEnemies()
        this.control.cleanScreen()
    
    }

}