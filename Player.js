function Player( map ){

    this.pos = createVector()
    while( map.collide( this.pos )){
        this.pos.x = random( map.matrix[0].length*map.settings.size )
        this.pos.y = random( map.matrix.length*map.settings.size )
    } 
    this.vel = 1

    this.size = 5
    this.color = [255]
    this.keysMove = {
        'w': createVector(1,0),
        's': createVector(-1,0),
        'a': createVector(0,-1),
        'd': createVector(0,1),
    }

    this.angleVision = 0
    this.pov = PI/2

    this.showMinimap = function( margin ){
        this.color = map.collide( this.pos ) ? [255,0,0] : [ 0, 255, 0 ]
        push()
        fill( ...this.color )
        noStroke()
        circle( 
            margin + this.pos.x,
            margin + this.pos.y, this.size)
        pop()

    }
    this.move = function( vector ){
        vector = p5.Vector.fromAngle( this.angleVision + vector.heading() )
        let newPos = this.pos.copy().add( vector.setMag( this.vel ) )
        this.pos = map.collide( newPos ) ? this.pos : newPos
        this.constrain( this.pos )
    }

    this.constrain = function( pos ){
        let nx = constrain( pos.x, this.size, map.settings.size*map.matrix[0].length - this.size )
        let ny = constrain( pos.y, this.size, map.settings.size*(map.matrix.length) - this.size)

        let outside = nx != pos.x || ny != pos.y
        pos.x = nx
        pos.y = ny
        return outside
    }

    this.lookAt = function( angle ){
        let vecAngle = p5.Vector.fromAngle( angle )
        let point = this.pos.copy().add(vecAngle)

        let distance = 0
        while( !map.collide( point ) && distance < 200 && !this.constrain(point) ){
            point.add(vecAngle)
            distance++
        }
        if( this.constrain(point) ){
            distance = 200
        }
        fill('red')
        noStroke()
        circle( 5 + point.x, 5 + point.y, 3 )
        stroke( 'rgba(255,255,255,0.5)' )
        line( 5 + this.pos.x, 5+ this.pos.y, 5+ point.x, 5+point.y )
        let a = this.angleVision - angle
        distance *= cos(a)

        return distance
        
    }

    this.update = function ( mouseVar, raycastingRender ){
        this.angleVision += mouseVar * 0.01

        var vision = []
        for (let i = this.angleVision-this.pov/2; i < this.angleVision + this.pov/2; i+=0.05) { 
            vision.push(this.lookAt( i ))
        }

        renderText = ''
        for (let j = 0; j < rcHeight; j++) {

            for (let i = 0; i < rcWidth; i++) {
                let barHeightIndex = floor( vision.length * i / rcWidth )
                let barDistance = vision[barHeightIndex]
                let barHeight = rcHeight - floor( barDistance * rcHeight / 100)
                let barHeightRange = [ 
                    floor( rcHeight/2 ) - floor( barHeight/2 ),
                    floor( rcHeight/2 ) + floor( barHeight/2 )
                ] 

                if( barHeightRange[0] < j && j < barHeightRange[1] ){
                    let charIndex = floor(density.length*barDistance/100)
                    let thisChar = density[charIndex]
                    renderText += thisChar == ' ' ? '&nbsp;' : thisChar
                } else {
                   renderText += '&nbsp;'
                }


            }
            
            renderText += '<br/>'
        }

        raycastingRender.html( renderText )
    }
}
