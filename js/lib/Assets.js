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

    //prod path 
     
    //static png(name){
    //    return '/telechargement/jsEngine/js/assets/img/' + name + '.png'
    //}
}