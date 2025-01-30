function weigh(balls) {
    if (balls.length % 2)
        return weigh(balls.slice(1, balls.length));
    if (sum(balls.slice(l, r / 2)) - sum(balls.slice(r / 2, r)) == 0)
        return 0;
    weigh(balls.slice, l, r / 2);
    weigh(balls, r / 2, r - 1);
}

const elem = document.createElement('link')