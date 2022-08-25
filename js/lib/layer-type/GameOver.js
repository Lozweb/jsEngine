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

        for(let shootEn of this.engine.EnemiesShootArray){
            clearInterval(shootEn.interval)
        }

        for(let en of this.engine.EnemiesArray){
            clearInterval(en.interval)
        }

    }

    cleanScreen(){r

        for(let shoot of this.engine.player.shootArray){
            document.getElementById(shoot.id).remove()
        }

        for(let shootEn of this.engine.EnemiesShootArray){
            document.getElementById(shootEn.id).remove()
        }
        for(let enemy of this.engine.EnemiesArray){
            document.getElementById(enemy.id).remove()
        }

        for(let layer of this.engine.level1.background.layers){
            document.getElementById(layer.name).remove()
        }

    }

    removePlayer(){

        clearInterval(this.engine.loopControl)
        clearInterval(this.engine.player.interval)
        document.getElementById(this.engine.player.id).remove()
        
    }

}