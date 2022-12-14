import { EntitiesManager } from "../Entities/EntitiesManager.js"
import { Level } from "./Level.js"
import { AudioManager } from "../lib/AudioManager.js"
import { Assets } from "../lib/Assets.js"
import { Player } from "../Entities/PLayer.js"

export class LevelManager{

    constructor(engine, layerEnemisIndex){

        this.engine = engine
        this.entitiesManager = new EntitiesManager(this.engine, layerEnemisIndex)

        this.EnemiesArray = new Array()
        this.EnemiesShootArray = new Array()
        this.lootArray = new Array()

        this.level1 = new Level("level 1", this.engine)

        this.audioManager = new AudioManager()
    }

    loadLevel(file){

        if(this.engine.player === null){
            //init
            this.engine.player = new Player('player')
        }else if(this.engine.player.isDead){
            //gameover
            this.engine.player = new Player('player')
        }
        else if(this.engine.player.destroy){    
            //restart
        }
        this.entitiesManager.loadLevel(file)
        this.audioManager.addAudioElement('intro-music', Assets.music('introduction'), 0.5, 'music')
        this.audioManager.addAudioElement('lvl-music', Assets.music('level1'), 1, 'music')
        this.audioManager.addAudioElement('shoot-sound', Assets.fx('laserfire01'), 1, 'fx')
        this.audioManager.addAudioElement('game-over', Assets.music('gameOver'), 1, 'music')
        this.audioManager.addAudioElement('loot', Assets.fx('loot'), 1, 'fx')
    }

    menu(){
        
        this.level1.configMenu()
        this.level1.initLayer(2)
        this.level1.animateLayer("left", 0)
        this.level1.animateLayer("left", 1)

    }

    start(){

        this.level1.configLayer()
        this.level1.addEntity(this.engine.player, 3)
        this.level1.initLayer(4)

        this.audioManager.playMusic('lvl-music')

        this.entitiesManager.start()
    
    }

    gameOver(){

        this.level1.configGameOver()       
        this.level1.initLayer(5)
        
    }

}