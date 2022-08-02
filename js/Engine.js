import { Screen } from "./lib/Screen.js"
import { Background } from "./lib/Background.js"
import { Assets } from "./lib/Assets.js"
import { Player } from "./lib/PLayer.js"

export class Engine{

    constructor(id, width, height){
        this.width = width
        this.height = height
        this.screen = new Screen(id, width, height)
        this.pos = 0
        this.up = false
        this.down = false
        this.left = false
        this.right = false
        this.checkInput = null
        this.player = new Player('player')
        this.player.createHtmlElement()
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
                        
    }

    /**
     * run() :  Permet de lancer les setIntervals des layers se chargeant de l'animation
     * les Layers type étant des class enfants de Layer, chaque type à rôle et se pilote différeement
     * animate() : lance le setInterval set sur 33ms ce qui donne environ 30img/s (1000ms / 33ms = 30.3)
     */

    run(){

        this.background.layers[0].animate("left")
        this.background.layers[1].animate("left")
        let coord = this.player.getPosition()
        this.player.X = coord[0]
        this.player.Y = coord[1]
        
    }

}