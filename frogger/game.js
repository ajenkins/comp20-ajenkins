function start_game() {
    // Canvas
    width = 399;
    height = 600;
    
    // Frogger
    frogSprite = new Object();
    frogSprite.x = 11;
    frogSprite.y = 335;
    frogSprite.width = 22;
    frogSprite.height = 22;
    init_frogX = width/2 - frogSprite.width/2;
    frogX = init_frogX; // Current X
    frogY = height-100; // Current Y
    hop = 33; // Hop distance
    farthest = 0; // Farthest number of hops
    hopsUp = 0; // Number of hops "up" from start
    
    // Logs short
    log_short = new Object();
    log_short.srcX = 7;
    log_short.srcY = 231;
    log_short.width = 84;
    log_short.height = 21;
    log_short.x = 150;
    log_short.y = 150;
    log_short.velocity = 3;
    log_short2 = jQuery(true, {}, log_short);
    log_short3 = jQuery(true, {}, log_short);
    log_short2.x = 50;
    log_short3.x = 250;
    logs_short = [log_short, log_short2, log_short3];
    
    // Cars yellow
    car_yellow = new Object();
    car_yellow.srcX = 82;
    car_yellow.srcY = 265;
    car_yellow.width = 25;
    car_yellow.height = 24;
    car_yellow.x = 150;
    car_yellow.y = 460;
    car_yellow.velocity = -2;
    car_yellow2 = jQuery.extend(true, {}, car_yellow);
    car_yellow2.x = 50;
    car_yellow3 = jQuery.extend(true, {}, car_yellow);
    car_yellow3.x = 250;
    cars_yellow = [car_yellow, car_yellow2, car_yellow3];
    
    // Cars tractor
    car_tractor = jQuery.extend(true, {}, car_yellow);
    car_tractor.srcX = 74;
    car_tractor.srcY = 301;
    car_tractor.width = 23;
    car_tractor.height = 21;
    car_tractor.x = 50;
    car_tractor.y = 430
    car_tractor.velocity = 3;
    car_tractor2 = jQuery.extend(true, {}, car_tractor);
    car_tractor3 = jQuery.extend(true, {}, car_tractor);
    car_tractor2.x = 150;
    car_tractor3.x = 250;
    cars_tractor = [car_tractor, car_tractor2, car_tractor3];
    
    // Cars purple
    car_purple = new Object();
    car_purple.srcX = 9;
    car_purple.srcY = 267;
    car_purple.width = 27;
    car_purple.height = 20;
    car_purple.x = 0;
    car_purple.y = 400;
    car_purple.velocity = -3;
    car_purple2 = jQuery.extend(true, {}, car_purple);
    car_purple3 = jQuery.extend(true, {}, car_purple);
    car_purple2.x = 100;
    car_purple3.x = 200;
    cars_purple = [car_purple, car_purple2, car_purple3];

    // Cars white
    car_white = new Object();
    car_white.srcX = 47;
    car_white.srcY = 264;
    car_white.width = 27;
    car_white.height = 25;
    car_white.x = 0;
    car_white.y = 365;
    car_white.velocity = 3;
    car_white2 = jQuery.extend(true, {}, car_white);
    car_white3 = jQuery.extend(true, {}, car_white);
    car_white2.x = 100;
    car_white3.x = 200;
    cars_white = [car_white, car_white2, car_white3];
    
    // Cars truck
    car_truck = new Object();
    car_truck.srcX = 106;
    car_truck.srcY = 303;
    car_truck.width = 46;
    car_truck.height = 18;
    car_truck.x = 50;
    car_truck.y = 340;
    car_truck.velocity = -3;
    car_truck2 = jQuery.extend(true, {}, car_truck);
    car_truck.x = 200;
    cars_truck = [car_truck, car_truck2];
    
    // All cars
    all_cars = new Array();
    all_cars.push.apply(all_cars, cars_yellow);
    all_cars.push.apply(all_cars, cars_tractor);
    all_cars.push.apply(all_cars, cars_purple);
    all_cars.push.apply(all_cars, cars_white);
    all_cars.push.apply(all_cars, cars_truck);
    
    // Scoring
    lives = 3;
    level = 1;
    score = 0;
    highscore = 0;
    
    // Miscellaneous
    date = new Date();
    startTime = date.getTime();

    // Globals for drawing
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    img = new Image();
    imgLoaded = false;
    img.src = 'assets/frogger_sprites.png';
    img.onload = function() {
        imgLoaded = true;
    }
    
    addListeners();
    gameLoop();
}

function levelUp() {
    frogX = init_frogX;
    frogY = height-100;
    hopsUp = 0;
    farthest = 0;
    if (level % 5 == 0) {
        score += 1000;
    }
    else { score += 50; }
    level += 1;
}

