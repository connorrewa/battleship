const Ship = (newLength) => {
    const length = newLength;
    let hitCount = 0;
    let sunk = false;

    const hit = () => {
        hitCount++;
        return isSunk();
    }

    const isSunk = () => {
        if(hitCount == length) {
            sunk = true;
            return sunk;

        }

        return false;
    }

    const getLength = () => {
        return length;
    }

    return {
        hit,
        isSunk,
        getLength
    }
}

export default Ship;