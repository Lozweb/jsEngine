import { Screen } from "./lib/Screen.js"
import { Background } from "./lib/Background.js"
import { Assets } from "./lib/Assets.js"
import { Player } from "./Entities/PLayer.js"
import { Starchip } from "./Entities/Starchip.js"
import { Collision } from "./lib/Collision.js"

export class Engine{

    constructor(id, width, height){
        this.width = width
        this.height = height
        this.screen = new Screen(id, this.width, this.height)
        this.loopControl = null
        this.playerHits = new Collision()
        this.EnemiesArray = new Array()

        //faire une class enemies manager qui load un json
        //json => liste des ennemies à faire apparaitre
        //avec timer, type, position, comportement
    }


    /**
     * load() : initialise les ressources et les ajoutes à l'écrans
     * le Background est la <div> principale id="game"
     * Background(largeur, hauteur, Object{Screen})
     * background.addLayer(id, type, Object{screen}, facultif(Asset.png(fileName))) => ajoute d'autre <div> 
     * type => infinitBackground : affiche un cover du png
     * type => infinitStars : add <figure> dans la <div> des étoiles de différentes tailles et vitesse + couleurs 
     */


    load(){


        this.player = new Player('player')
        this.player.createHtmlElement()

        this.en1 = new Starchip('en1', this.width-50, 450)
        this.en1.createHtmlElement()

        this.en2 = new Starchip('en2', this.width -50, 300)
        this.en2.createHtmlElement()

 

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.background = new Background(this.screen.width, this.screen.height, this.screen)
        
        this.background.addLayer("stars", "infinitStars", this.screen.container)
        this.background.addLayer("nebuleuse", "infinitBackground", this.screen.container, Assets.png("nebuleuse"))
        this.background.addLayer("entities", "none", this.screen.container)
        this.background.layers[2].addEntity(this.player.element)

        this.player.layer = this.background.layers[2]
        //faire appel à ennemies manager 
        this.background.layers[2].addEntity(this.en1.element)

        this.background.layers[2].addEntity(this.en2.element)
                        
    }

    /**
     * run() :  Permet de lancer les setIntervals des layers se chargeant de l'animation
     * les Layers type étant des class enfants de Layer, chaque type à rôle et se pilote différeement
     * animate() : lance le setInterval set sur 33ms ce qui donne environ 30img/s (1000ms / 33ms = 30.3)
     */

    run(){

        this.background.layers[0].animate("left")
        this.background.layers[1].animate("left")
        
        this.player.getPosition()
        this.player.animate()

        //sera effectuer dans l'ennemie manager
        this.en1.getPosition()
        this.en2.getPosition()

        this.EnemiesArray.push(this.en1)
        this.EnemiesArray.push(this.en2)

        this.en1.animate("sinus")
    
        
        let inter = setInterval(this.loop.bind(this), 33)
    }

    loop(){



        if(this.player.shootArray.length > 0){

            for(let i = 0; i < this.player.shootArray.length; i++){

                
                //check if player shoot isOut of screen
                if(this.player.shootArray[i].X > this.width){

                    this.player.removeShoot(this.player.shootArray[i])

                }
            }
        }

        if(this.EnemiesArray.length > 0 ){

            for(let i = 0; i < this.EnemiesArray.length; i++){

                //check player collision with ennemies
                if(this.playerHits.checkCollision(this.player.getRect(), this.EnemiesArray[i].getRect())){
                    
                    console.log('Collision !');
                
                }
    
                //add remove ennemies if is out
    
            }
        }

    }

}