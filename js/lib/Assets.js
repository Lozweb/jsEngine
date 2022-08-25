export class Assets{

    /**
     * 
     * @param {string} name fileName without extension
     * @returns path of file relatif
     */

    //dev path
    
    static png(name){
      return '../js/assets/img/' + name + '.png'
    }

    static fx(name){
      return '../js/assets/sound/fx/' + name + '.ogg'
    }

    static music(name){
      return '../js/assets/sound/musics/' + name + '.mp3'
    } 
    
    //prod path 
    /*
    static png(name){
      return '/telechargement/jsEngine/js/assets/img/' + name + '.png'
    }

    static fx(name){
      return '/telechargement/jsEngine/js/assets/sound/fx/' + name + '.ogg'
    }

    static music(name){
      return '/telechargement/jsEngine/js/assets/sound/musics/' + name + '.mp3'
    }
    */
}