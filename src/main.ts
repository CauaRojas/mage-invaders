const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") || new CanvasRenderingContext2D();

ctx.fillStyle = "red";
canvas.width = 800;
canvas.height = 600;

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(50, 50, 100, 100); 

    requestAnimationFrame(main);
}

requestAnimationFrame(main);
