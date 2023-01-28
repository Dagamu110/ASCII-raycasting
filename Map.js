function Map( settings=false ){

    this.settings = settings ? settings : {
        matrixMode: false,
        size: 10
    }

    this.matrixSize = 1
    this.matrixChars = {
        0: '&nbsp;',
        1: '#'
    }
    this.matrix = [
        [ 1, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
        [ 0, 0, 1, 0, 0, 0, 1, 1, 1, 1 ],
        [ 0, 1, 1, 0, 0, 0, 0, 0, 1, 1 ],
        [ 0, 1, 1, 1, 1, 0, 0, 0, 1, 1 ],
        [ 0, 1, 1, 1, 1, 0, 1, 0, 1, 1 ],
        [ 0, 1, 1, 1, 1, 0, 0, 0, 1, 1 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
        [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    ]

    this.renderASCII = function( div, player ){
        let sep = "_".repeat( this.matrix[0].length*this.matrixSize +2)
        let playerPos = createVector(
            floor( player.pos.x / this.settings.size ),
            floor( player.pos.y / this.settings.size )
        ) 
        let playerAngle = player.angleVision

        while( playerAngle > 2*PI ){
            playerAngle -= 2*PI
        }
        while( playerAngle < 0 ){
            playerAngle += 2*PI
        }
        
        let closest = { angle: Infinity }
        targetOptions( playerPos ).forEach( op => {
            let deltaOp = abs(op.angle - playerAngle)  
            let deltaC = abs(closest.angle - playerAngle)
            closest = deltaOp < deltaC ? op : closest
        } )

        let asciiText = sep + '<br>'

        this.matrix.forEach( (row, i) => {
            let newRow = '|'
            row.forEach( ( sp, j ) => {
                let newChar
                if( i == playerPos.y && j == playerPos.x){
                   newChar = 'o' 
                } else if( i == closest.pos.y && j == closest.pos.x ) {
                   newChar = closest.char 
                } else {
                    newChar = this.matrixChars[sp].repeat( this.matrixSize ) 
                }
                newRow += newChar
            } )
            
            baseRow = newRow
            new Array( this.matrixSize - 1 ).fill(0).forEach( () => {
                newRow += '|<br/>' + baseRow 
            })

            asciiText += newRow + '|<br/>' 
            if( i == this.matrix[0].length - 1){
                asciiText += "¯".repeat( sep.length )
            } 
        } )

        div.html( asciiText )

    }

    this.drawCanvas = function ( margin, size ){
        this.matrix.forEach( (row, i) => {
            row.forEach( (sp, j) => {
                push()
                noStroke()
                let color = sp ? [255] : 'rgba(255, 255, 255, 0.15 )' 
                let size = this.settings.size
                fill(color)
                rect( margin + j * size, margin + i * size, size, size  )
                pop()
            } )
        } )
    }

    this.collide = function( pos ){
        let yIndex = floor(pos.y / this.settings.size)
        let xIndex = floor( pos.x / this.settings.size ) 
        if( yIndex > this.matrix.length - 1 || xIndex > this.matrix[0].length - 1 ){
            return 1
        }
        return this.matrix[ yIndex ][ xIndex ]
    }

}
