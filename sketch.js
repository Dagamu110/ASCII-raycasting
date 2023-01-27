var map, player, miniMapMargin, raycastingRender;

var rcWidth;
var rcHeight;

const density = "Ñ@#W$9876543210?!abc;:+=-,._         "

function setup() {
    map = new Map({
        matrixMode: true,
        size: 20
    })

    noCursor()

    rcWidth = 80
    rcHeight = 40

    if( map.settings.matrixMode ){
        noCanvas()
    } else {
        createCanvas( 250, 250 )
    } 

    player = new Player( map )

    minimap = createDiv()
    minimap.parent('container')
    miniMapMargin = 5

    raycastingRender = createDiv()
    raycastingRender.parent('container')
}

var prevMousePos = 0

function draw() {
    if ( map.settings.matrixMode ){
        map.renderASCII( minimap, player )
    } else {
        background( '#1d1f2b' )
        map.drawCanvas( miniMapMargin )
        player.showMinimap( miniMapMargin )
    }

    if( key in player.keysMove && keyIsDown( keyCode ) ){
        player.move( player.keysMove[key] )
    } 

    if( mouseX ){
        player.update( mouseX - prevMousePos, raycastingRender )
        prevMousePos = mouseX
    }

}

