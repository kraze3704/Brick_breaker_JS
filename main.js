
let _CANVAS, _CANVAS_CONTEXT;
const _FPS = 30;

let _ballX = 400, _ballY = 300, _ballRadius = 10;
let _ballSpeedX = 6, _ballSPeedY = 6;

window.onload = () => {
    _CANVAS = document.getElementById('gameCanvas');
    _CANVAS_CONTEXT = _CANVAS.getContext('2d');

    setInterval(function(){
        _DrawAll();
        _MoveAll();
    }, 1000 / _FPS );
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

_wallCollision = () => {

    if( _ballX + _ballRadius > _CANVAS.width ) {
        _ballSpeedX *= -1;
    }else if( _ballX - _ballRadius < 0 ) {
        _ballSpeedX *= -1;
    }  // collision check for left and right wall

    if( _ballY + _ballRadius > _CANVAS.height ) {
        _ballSPeedY *= -1;
    }else if( _ballY - _ballRadius < 0 ) {
        _ballSPeedY *= -1;
    }
}

_MoveAll = () => {

    _wallCollision();
    
    _ballX += _ballSpeedX;
    _ballY += _ballSPeedY;
}

_DrawAll = () => {
    _RectFilled(0, 0, 800, 600, '#000000'); // fills the background with black 800 x 600

    _ballFilled(_ballX, _ballY, _ballRadius, '#FFFFFF');
}