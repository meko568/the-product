let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let num = document.querySelector(".p-m span");
let add = document.querySelector(".add span")
let images = document.querySelectorAll(".images img")
let next = document.createElement("img");
let back = document.createElement("img");
let remove = document.createElement("img");
remove.src = "images/icon-close.svg";
remove.className = "remove";
let check = document.querySelector(".theimg");
let cart = document.querySelector(".sel");
let the = document.querySelector(".sel div:nth-child(2)")
check.onclick = function () {
    cart.classList.toggle("dis");
}
images.forEach(function (e) {
    e.onclick = function () {
        const scale = document.createElement("div");
        next.className = "next button";
        next.src = "images/icon-next.svg"
        back.className = "back button";
        back.src = "images/icon-next.svg"
        if (e.parentElement.classList[0] === "images") {
            scale.innerHTML = e.parentElement.innerHTML
        } else {
            scale.innerHTML = e.parentElement.parentElement.innerHTML
        }
        scale.appendChild(next)
        scale.appendChild(remove)
        scale.appendChild(back)
        scale.classList.add("scale");
        document.body.appendChild(scale)
        scale.children[0].src = e.src
        scale.children[0].dataset.num = e.dataset.num;
        document.querySelector(".main").classList.add("toscale")
    }
})
next.onclick = function () {
    let the = +document.querySelector(".scale img").dataset.num;
    if (the === 3) {

    } else {
        document.querySelector(".scale img").dataset.num = the + 1;
        document.querySelector(".scale img").src = document.querySelector(`.scale .img-${the + 1}`).src;
    }
}
back.onclick = function () {
    let the = +document.querySelector(".scale img").dataset.num;
    if (the === 0) {

    } else {
        document.querySelector(".scale img").dataset.num = the - 1;
        document.querySelector(".scale img").src = document.querySelector(`.scale .img-${the - 1}`).src;
    }
}
remove.onclick = function () {
    remove.parentElement.remove()
    document.querySelector(".main").classList.remove("toscale")
}

plus.onclick = function () {
    num.innerHTML = +num.innerHTML + 1
    minus.classList.remove("min0");
    add.innerHTML = "Added To cart";
    add.parentElement.classList.add("added")
    if (num.innerHTML === "0") {
        the.innerHTML = "your cart is empty"
        if (document.querySelector(".check")) {
            document.querySelector(".check").remove()
        }
    } else {
        if (cart.children.length !== 3) {
            let btn = document.createElement("button");
            btn.className = "check";
            btn.innerHTML = "checkout";
            cart.appendChild(btn);
        }
        the.innerHTML = `    <img src="images/image-product-1-thumbnail.jpg">
    <div class="info">
        <div class="disc">
            <p>Fall Limited Edition Sneaker</p>
        </div>
        <div class="price"><span>$125.00</span>x $<span>${num.innerHTML}</span>    <span>$${+num.innerHTML * 125}.00</span></div>
    </div>
    <img src="images/icon-delete.svg" class="del">`;
        document.querySelector(".del").onclick = function () {
            console.log(this)
            num.innerHTML = 0;
            the.innerHTML = "your cart is empty"
            document.querySelector(".check").remove()
        }
    }
    document.querySelector(".num").innerHTML = num.innerHTML
}
minus.onclick = function () {
    if (num.innerHTML === "1") {
        add.innerHTML = "Add To cart"
        add.parentElement.classList.remove("added")
        minus.classList.add("min0")
    } else {
        add.parentElement.classList.add("added")
    }
    num.innerHTML = +num.innerHTML - 1;
    if (num.innerHTML === "0") {
        the.innerHTML = "your cart is empty";
        if (document.querySelector(".check")) {
            document.querySelector(".check").remove()
        }
    } else {
        if (cart.children.length !== 3) {
            let btn = document.createElement("button");
            btn.className = "check";
            btn.innerHTML = "checkout";
            cart.appendChild(btn);
        }
        the.innerHTML = `    <img src="images/image-product-1-thumbnail.jpg">
    <div class="info">
        <div class="disc">
            <p>Fall Limited Edition Sneaker</p>
        </div>
        <div class="price"><span>$125.00</span>x $<span>${num.innerHTML}</span> <span>${+num.innerHTML * 125}</span>.00</div>
    </div>
    <img src="images/icon-delete.svg" class="del">`
        document.querySelector(".del").onclick = function () {
            console.log(this)
            num.innerHTML = 0;
            the.innerHTML = "your cart is empty"
            document.querySelector(".check").remove()
        }
    }
    document.querySelector(".num").innerHTML = num.innerHTML
}
add.parentElement.onclick = function () {
    num.innerHTML = +num.innerHTML + 1;
    add.parentElement.classList.add("added");
    minus.classList.remove("min0");
    add.innerHTML = "Added To cart";
    if (num.innerHTML === "0") {
        the.innerHTML = "your cart is empty";
        if (document.querySelector(".check")) {
            document.querySelector(".check").remove()
        }
    } else {
        if (cart.children.length !== 3) {
            let btn = document.createElement("button");
            btn.className = "check";
            btn.innerHTML = "checkout";
            cart.appendChild(btn);
        }
        the.innerHTML = `    <img src="images/image-product-1-thumbnail.jpg">
    <div class="info">
        <div class="disc">
            <p>Fall Limited Edition Sneaker</p>
        </div>
        <div class="price"><span>$125.00</span>x $<span>${num.innerHTML}</span> <span>${+num.innerHTML * 125}</span>.00</div>
    </div>
    <img src="images/icon-delete.svg" class="del">`
        document.querySelector(".del").onclick = function () {
            num.innerHTML = 0;
            the.innerHTML = "your cart is empty"
            document.querySelector(".check").remove()
        }
    }
    document.querySelector(".num").innerHTML = num.innerHTML
}
document.querySelector(".menu").onclick = function () {
    document.querySelector(".links").style.display = "flex";
    document.querySelector(".box").classList.add("toscale")
}
document.querySelector(".dele").onclick = function () {
    document.querySelector(".links").style.display = "none"
    document.querySelector(".box").classList.remove("toscale")

}