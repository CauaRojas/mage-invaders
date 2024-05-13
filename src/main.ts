import { Player } from "./player";

export const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") || new CanvasRenderingContext2D();

canvas.width = 800;
canvas.height = 600;

let player: Player | null = null;
let backup: Player | null = null;
const createNewPlayer = (e: MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    button.textContent = "Restart";
    button.blur();
    player = new Player(canvas);
    main();
};
(document.querySelector(".start") as HTMLButtonElement).addEventListener(
    "click",
    createNewPlayer,
);
(document.querySelector(".pause") as HTMLButtonElement).addEventListener(
    "click",
    (e) => {
        const button = e.target as HTMLButtonElement;
        if (button.textContent === "Pause") {
            backup = player;
            player = null;
            button.textContent = "Resume";
        } else {
            player = backup;
            backup = null;
            button.textContent = "Pause";
            main();
        }
        button.blur();
    },
);
(document.querySelector(".end") as HTMLButtonElement).addEventListener(
    "click",
    () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player = null;
    },
);

document.addEventListener("keydown", (e) => {
    if (!player) {
        return;
    }
    if (e.key === "ArrowRight") {
        player.dx += 1;
    } else if (e.key === "ArrowLeft") {
        player.dx -= 1;
    }

    if (e.key === " ") {
        player.shoot();
    }
});

let frame = 0;
let timeBetweenEnemies = 120;
function main() {
    if (!player) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply friction and move player
    player.updatePlayerX();
    player.updateBulletsY();
    player.updateEnemiesY();

    // Draw player
    ctx.fillStyle = "#FFBA00";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    ctx.fillStyle = "#FF0000";
    player.bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw enemies
    ctx.fillStyle = "#4FFF00";
    player.enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
    frame++;
    if (frame % timeBetweenEnemies === 0) {
        player.spawnEnemy();
        timeBetweenEnemies -= 0.5;
        if (timeBetweenEnemies < 80) {
            timeBetweenEnemies = 80;
        }
    }

    if (!player.gameover) {
        requestAnimationFrame(main);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }
}
