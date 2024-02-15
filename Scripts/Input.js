
const keys = {};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    keys[event.key] = true;
}

function handleKeyUp(event) {
    keys[event.key] = false;
}

export function GetMovementDirection() {
    if (keys['z']) {
        return 'up';
    } else if (keys['q']) {
        return 'left';
    } else if (keys['s']) {
        return 'down';
    } else if (keys['d']) {
        return 'right';
    } else if (keys[' ']) {
        return 'placeBomb';
    } else {
        return 'none';
    }
}