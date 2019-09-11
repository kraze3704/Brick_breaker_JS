
let _CANVAS, _CANVAS_CONTEXT;
const _FPS = 30;

let _ballX, _ballY, _ballRadius = 10;
let _ballSpeedX, _ballSpeedY;

let _paddleX, _paddleY, _paddleHeight = 15, _paddleWidth = 150;

window.onload = () => {
    _CANVAS = document.getElementById('gameCanvas');
    _CANVAS_CONTEXT = _CANVAS.getContext('2d');

    _resetBall(); // places the ball at the center of canvas with speed (0,6)

    _paddleX = (_CANVAS.width - _paddleWidth) / 2;
    _paddleY = _CANVAS.height * 0.9;

    _CANVAS.addEventListener('mousemove', function(evt) {
        let mousePos = calculateMousePos(evt);
        _paddleX = mousePos.x - (_paddleWidth/2);
    });

    setInterval(function(){
        _DrawAll();
        _MoveAll();
    }, 1000 / _FPS );
}

calculateMousePos = (evt) => {
    let rect = _CANVAS.getBoundingClientRect(), root = document.documentElement;

    // account for margins, canvas position on page, scroll amount etc.
    let _mouseX = evt.clientX - rect.left - root.scrollLeft;
    let _mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: _mouseX,
        y: _mouseY
    };
}

_RectFilled = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    _CANVAS_CONTEXT.fillStyle = fillColor;
    _CANVAS_CONTEXT.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}  // draw a filled rectangle starting from (x,y) with fillcolor

_ballFilled = (centerX, centerY, radius, fillColor) => {
    _CANVAS_CONTEXT.fillStyle = fillColor;
    _CANVAS_CONTEXT.beginPath();
    _CANVAS_CONTEXT.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    _CANVAS_CONTEXT.fill();
}  // draw a filled circle at (x,y)

_resetBall = () => {

    _ballX = _CANVAS.width / 2;
    _ballY = _CANVAS.height / 2;

    _ballSpeedX = 0;
    _ballSpeedY = 6;

}

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

_MoveAll = () => {

    _Collision();

    _ballX += _ballSpeedX;
    _ballY += _ballSpeedY;
}

_DrawAll = () => {
    _RectFilled(0, 0, 800, 600, '#000000'); // fills the background with black 800 x 600

    _RectFilled(_paddleX, _paddleY, _paddleWidth, _paddleHeight, '#FFFFFF');

    _ballFilled(_ballX, _ballY, _ballRadius, '#FFFFFF');
}