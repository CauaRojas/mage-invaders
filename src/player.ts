
class Bullet {
    public dy = 0;
    public friction = 0.4;
    public height = 5;
    public width = 5;
    constructor(public x: number, public y: number) {}
}


export class Player {
    public x: number;
    public y: number;
    public dx: number;
    public friction: number;
    public height: number;
    public width: number;
    public enemies = [];
    public bullets: Bullet[] = [];
    constructor(canvas: HTMLCanvasElement) {
        this.x = 50;
        this.y = canvas.height - 100;
        this.dx = 0;
        this.friction = .9;
        this.height = 50;
        this.width = 30;
    }
    updatePlayerX() {
        this.dx *= this.friction;
        this.x += this.dx;
    }
    updateBulletsY(){
        this.bullets.forEach((bullet, i) => {
            bullet.dy += bullet.friction;
            bullet.y -= bullet.dy;
            if(bullet.y < 0) {
                this.bullets.splice(i, 1);
            }
        });
    }
    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }
}
