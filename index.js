"use strict";

const elemAdd = document.querySelector(".elem__head_add"),
  formProduct = document.querySelector(".form__product"),
  formContent = document.querySelector(".form__content"),
  formBtn = document.querySelector(".form__btn"),
  formFooter = document.querySelector(".form__footer"),
  elemItem = document.querySelectorAll(".elem__item"),
  btnProduct = document.querySelector(".btn-product"),
  elemProduct = document.querySelector(".elem__product"),
  elemItems = document.querySelector(".elem__items");

// const passElem = () => {
// 	parentDiv.insertBefore(newElemProduct, elemProduct);
// }
let arr = [];

const sendForm = () => {
  formBtn.addEventListener("click", (event) => {
    event.preventDefault();
  });
};

sendForm();

const removeClass = () => {
  elemItem.forEach((e) => {
    let activeText = e.querySelector("._active__des"),
      activeBtn = e.querySelector("._active__btn");

    if (e.closest("._active")) {
      e.classList.remove("_active");
      if (activeText) {
        activeText.classList.remove("_active__des");
        activeBtn.classList.remove("_active__btn");
      } else if (!activeText) {
        activeBtn.classList.remove("_active__btn");
      }
    }
  });
};

// const removeProduct = () => {

// };
// removeProduct();

const selectProduct = () => {
  elemItem.forEach((e) => {
    e.addEventListener("click", (event) => {
      let target = event.currentTarget;
      let arr = [];

      let par = document.querySelectorAll(".new__elem");
      par.forEach((e) => e.remove());

      if (target.closest(".elem__item")) {
        removeClass();

        let descriptionText = target.querySelector(".item__description"),
          btn = target.querySelector(".item__radio");

        if (descriptionText) {
          descriptionText.classList.add("_active__des");
          btn.classList.add("_active__btn");
        } else if (!descriptionText) {
          btn.classList.add("_active__btn");
        }

        target.classList.add("_active");

        let max = Number(target.id);

        for (let index = 0; index < max; index++) {
          // создание элемента
          let newElemProduct = document.createElement("div");
          newElemProduct.classList.add("form__elem", "elem", "new__elem");
          newElemProduct.innerHTML = `<div class="elem__head">
            <span class="elem__title"
            >Product <span class="elem__numb">${
              index + 2
            } <i class="far fa-times-circle _cross"></i></span></span
            >
            </div>
            <div class="elem__description">
            <span class="elem__text">
            Enter main keyword for the product
            </span>
            </div>
            <input
            type="text"
            class="elem__input"
            placeholder="for example, sylicon wine cup"
          />`;

          arr.push(newElemProduct);
        }

        for (let i = 0; i < arr.length - 1; i++) {
          // вставка на страницу
          elemProduct.appendChild(arr[i]);
        }
        formContent.style.overflowY = "scroll";
      }
    });
  });
};

const addMore = () => {
  elemAdd.addEventListener("click", (event) => {
    formContent.style.display = "none";
    formFooter.style.display = "none";
    formBtn.style.display = "none";
    formProduct.style.display = "block";
    btnProduct.style.display = "block";

    selectProduct();
  });
};

addMore();

btnProduct.addEventListener("click", (event) => {
  event.preventDefault();
  formContent.style.display = "block";
  formFooter.style.display = "flex";
  formBtn.style.display = "block";
  formProduct.style.display = "none";
  btnProduct.style.display = "none";

  let cross = document.querySelectorAll("._cross");

  cross.forEach((item) => {
    item.addEventListener("click", (event) => {
      let target = event.target;
      console.log(target);

      if (item.closest(".new__elem")) {
        item.closest(".new__elem").remove();
      }
    });
  });
});
