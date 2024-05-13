class Bullet {
    public dy = 0;
    public friction = 0.4;
    public height = 5;
    public width = 5;
    constructor(
        public x: number,
        public y: number,
    ) { }
}
class Enemy {
    public dy = 0;
    public friction = 0.9;
    public height = 50;
    public width = 30;
    public speed = 0.05;
    constructor(
        public x: number,
        public y: number,
    ) { }
}

export class Player {
    public x: number;
    public y: number;
    public dx: number;
    public friction: number;
    public height: number;
    public width: number;
    public enemies: Enemy[] = [];
    public bullets: Bullet[] = [];
    private _gameover = false;
    public get gameover() {
        return this._gameover;
    }
    static isColliding(
        a: { x: number; y: number; width: number; height: number },
        b: { x: number; y: number; width: number; height: number },
    ) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
    constructor(private canvas: HTMLCanvasElement) {
        this.x = canvas.width / 2 - 15;
        this.y = canvas.height - 100;
        this.dx = 0;
        this.friction = 0.9;
        this.height = 50;
        this.width = 30;
    }
    updatePlayerX() {
        this.dx *= this.friction;
        this.x += this.dx;
    }
    updateBulletsY() {
        this.bullets.forEach((bullet, i) => {
            bullet.dy += bullet.friction;
            bullet.y -= bullet.dy;
            this.enemies.forEach((enemy, j) => {
                if (Player.isColliding(bullet, enemy)) {
                    this.enemies.splice(j, 1);
                    this.bullets.splice(i, 1);
                }
            });
            if (bullet.y < 0) {
                this.bullets.splice(i, 1);
            }
        });
    }
    updateEnemiesY() {
        this.enemies.forEach((enemy) => {
            enemy.dy += enemy.speed;
            enemy.dy *= enemy.friction;
            enemy.y += enemy.dy;
            if (Player.isColliding(this, enemy)) {
                this._gameover = true;
            }
            if (enemy.y > this.canvas.height) {
                this._gameover = true;
            }
        });
        console.log(this.enemies, this.bullets);
    }
    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }
    spawnEnemy() {
        this.enemies.push(new Enemy(Math.random() * (this.canvas.width - 30), 0));
    }
}
