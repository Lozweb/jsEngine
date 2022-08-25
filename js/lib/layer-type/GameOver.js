import { Layer } from "../Layer.js"
import { Css } from "../Css.js"

export class GameOver extends Layer{
    constructor(name, backgroundImage, engine){
        super(name, backgroundImage)
        this.engine = engine
    }


    stopAnim(){

        for(let interval of this.engine.intervalArray){
            clearInterval(interval)
        }

        for(let shootEn of this.engine.levelManager.EnemiesShootArray){
            clearInterval(shootEn.interval)
        }

        for(let en of this.engine.levelManager.EnemiesArray){
            clearInterval(en.interval)
        }

        for(let sound of this.engine.levelManager.audioManager.audioArray){
            sound.pause()
        }

    }

    cleanScreen(){r

        for(let shoot of this.engine.levelManager.player.shootArray){
            document.getElementById(shoot.id).remove()
        }

        for(let shootEn of this.engine.levelManager.EnemiesShootArray){
            document.getElementById(shootEn.id).remove()
        }
        for(let enemy of this.engine.levelManager.EnemiesArray){
            document.getElementById(enemy.id).remove()
        }

        for(let layer of this.engine.levelManager.level1.background.layers){
            //document.getElementById(layer.name).remove()
        }

    }

    removePlayer(){

        clearInterval(this.engine.loopControl)
        clearInterval(this.engine.player.interval)
        document.getElementById(this.engine.player.id).remove()
        
    }

}