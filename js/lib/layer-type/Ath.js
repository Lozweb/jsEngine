import { Layer } from "../Layer.js";
import { Css } from "../Css.js"

export class Ath extends Layer{
    constructor(name, backgroundImage, engine){
        super(name, backgroundImage)
        this.engine = engine
        this.css = ""
        this.container = null
        this.life = this.engine.player.life
        this.health = this.engine.player.health
        this.score = this.engine.player.score

        this.speed = this.engine.player.speed
        this.power = this.engine.player.power

        this.lifeText
        this.healthText
        this.scoreText
        this.speedText
        this.powerText

        this.interval = null

        this.isInit = true
    }

    configCss(){

        this.css = 
        Css.widthPercent(100) + 
        Css.heightPercent(100) + 
        Css.margin("auto") + 
        Css.position("absolute") + 
        Css.fontFamily('retro')

        return this.css
    }

    containerStyle(){

        return Css.widthPercent(100) + 
                Css.heightPx(50) + 
                Css.minHeightPx(50) + 
                Css.backgroundColor('rgba(0,0,0,0.6)') + 
                Css.flex() + 
                Css.overflow('hidden')

    }

    CreateHtmlElement(){

        this.container = document.createElement('div')
        this.container.setAttribute('id', this.name)
        this.container.style.cssText = this.containerStyle()

        this.lifeText = document.createElement('div')
        this.lifeText.setAttribute('id', 'life')
        this.lifeText.style.cssText = 
            Css.color('white') + 
            Css.padding('15px')
        this.lifeText.textContent = 'Nb vie : ' + this.life

        this.healthText = document.createElement('div')
        this.healthText.setAttribute('id', 'health')
        this.healthText.style.cssText =
        Css.color('white') + 
        Css.padding('15px')
        this.healthText.textContent = 'Santé : ' + this.health

        this.scoreText = document.createElement('div')
        this.scoreText.setAttribute('id', 'score')
        this.scoreText.style.cssText = 
        Css.color('white') + 
        Css.padding('15px')
        this.scoreText.textContent = 'Score : ' + this.score

        this.speedText = document.createElement('div')
        this.speedText.setAttribute('id', 'speed')
        this.speedText.style.cssText = 
        Css.color('white') + 
        Css.padding('15px')
        this.speedText.textContent = 'Speed : ' + this.speed

        this.powerText = document.createElement('div')
        this.powerText.setAttribute('id', 'power')
        this.powerText.style.cssText = 
        Css.color('white') + 
        Css.padding('15px')
        this.powerText.textContent = 'Power : ' + this.power
        
        this.container.append(this.lifeText)
        this.container.append(this.healthText)
        this.container.append(this.scoreText)
        this.container.append(this.speedText)
        this.container.append(this.powerText)

        return this.container

    }

    addElement(){

        let layer = document.getElementById(this.name)
        layer.appendChild(this.CreateHtmlElement())

    }

    updateAth(){

        this.lifeText.textContent = "Life : " + this.engine.player.life
        this.healthText.textContent = "Health : " + this.engine.player.health
        this.scoreText.textContent = "Score : " + this.engine.player.score
        this.speedText.textContent = "Speed : " + this.engine.player.speed
        this.powerText.textContent = "Power : " + this.engine.player.power

    }

    init(){

        if(this.isInit){
            this.addElement()
            this.interval = setInterval(this.updateAth.bind(this), 33)
            this.engine.intervalArray.push(this.interval)
            this.isInit = false
        }

    }

}