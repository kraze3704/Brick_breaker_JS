_paddleCollision = () => {

    if(_ballSpeedY > 0) { // paddle collision will only happen when the ball is moving downwards
        _ballSpeedY *= -1;

        let _ballSpeedX_Mod = _ballX - _paddleX - (_paddleWidth/2);

        _ballSpeedX = _ballSpeedX_Mod/10;
    }
}

_Collision = () => {

    if( _ballX + _ballRadius > _CANVAS.width ) {
        _ballSpeedX *= -1;
    }else if( _ballX - _ballRadius < 0 ) {
        _ballSpeedX *= -1;
    }  // collision check for left and right wall

    if( _ballY + _ballRadius > _CANVAS.height * 0.9) {  // _ballRadius added for more accurate collision

        if( _ballX > _paddleX && _ballX < _paddleX + _paddleWidth) {
            _paddleCollision();
        }

    } // before reaching the edge, check for paddle collision and run the code if the ball is in contact with paddle

    if( _ballY > _CANVAS.height ) {
        _resetBall();

    }else if( _ballY - _ballRadius < 0 ) {
        _ballSpeedY *= -1;
    }  // ball bounces off the top of the canvas, and resets if it hits the bottom of the canvas
}

export default _Collision;