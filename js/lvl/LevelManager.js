import { EntitiesManager } from "../Entities/EntitiesManager.js"
import { Level } from "./Level.js"
import { AudioManager } from "../lib/AudioManager.js"
import { Assets } from "../lib/Assets.js"
import { Player } from "../Entities/PLayer.js"
import { GameOver } from "../lib/layer-type/GameOver.js"

export class LevelManager{

    constructor(engine, layerEnemisIndex){

        this.engine = engine
        this.entitiesManager = new EntitiesManager(this.engine, layerEnemisIndex)

        this.EnemiesArray = new Array()
        this.EnemiesShootArray = new Array()

        //data from json
        this.level1 = new Level("level 1", this.engine)
        this.levelArray = new Array()

        this.audioManager = new AudioManager()

        this.levelArray = new Array()

    }

    loadLevel(file){

        //file json for script enemy
        this.entitiesManager.loadLevel(file)
        this.audioManager.addAudioElement('lvl-music', Assets.music('level'), 0.5, 'music')
        this.audioManager.addAudioElement('shoot-sound', Assets.fx('laserfire01'), 1, 'fx')

    }

    menu(){
        
        this.level1.configMenu()
        this.level1.initLayer(2)
        this.level1.animateLayer("left", 0)
        this.level1.animateLayer("left", 1)

    }

    start(){

        this.engine.player = new Player('player')

        this.level1.configLayer()

        this.audioManager.playMusic('lvl-music')

        this.level1.addEntity(this.engine.player, 3)
        this.level1.initLayer(4)

        this.entitiesManager.start()
    
    }

    gameOver(){

        let gameOver = new GameOver('gameOver', '', this.engine)    

            //play sound gameover
            //display score

            gameOver.removePlayer()
            
            gameOver.stopAnim()

            //clean screen 
            
            //if life = 0 => gameOver screen
            //else reload level1, player.life --

    }

}