function moveFrog(dir) {
    switch (dir) {
        case "left":
            frogSprite.x = 81;
            frogSprite.y = 336;
            if (frogX > 22) { frogX -= hop; }
            break;
        case "up":
            frogSprite.x = 12;
            frogSprite.y = 367;
            if (frogY > 22) {
                frogY -= hop;
                hopsUp++;
                if (hopsUp > farthest) {
                    farthest = hopsUp;
                    score += 10;
                }
            }
            else {
                levelUp();
            }
            break;
        case "right":
            frogSprite.x = 11;
            frogSprite.y = 335;
            if (frogX < width - 40) { frogX += hop; }
            break;
        case "down":
            if (hopsUp > 0) hopsUp--;
            frogSprite.x = 81;
            frogSprite.y = 365;
            if (frogY < height - 100) { frogY += hop; }
            break;
    }
}

function gameSeconds() {
    return (getTime() - startTime) / 1000;
}

function renderGame() {
    
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
    ctx.fillText('Highscore: ' + highscore, 100, height-40);
    
    // Images
    if (imgLoaded) {
        // Header - "Frogger"
        ctx.drawImage(img, 0, 0, 399, 54, 0, 0, 399, 54);
        
        // Purple roadsides
        ctx.drawImage(img, 0, 122, 399, 34, 0, 295, 399, 34);
        ctx.drawImage(img, 0, 122, 399, 34, 0, 490, 399, 34);
        
        // Lives
        for (i=0; i<lives; i++) {
            ctx.drawImage(img, 13, 336, 17, 22, 25*i, height-75, 17, 22);
        }
                      
        // Logs
        drawObject(log_short);
        
        // Froggy
        ctx.drawImage(img, frogSprite.x, frogSprite.y, 
                      frogSprite.width, frogSprite.height,
                      frogX, frogY, frogSprite.width, frogSprite.height);
        
        // Cars
        for (var i = 0; i < cars_yellow.length; i++)
            drawObject(cars_yellow[i]);
        for (var i = 0; i < cars_tractor.length; i++)
            drawObject(cars_tractor[i]);
        for (var i = 0; i < cars_purple.length; i++)
            drawObject(cars_purple[i]);
        for (var i = 0; i < cars_white.length; i++)
            drawObject(cars_white[i]);
        for (var i = 0; i < cars_truck.length; i++)
            drawObject(cars_truck[i]);
    }
    else {
        console.log("Error: could not load sprite sheet.");
    }
    
}

function addListeners() {
    // Use arrow keys to move froggy
    $(document).keydown(function(event) {
        switch (event.which) {
            // Left
            case 37:
                moveFrog("left");
                break;
            // Up
            case 38:
                event.preventDefault();
                moveFrog("up");
                break;
            // Right
            case 39:
                moveFrog("right");
                break;
            // Down
            case 40:
                event.preventDefault();
                moveFrog("down");
                break;
            // Space bar
            case 32:
                event.preventDefault();
                isGameover = true;
                break;
        } 
    });
}

function drawObject(obj) {
    ctx.drawImage(img, obj.srcX, obj.srcY, 
                       obj.width, obj.height, 
                       obj.x, obj.y, 
                       obj.width, obj.height);
}

function moveObject(obj) {
    if (obj.velocity > 0) {
        if (obj.x < width + obj.width) {
            obj.x += obj.velocity;
        }
        else {
            obj.x = - obj.width;
        }
    }
    else if (obj.velocity < 0) {
        if (obj.x > - obj.width) {
            obj.x += obj.velocity;
        }
        else {
            obj.x = width + obj.width;
        }
    }
}

function isFrogOverlapping (obj) {
    if (((frogX + frogSprite.width)  > obj.x)  && 
        ((frogY + frogSprite.height) > obj.y) &&
         (frogX < (obj.x + obj.width)) &&
         (frogY < (obj.y + obj.height)))
    {
        return true;
    }
    else if (( frogX < (obj.x + obj.width))         &&
            (( frogY + frogSprite.height) > obj.y) &&
            ((frogX + frogSprite.width) > obj.x)   &&
              (frogY < (obj.y + obj.height)))
    {
        return true;
    }
    // Frog past bottom-left corner
    else { return false; }
}

function killFrog() {
    frogSprite.x = 264;
    frogSprite.y = 371;
    frogSprite.width = 19;
    frogSprite.height = 26;
    clearInterval(timer);
    setTimeout(resetFrog, 1000);
}

function resetFrog() {
    frogX = init_frogX;
    frogY = height-100;
    frogSprite.x = 11;
    frogSprite.y = 335;
    frogSprite.width = 22;
    frogSprite.height = 22;
    lives--;
    // Game Over
    if (lives == 0) {
        lives = 3;
        level = 1;
        if (score > highscore)
            highscore = score;
        score = 0;
        date = new Date();
        startTime = date.getTime();
    }
    date = new Date();
    startTime = date.getTime();
    gameLoop();
}

function updateGame() {
    moveObject(log_short);
    for (var i = 0; i < all_cars.length; i++) {
        moveObject(all_cars[i]);
        if (isFrogOverlapping(all_cars[i]))
            killFrog();
    }
    renderGame();
}

function gameLoop() {
    timer = setInterval(updateGame, 33);
}

