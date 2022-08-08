import { Screen } from "./lib/Screen.js"
import { Player } from "./Entities/PLayer.js"
import { Starchip } from "./Entities/Starchip.js"
import { Collision } from "./lib/Collision.js"
import { Level } from "./lvl/Level.js"

export class Engine{

    constructor(id, width, height){

        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)
        this.screen.container.style.cssText += this.screen.configContainer("#000")

        this.loopControl = null
        this.playerHits = new Collision()
        this.EnemiesArray = new Array()

        this.level1 = new Level("level 1", this)
    }



    load(){

        this.player = new Player('player')
        this.player.createHtmlElement()

        this.en1 = new Starchip('en1', this.width-50, 350)
        this.en1.createHtmlElement()

        this.en2 = new Starchip('en2', this.width-50, 400)
        this.en2.createHtmlElement()

 
        this.level1.configLayer()
        
        this.level1.addEntity(this.player.element, 2)
        this.level1.addEntity(this.en1.element, 2)
        this.level1.addEntity(this.en2.element, 2)

        this.player.putOn(this.level1.getLayer(2))
        this.en1.putOn(this.level1.getLayer(2))
        this.en2.putOn(this.level1.getLayer(2))
                        
    }

    run(){

        this.level1.animateLayer("left", 0)
        this.level1.animateLayer("left", 1)
        
        this.player.getPosition()
        this.player.animate()

        this.en1.getPosition()
        this.en1.animate("straight")

        this.en2.getPosition()
        this.en2.animate("straight")

        this.EnemiesArray.push(this.en1)
        this.EnemiesArray.push(this.en2)
    
        let inter = setInterval(this.loop.bind(this), 33)
    }

    loop(){

        /**
         * Check collision & Hits
         */

        for(let i = 0; i < this.EnemiesArray.length; i++){

            //check player hit ennemies
            for(let j=0; j < this.player.shootArray.length; j++){

                if(this.playerHits.isCollide(
                    this.player.shootArray[j].getRect(),
                    this.EnemiesArray[i].getRect()
                ))
                {
                    this.player.removeShoot(this.player.shootArray[j])
                    this.EnemiesArray[i].life -= this.player.power

                    if(this.EnemiesArray[i].life <= 0){
                        this.EnemiesArray[i].explosion('explos-' + this.EnemiesArray[i].id)
                    }

                }

            }

            //check player collision with ennemies
            if(this.playerHits.isCollide(
                this.player.getRect(), 
                this.EnemiesArray[i].getRect()
            ))
            {
                console.log('Collision !');
                this.EnemiesArray[i].life -= this.EnemiesArray[i].life

                if(this.EnemiesArray[i].life <= 0){
                    this.EnemiesArray[i].explosion('explos-' + this.EnemiesArray[i].id)
                }
                
            }
        }
    
        /**
         * Clean Screen check if entities is out of screen
         */

        for(let i = 0; i < this.player.shootArray.length; i++){

            //check if player shoot isOut of screen
            if(this.player.shootArray[i].X > this.width){

                this.player.removeShoot(this.player.shootArray[i])

            }
        }
        
        for(let j=0; j < this.EnemiesArray.length; j++){

            //check if enemy is out of sreen or dead
            if(this.EnemiesArray[j].X < 0 || this.EnemiesArray[j].life <= 0){

                document.getElementById(this.EnemiesArray[j].id).remove()
                this.EnemiesArray = this.EnemiesArray.filter(data => data.id != this.EnemiesArray[j].id)

            }

        }

    }

}