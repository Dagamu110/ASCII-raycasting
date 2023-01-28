function targetOptions( pos ){
    return [
            {
                angle: 0,
                pos: pos.copy().add(1,0),
                char: '-',
                msg: 'b'

            }, 
            {
                angle: PI/4,
                pos: pos.copy().add(1,1),
                char: '\\',
                msg: 'u'

            },
            {
                angle: PI/2,
                pos: pos.copy().add(0,1),
                char: '|',
                msg: 'b'

            },
            {
                angle: 3*PI/4,
                pos: pos.copy().add(-1,1),
                char: '/' ,
                msg: 'g'
           },
            {
                angle: PI,
                pos: pos.copy().add(-1,0),
                char: '-',
                msg: 'b'

            },
            {
                angle: 5*PI/4,
                pos: pos.copy().add(-1,-1),
                char: '\\',
                msg: 'h'

            },
            {
                angle: 3*PI/2,
                pos: pos.copy().add(0,-1),
                char: '|',
                msg: 'b'

            },
            {
                angle: 7*PI/4,
                pos: pos.copy().add(1,-1),
                char: '/',
                msg: 'a'
            }
        ]

}
