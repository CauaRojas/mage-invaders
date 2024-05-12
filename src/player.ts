import { canvas } from "./main";

export const player = {
    y: canvas.height - 100,
    x: 50,
    dx: 0,
    friction: 0.9,
    height: 50,
    width: 50,
};

export type TPlayer = typeof player;

export function updatePlayerX(player: TPlayer) {
    player.dx *= player.friction;
    player.x += player.dx;
}

