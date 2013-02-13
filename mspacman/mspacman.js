function render() {
    canvas = document.getElementById("simple");
    ctx = canvas.getContext('2d');
    img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 321, 1, 464, 134, 0, 0, 464, 134); // Background
        ctx.drawImage(img, 82, 23, 14, 15, 232, 100, 14, 15); // Ms. Pacman
        ctx.drawImage(img, 82, 123, 16, 16, 232, 50, 16, 16); // Ghost
    };
    img.src = 'pacman10-hp-sprite.png';    
}