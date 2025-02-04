


const carrossel = document.querySelector(".carrossel")
const imgs = document.querySelectorAll(".carrossel img")

let count = 0

function slider() {
    count += 1

    if (count > imgs.length - 1) {
        count = 0
    }

    carrossel.style.transform = `translateX(${-count * 100}%)`
}

setInterval(slider, 5000)