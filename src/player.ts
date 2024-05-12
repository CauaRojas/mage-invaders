export class Player{
    public x: number;
    public y: number;
    public dx: number;
    public friction: number;
    public height: number;
    public width: number;
    constructor(canvas: HTMLCanvasElement){
        this.x = 50;
        this.y = canvas.height - 100;
        this.dx = 0;
        this.friction = 0.9;
        this.height = 50;
        this.width = 50;
    }
    updatePlayerX(){
        this.dx *= this.friction;
        this.x += this.dx;
    }
}


