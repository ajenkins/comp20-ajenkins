function start_game() {
    width = 399;
    height = 600;
    
    frogX = width/2;
    frogY = height-100;
    frogSprite = new Object();
    frogSprite.x = 13;
    frogSprite.y = 336;
    frogSprite.width = 17;
    frogSprite.height = 22;
    
    lives = 3;
    level = 1;
    score = 0;
    highscore = 0;
    
    isGameover = false;
    date = new Date();
    startTime = date.getTime();
    
    vehicleLocations = [];
    logLocations = [];
    vehicleSpeed = 0.0;
    logSpeed = 0.0;
    
    renderGame();
}

function gameSeconds() {
    return (getTime() - startTime) / 1000;
}

function renderGame() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    
    // Water
    ctx.fillStyle = '#191970';
    ctx.fillRect(0, 0, 399, 300);
    
    // Road
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 300, 399, 300);
    
    // Level
    ctx.fillStyle = '#0f0';
    ctx.font = "16pt Arial";
    ctx.fillText("Level " + level, 75, height-60);
        
    // Score + High Score
    ctx.font = '12pt Arial';
    ctx.fillText('Score: ' + score, 0, height-40);
    ctx.fillText('Highscore: ' + highscore, 75, height-40);
    
    // Images
    img = new Image();
    img.onload = function() {
        // Header - "Frogger"
        ctx.drawImage(img, 0, 0, 399, 54, 0, 0, 399, 54);
        
        // Purple roadsides
        ctx.drawImage(img, 0, 122, 399, 34, 0, 295, 399, 34);
        ctx.drawImage(img, 0, 122, 399, 34, 0, 490, 399, 34);
        
        // Lives
        for (i=0; i<lives; i++) {
            ctx.drawImage(img, 13, 336, 17, 22, 25*i, height-75, 17, 22);
        }
        
        // Froggy
        ctx.drawImage(img, frogSprite.x, frogSprite.y, 
                      frogSprite.width, frogSprite.height,
                      frogX, frogY, frogSprite.width, frogSprite.height);
                      
        // Logs
        ctx.drawImage(img, 7, 231, 84, 21, 150, 150, 84, 21);
        
        // Cars
        ctx.drawImage(img, 82, 265, 25, 24, 150, 350, 25, 24);
    }
    img.src = 'assets/frogger_sprites.png';
}


