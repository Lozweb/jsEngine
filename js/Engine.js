import { Screen } from "./lib/Screen.js"
import { Collision } from "./lib/Collision.js"
import { LevelManager } from "./lvl/LevelManager.js"
import { StartScreen } from "./lib/layer-type/StartScreen.js"

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)

        this.menu = new StartScreen('start', '')

        this.loopControl = null
        this.control = new Collision(this)

        this.levelManager = new LevelManager(this, 3)

        this.player = null

        this.intervalArray = new Array()

        this.startMenu = true
        this.gameOver = false
        this.playing = false
    }

    load(){

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.levelManager.loadLevel('./js/lvl/level1.json')
        this.levelManager.menu()

    }

    run(){
        
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

    startGame(event, any){

        if(event.keyCode == 32 && this.startMenu) {

            this.playing = true;
            this.startMenu = false
            document.getElementById('menu').remove()
            this.run()

        }

    }

    //explosion sound
    //gestion game Over screen life & continue
    //add new enemy comportement 
    //add new class enemy extends + graphique

}