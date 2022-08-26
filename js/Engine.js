import { Screen } from "./lib/Screen.js"
import { Collision } from "./lib/Collision.js"
import { LevelManager } from "./lvl/LevelManager.js"

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height) 

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

    startGame(){

        this.playing = true;
        this.startMenu = false

        this.levelManager.audioManager.stopMusic('intro-music')

        document.getElementById('button').remove()
        document.getElementById('menu').remove()

        this.run()

    }

    run(){
        
        this.levelManager.start()
        this.player.getPosition()
        this.player.animate()
        this.loopControl = setInterval(this.loop.bind(this), 16)
    }

    loop(){


        //check loot isOut to clean screen
        this.control.checkHitsAndCollidEnemies()
        this.control.cleanScreen()
        
        if(this.player.isDead && !this.gameOver) {
            this.player.isDead = false
            this.gameOver = true
            this.gameover()
        }

    }

    gameover(){

        this.player.isDead = true
        this.levelManager.gameOver()

        this.levelManager.audioManager.stopMusic('lvl-music')
        this.levelManager.audioManager.playMusic('game-over')

        for(let interval of this.intervalArray){
            clearInterval(interval)
        }
        
        clearInterval(this.player.interval)
    }

    reset(){
        
        for(let i=0; i < this.levelManager.level1.background.layers.length; i++){
            if(this.levelManager.level1.background.layers[i].name != 'menu')
            document.getElementById(this.levelManager.level1.background.layers[i].name).remove()
        }

        for(let j=0; j < this.levelManager.audioManager.audioArray.length; j++){
            document.getElementById(this.levelManager.audioManager.audioArray[j].id).remove()
        }

        this.screen = new Screen('game', this.width, this.height) 

        this.loopControl = null
        this.control = new Collision(this)

        this.levelManager = new LevelManager(this, 3)

        this.intervalArray = new Array()

        this.startMenu = true
        this.gameOver = false
        this.playing = false

        this.load()

    }

    keyPress(event){

        if(event.keyCode == 32 && this.startMenu) this.startGame()      
        if(event.keyCode == 32 && this.playing && !this.player.isDead) this.player.keyPress(event)
        if(event.keyCode == 13 && this.gameOver) this.reset()
        
    }

}