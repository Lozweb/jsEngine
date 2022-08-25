import { Css } from "../lib/Css.js"

export class Shoot{

    constructor(id, x, y){

        this.id = id
        this.css = ""
        this.element = null

        this.X = x + 40 
        this.Y = y + 20

        this.size = {
            width: 10, 
            height: 3
        }

        this.speed = {
            x: 10,
            y: 0
        }

        this.acc = {
            x: 0, 
            y: 0
        }

        this.ciblePos = {
            x: 0, 
            y: 0
        }

        this.fireDirection = {
            left: true, 
            right: false, 
            up: false, 
            down: false
        }

        this.time = 0

        this.enemyShoot = false

        this.interval = null

        this.power = 0

    }

    configCss(){

        this.css =
            Css.margin(0) + 
            Css.widthPx(this.size.width) + 
            Css.heightPx(this.size.height) + 
            Css.backgroundColor('white') + 
            Css.position('absolute') + 
            Css.top(this.Y + 'px') + 
            Css.left(this.X + 'px')
        return this.css
    }

    configCssEnemyShoot(){
        this.css = 
            Css.margin(0) + 
            Css.widthPx(8) + 
            Css.heightPx(8) + 
            Css.backgroundColor('white') + 
            Css.position('absolute') + 
            Css.top(this.Y + 'px') + 
            Css.left(this.X + 'px') + 
            Css.borderRadius('50')
        return this.css
    }

    createHtmlElementForEnemy(){
        let shoot = document.createElement('figure')
        shoot.setAttribute("id", this.id)
        shoot.style.cssText = this.configCssEnemyShoot()
        this.element = shoot
        return this.element
    }

    createHtmlElement(){
        let shoot = document.createElement('figure')
        shoot.setAttribute("id", this.id)
        shoot.style.cssText = this.configCss()
        this.element = shoot
        return this.element
    }

    getRect(){
        return {x:this.X, y:this.Y, width:this.size.width, height:this.size.height}
    }

    setShootEnemy(cibleX, cibleY){

        this.enemyShoot = true
        
        this.ciblePos.x = cibleX
        this.ciblePos.y = cibleY
        
        if(this.X > this.ciblePos.x){
            this.fireDirection.left = true
            this.fireDirection.right = false
        } 
        else{
            this.fireDirection.left = false
            this.fireDirection.right = true
        } 

        if(this.Y > this.ciblePos.y) {
            this.fireDirection.up = true
            this.fireDirection.down = false
        }
        else {
            this.fireDirection.up = false
            this.fireDirection.down = true
        }

        this.speed.y = 1.5

    }

    move(){

        if(this.enemyShoot){

            if(this.fireDirection.left) {
                this.X -= this.speed.x
            }
            if(this.fireDirection.right) {
                this.X += this.speed.x
            }
            if(this.fireDirection.up) {
                this.Y -= this.speed.y
            }
            if(this.fireDirection.down) {
                this.Y += this.speed.y
            }
            
        }
        else{
            this.X += this.speed.x
        }
        
        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"
    }

    animate(){
        this.interval = setInterval(this.move.bind(this), 16)
    }

}