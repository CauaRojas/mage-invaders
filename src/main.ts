import { Player } from "./player";

export const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") || new CanvasRenderingContext2D();

canvas.width = 800;
canvas.height = 600;

const player = new Player(canvas);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        player.dx += 1;
    } else if (e.key === "ArrowLeft") {
        player.dx -= 1;
    }
});

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply friction and move player
    player.updatePlayerX()

    // Draw player
    ctx.fillStyle = "#FFBA00";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(main);
}

requestAnimationFrame(main);



