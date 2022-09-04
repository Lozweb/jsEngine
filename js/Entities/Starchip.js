import { Assets } from "../lib/Assets.js";
import { Css } from "../lib/Css.js";
import { Explosion } from "./Explosion.js";
import { Shoot } from "./Shoot.js"
import { Loot } from "./Loot.js"

export class Starchip{

    constructor(engine, id, x=0, y=0, time=0, behaviour="straight", loot=false, lootType="", lootPower=0, width=23, height=27, sprite='ennemy1'){

        this.engine = engine

        this.id = id
        this.css = ""
        this.element = null
        this.behaviour = behaviour

        this.X = x
        this.Y = y

        this.speed = 10

        this.size = {
            width: width, 
            height: height
        }

        this.interval = null

        this.motion = {
            ampli: 100,
            speed: 0.02, 
            deph: 350,
            tick: 0, 
            pi: 3.14, 
            step: 0
        }

        this.layer = null
        
        this.life = 100
        this.power = 40
        this.time = time
        this.shootCount = 0
        this.points = 100
        this.loot = loot
        this.lootType = lootType
        this.lootPower = lootPower

        this.direction = {
            y: 'bottom', 
            x: 'left'
        }

        this.spriteFile = sprite

        this.createHtmlElement()
    }

    configCss(){

        this.css = 
            Css.widthPx(this.size.width) + 
            Css.heightPx(this.size.height) + 
            Css.backgroundColor('none') +
            Css.position('absolute') + 
            Css.margin('0') +
            Css.top(this.Y + 'px') + 
            Css.left(this.X + 'px') + 
            Css.backgroundImage(Assets.png(this.spriteFile)) 
        return this.css

    }

    createHtmlElement(){

        let starchip = document.createElement('figure')
        starchip.setAttribute('id', this.id)
        starchip.style.cssText = this.configCss()
        this.element = starchip
        return this.element

    }

    getRect(){

        return {x:this.X, y:this.Y, width: this.size.width, height: this.size.height}
    
    }

    getPosition(){

        let style = window.getComputedStyle(this.element)
        this.X = parseInt(style.getPropertyValue('left'))
        this.Y = parseInt(style.getPropertyValue('top'))
        return [this.X, this.Y]
    
    }

    explosion(id){

        let explod = new Explosion(id, this.X, this.Y)
        explod.createHtmlElement()
        this.layer.addEntity(explod.element)
        explod.animate()
        this.element.style.background = "none"
        this.engine.player.score += this.points
        if(this.loot)this.dropLoot()
    }

    dropLoot(){

        let loot = new Loot(this.id + 'loot', this.lootType, this.X, this.Y, this.engine)
        loot.power = this.lootPower
        loot.createHtmlElement()
        this.layer.addEntity(loot.element)
        loot.animate()
        this.engine.levelManager.lootArray.push(loot)

    }

    animate(){

        if(this.behaviour === "straight") {
            this.interval = setInterval(this.straight.bind(this), 33)
        }
        if(this.behaviour === "sinus"){
            this.interval = setInterval(this.sinus.bind(this), 33)
        } 
        if(this.behaviour === "halfTurn"){
            if(this.Y > 300) this.direction.y = 'top'
            if(this.Y < 300) this.direction.y = 'bottom'
            this.interval = setInterval(this.halfTurn.bind(this), 33)
        } 
        if(this.behaviour === "slow"){
            this.interval = setInterval(this.slow.bind(this), 33)
        }
        if(this.behaviour === "boss"){
            this.interval = setInterval(this.boss.bind(this), 33)
        }
        this.engine.intervalArray.push(this.interval)
    
    }

    boss(){

        //phase en fonction de life

        if(this.motion.step === 0){
            this.X -= this.speed
            this.element.style.left = this.X + "px"
            this.motion.tick ++
            if(this.X < 500)this.motion.step = 1
        }
        
        
        if(this.motion.tick === 200 && this.life > 0) {
            this.shoot()
            this.motion.tick = 0
        }

    }

    straight(){ 

        this.X -= this.speed
        this.element.style.left = this.X + "px"
        this.motion.tick ++
        
        if(this.motion.tick === 100 && this.life > 0) this.shoot()
        
    }

    slow(){

        this.X -= this.speed/2
        this.element.style.left = this.X + "px"
        this.motion.tick ++
        
        if(this.motion.tick === 100 && this.life > 0) this.shoot()
        if(this.motion.tick === 200 && this.life > 0) this.shoot()
        if(this.motion.tick === 300 && this.life > 0) this.shoot()
        if(this.motion.tick === 400 && this.life > 0) this.shoot()

    }

    halfTurn(){

        if(this.motion.step === 0){

            this.X -= this.speed
            if(this.X < 100) this.motion.step = 1
        }
        if(this.motion.step === 1){

            this.X += this.speed/2
            if(this.direction.y === 'top') this.Y -= 4
            if(this.direction.y === 'bottom') this.Y += 4

        }
        
        this.motion.tick ++

        if(this.motion.tick === 100 && this.life > 0) this.shoot()
        if(this.motion.tick === 350 && this.life > 0) this.shoot()

        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"
    }

    sinus(){

        this.speed = 2
        this.X -= this.speed * 2

        this.Y = (this.motion.ampli * Math.sin(this.motion.tick*this.motion.speed*this.motion.pi)) + this.motion.deph

        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"

        this.motion.tick ++
        
        if(this.motion.tick === 250 && this.life > 0) {
            this.shoot()
        }

        if(this.motion.tick === 550 && this.life > 0) {
            this.shoot()
        }

    }

    shoot(){

        console.log('shoot');
        let shoot = new Shoot(this.id + 'shoot' + this.shootCount, this.X, this.Y)
        shoot.speed.x = 5
        shoot.power = this.power
        shoot.setShootEnemy(this.engine.player.X, this.engine.player.Y)
        shoot.createHtmlElementForEnemy()
        this.shootCount ++
        this.layer.addEntity(shoot.element)
        shoot.animate()
        this.engine.levelManager.EnemiesShootArray.push(shoot)
        
    }

}