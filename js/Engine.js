import { Screen } from "./lib/Screen.js"
import { Background } from "./lib/Background.js"
import { Assets } from "./lib/Assets.js"
import { Player } from "./Entities/PLayer.js"
import { Starchip } from "./Entities/Starchip.js"

export class Engine{

    constructor(id, width, height){
        this.width = width
        this.height = height
        this.screen = new Screen(id, width, height)

        this.player = new Player('player')
        this.player.createHtmlElement()

        this.starchip = new Starchip('starchip')
        this.starchip.createHtmlElement()

        this.loopControl = null
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

        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.background = new Background(this.screen.width, this.screen.height, this.screen)
        
        this.background.addLayer("stars", "infinitStars", this.screen.container)
        this.background.addLayer("nebuleuse", "infinitBackground", this.screen.container, Assets.png("nebuleuse"))
        this.background.addLayer("entities", "players", this.screen.container)
        this.background.layers[2].addEntity(this.player.element)
        //this.background.layers[2].addEntity(this.starchip.element)
                        
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
        this.starchip.getPosition()
        
        let inter = setInterval(this.loop.bind(this), 33)
    }

    loop(){

        let colid = function(rect1, rect2){

            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) 
            {
                    return true
            }
            else return false
                

        }

        if(colid(this.player.getRect(), this.starchip.getRect())){
            console.log('Collision !');
        }

    }

}