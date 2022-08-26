export class Css{


    /**
     * return snippet css property
     */

    static minWidthPx(minWidth){
        return 'min-width:' + minWidth + 'px;'
    }

    static minWidthPercent(minWidth){
        return 'min-width:' + minWidth + '%;'
    }

    static minHeightPx(minHeight){
        return 'min-height:' + minHeight + 'px;'
    }

    static minHeightPercent(minHeight){
        return 'min-height:' + minHeight + '%;'
    }

    static widthPx(width){
        return 'width:' + width + 'px;'
    }

    static widthPercent(width){
        return 'width:' + width + '%;'
    }

    static widthAuto(){
        return 'width: auto;'
    }

    static heightPx(height){
        return 'height:' + height + 'px;'
    }

    static heightPercent(height){
        return 'height:' + height + '%;'
    }

    static backgroundColor(color){
        return 'background-color:' + color + ';'
    }

    static color(color){
        return 'color: ' + color + ';'
    }

    static backgroundImage(url){
        return "background-image: url('" + url + "');"
    }

    static backgroundRepeat(value){
        return 'background-repeat:' + value + ';'
    }

    static backgroundPosition(x, y){
        return 'background-position:' + x + ' ' + y + ';'
    }

    static backgroundPositionX(value){
        return 'background-position-x: ' + value + 'px;'
    }

    static backgroundPositionY(value){
        return 'background-position-y: ' + value + 'px;'
    }

    static backgroundSize(value){
        return 'background-size:' + value + ';'
    }

    static opacity(value){
        return 'opacity:' + value + ';' 
    }

    static position(value){
        return 'position:' + value + ';'
    }

    static margin(value){
        return 'margin:' + value + ';'
    }

    static padding(value){
        return 'padding: ' + value + ';'
    }

    static top(value){
        return 'top:' + value + ';'
    }

    static left(value){
        return 'left:' + value + ';'
    }

    static right(value){
        return 'right: ' + value + ';'
    }

    static overflow(value){
        return 'overflow:' + value + ';'
    }

    static zIndex(value){
        return 'z-index:' + value + ';'
    }

    static display(value){
        return 'display: ' + value + ';'
    }

    static webkitTransform(value){
        return '-webkit-transform: ' + value + ';'
    }

    static borderRadius(value){
        return 'border-radius:' + value + '%;'
    }

    static border(value){
        return "border:" + value + ';'
    }

    static flex(){
        return "display: flex;"
    }

    static textAlign(value){
        return 'text-align: ' + value + ';'
    }

    static fontFamily(value){
        return 'font-family: ' + value + ';'
    }
}