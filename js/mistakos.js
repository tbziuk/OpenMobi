const chairs = document.querySelectorAll('.chair');
const pileOfChairs = document.getElementById('pile-of-chairs');

const finalText = document.getElementById('copy2');
const selectChairText = document.getElementById('copy3');
const goodJobText = document.getElementById('copy4');

const fPage = document.getElementById('page1');
const sPage = document.getElementById('page2');

let startX, startY, currentX, currentY;
let isMoved = false;

chairs.forEach((chair) => {
    chair.addEventListener('touchstart', (event) => {
        if (isMoved) { return }

        startX = event.touches[0].screenX;
        startY = event.touches[0].screenY;
        currentX = startX;
        currentY = startY;
        chairs.forEach((chair) => {
            chair.style.animationName = 'none';
        });
    });

    chair.addEventListener('touchmove', (event) => {
        if (isMoved) { return }

        event.preventDefault();
        currentX = event.touches[0].screenX;
        currentY = event.touches[0].screenY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        chair.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        isOverChairs(chair, pileOfChairs);
    });

    chair.addEventListener('touchend', () => {
        if (isMoved) { return }
        isMoved = true;

        if (isOverChairs(chair, pileOfChairs)) {
            finalText.className += " final-animation";
            selectChairText.className += " final-animation";
            goodJobText.className += " final-animation";

            chairs.forEach((exactChair) => {
                if (exactChair !== chair) exactChair.className += " final-animation";
            });

            setTimeout((() => {
                fPage.className += "final-page";
                sPage.className += "final-page";
            }), 5000);
        } else {
            chair.style.transform = `translate(0px, 0px)`;
            isMoved = false;

            chairs.forEach((chair) => {
                chair.style.animationName = '';
            });
        }
    });
});

const isOverChairs = (a, b) => {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    let imageURL = a.firstChild.src;

    var isInRange = (((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width)));

    if (!isInRange) {
        if (!imageURL.includes('shine.png')) {
            let newImageURL = imageURL.substring(0, imageURL.length - 4);
            newImageURL += "_shine.png";
            a.firstChild.src = newImageURL;
        } return true;
    } else {
        if (imageURL.includes('shine.png')) {
            let newImageURL = imageURL.substring(0, imageURL.length - 10);
            newImageURL += ".png";
            a.firstChild.src = newImageURL;
        } return false;
    }
}