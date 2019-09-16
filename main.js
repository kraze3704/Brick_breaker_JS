
import _Collision from './collision';

let _CANVAS, _CANVAS_CONTEXT;
const _FPS = 30;

let _ballX, _ballY, _ballRadius = 10;
let _ballSpeedX, _ballSpeedY;

let _paddleX, _paddleY, _paddleHeight = 15, _paddleWidth = 150;

const BRICK_WIDTH = 80, BRICK_HEIGHT = 20, BRICK_GAP = 2, BRICK_COLS = 10, BRICK_ROWS = 14;
// collision width&height of the brick, visiual gap, number of columns and rows
let BRICK_GRID = new Array(BRICK_COLS * BRICK_ROWS);

window.onload = () => {
    _CANVAS = document.getElementById('gameCanvas');
    _CANVAS_CONTEXT = _CANVAS.getContext('2d');

    _resetBall(); // places the ball at the center of canvas with speed (0,6)
    _ResetBricks();

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

_MoveAll = () => {

    _Collision();

    _ballX += _ballSpeedX;
    _ballY += _ballSpeedY;
}

_ResetBricks = () => {
    for(i=0 ; i < BRICK_COLS ; i++){
        for(j=0 ; j < BRICK_ROWS ; j++){
            if(Math.random() > 0.5) {
                BRICK_GRID[BRICK_COLS*j + i] = true;
            }else {
                BRICK_GRID[BRICK_COLS*j + i] = false;
            }
            //console.log(`${i}, ${j} : ${BRICK_GRID[BRICK_COLS*j + i]}`)
            //console.log(`BRICK_COLS*j + i = ${BRICK_COLS*j + i}`)
        }
    };
    //console.dir(BRICK_GRID);
}

_DrawBricks = () => {
    for(col=0 ; col < BRICK_COLS ; col++) {  // for each column
        for(row=0 ; row < BRICK_ROWS ; row++) {  // for each row in that column

            if(BRICK_GRID[BRICK_COLS * row + col]){ // check if the brick is still there

                // calculate the coordinates where each brick will be in
                let BrickTopLeftX = col * BRICK_WIDTH;
                let BrickTopLeftY = row * BRICK_HEIGHT;
                // defined constant BRICK_GAP is used to add a margin around the brick for better visibilty
                _RectFilled(BrickTopLeftX + BRICK_GAP, BrickTopLeftY + BRICK_GAP, BRICK_WIDTH -(BRICK_GAP*2), BRICK_HEIGHT -(BRICK_GAP*2), 'cyan');
                
            }else{} // if the grid value is false brick is not drawn

        } // end of row
    } // end of column
}

_DrawAll = () => {
    _RectFilled(0, 0, 800, 600, '#000000'); // fills the background with black 800 x 600

    _DrawBricks(); // draws the set of bricks

    _RectFilled(_paddleX, _paddleY, _paddleWidth, _paddleHeight, '#FFFFFF');

    _ballFilled(_ballX, _ballY, _ballRadius, '#FFFFFF');
}