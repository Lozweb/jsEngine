export class AudioManager{

    constructor(){

        this.audioArray = new Array()
        this.currentPlay = null

    }

    addAudioElement(id, file, volume, type){

        let music = document.createElement('audio')
        music.id = id
        music.src = file
        if(type === 'music') music.type = 'audio/mpeg'
        if(type === 'fx') music.type = 'audio/ogg'
        music.preload = 'auto'
        music.volume = volume
        document.getElementById('game').appendChild(music)
        this.audioArray.push(music)

    }

    playMusic(id){

        let audio = document.getElementById(id)
        audio.play()
        this.currentPlay = id
    }

    stopMusic(id){
        let audio = document.getElementById(id)
        audio.pause()
        audio.currentTime = 0
    }

}