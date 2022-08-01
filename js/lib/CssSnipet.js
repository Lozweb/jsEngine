export class CssSnipet{

    /*MinWidht MinHeight*/
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

    /*Width Height*/ 
    static widthPx(width){
        return 'width:' + width + 'px;'
    }

    static widthPercent(width){
        return 'width:' + width + '%;'
    }

    static heightPx(height){
        return 'height:' + height + 'px;'
    }

    static heightPercent(height){
        return 'height:' + height + '%;'
    }

    /*background*/
    static backgroundColor(color){
        return 'background-color:' + color + ';'
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

    static backgroundSize(value){
        return 'background-size:' + value + ';'
    }

    /*Position & other*/
    static position(value){
        return 'position:' + value + ';'
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

    static margin(value){
        return 'margin:' + value + ';'
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

    static webkitTransform(value){
        return '-webkit-transform: ' + value + ';'
    }

}