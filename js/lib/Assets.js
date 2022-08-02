export class Assets{

    /**
     * 
     * @param {string} name fileName without extension
     * @returns path of file relatif
     */

    static png(name){
        return '../js/assets/img/' + name + '.png'
    }
    
}