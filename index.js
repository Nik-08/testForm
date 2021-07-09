"use strict";

const elemAdd = document.querySelector(".elem__head_add"),
  formProduct = document.querySelector(".form__product"),
  formContent = document.querySelector(".form__content"),
  form = document.querySelector(".form"),
  formBtn = document.querySelector(".form__btn"),
  formFooter = document.querySelector(".form__footer"),
  elemItem = document.querySelectorAll(".elem__item"),
  btnProduct = document.querySelector(".btn-product"),
  btnPay = document.querySelector(".btn-pay"),
  elemProducts = document.querySelector(".elem__products"),
  btnText = document.querySelector(".btn__text"),
  loader = document.querySelector(".loader"),
  successfulForm = document.querySelector(".successful__form"),
  failedForm = document.querySelector(".failed__form"),
  elemItems = document.querySelector(".elem__items");
let url = window.location.href;

let arr = [],
  data = {};

const sendForm = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loader.style.display = "block";
    btnText.style.display = "none";

    setTimeout(post, 1500);

    function post() {
      const formData = new FormData(form); // создали объект который считывает с формы
      let body = {}; // записываем в объект
      formData.forEach((val, key) => {
        // перебираем массив
        body[key] = val;
      });
      postData(body)
        .then((request) => {
          if (request.status !== 200) {
            // проверяем статус
            throw new Error("status network now 200");
          }
          successfulForm.style.display = "block";
          formContent.style.display = "none";
          formFooter.style.display = "none";
          formBtn.style.display = "none";
          btnPay.style.display = "block";
          window.history.pushState(
            "object or string",
            "Title",
            url + "&paymentsuccess"
          );
        })
        .catch(() => {
          failedForm.style.display = "block";
          formContent.style.display = "none";
          formFooter.style.display = "none";
          formBtn.style.display = "none";
          btnPay.style.display = "block";
          btnPay.textContent = "Try to pay again";
          btnPay.classList.add("_failed");
          window.history.pushState(
            "object or string",
            "Title",
            url + "&paymenterror"
          );
          console.log(url);
        })
        .finally(() => {
          form.querySelectorAll("input").forEach((elem) => {
            elem.value = "";
          });
        });
    }
  });

  const postData = (body) => {
    return fetch("server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
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

const removeProducts = () => {
  let par = document.querySelectorAll(".new__elem");
  par.forEach((e) => e.remove());
};

const selectProduct = () => {
  elemItem.forEach((e) => {
    e.addEventListener("click", (event) => {
      let target = event.currentTarget;
      let arr = [];

      removeProducts();

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
          newElemProduct.classList.add(
            "form__elem",
            "elem",
            "new__elem",
            "elem__product"
          );
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
            />
            <div class="form__elem elem elem__link">
            <div class="elem__description">
              <span class="elem__text">
                Enter link to the similar product as a reference
              </span>
            </div>
            <input
              type="text"
              class="elem__input"
              placeholder="https://..."
            />
          </div>`;

          arr.push(newElemProduct);
        }

        for (let i = 0; i < arr.length - 1; i++) {
          // вставка на страницу
          elemProducts.appendChild(arr[i]);
        }
        formContent.style.overflowY = "scroll";
      }
    });
  });
};

const addMore = () => {
  //добавить больше
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

const amountElements = () => {
  const elemProduct = document.querySelectorAll(".elem__product"),
    btnPrice = document.querySelector(".btn__price");
  let elemNumb = document.querySelectorAll(".elem__numb");

  let array = [];
  elemProduct.forEach((e) => {
    array.push(e);

    switch (array.length) {
      case 2:
        btnPrice.textContent = "44";
        break;
      case 3:
        btnPrice.textContent = "60";
        break;
      case 4:
        btnPrice.textContent = "72";
        break;
      case 5:
        btnPrice.textContent = "80";
        break;
      default:
        btnPrice.textContent = "24.99";
    }
  });
};

const removeProduct = () => {
  let cross = document.querySelectorAll("._cross");
  cross.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (item.closest(".new__elem")) {
        item.closest(".new__elem").remove();

        amountElements();
      }
    });
  });
};

btnProduct.addEventListener("click", (event) => {
  event.preventDefault();
  formContent.style.display = "block";
  formFooter.style.display = "flex";
  formBtn.style.display = "block";
  formProduct.style.display = "none";
  btnProduct.style.display = "none";

  removeProduct();
  amountElements();
});

btnPay.addEventListener("click", (event) => {
  event.preventDefault();
  formContent.style.display = "block";
  formFooter.style.display = "flex";
  formBtn.style.display = "block";
  failedForm.style.display = "none";
  successfulForm.style.display = "none";
  btnPay.style.display = "none";
  loader.style.display = "none";
  btnText.style.display = "block";
  window.history.pushState("object or string", "Title", url + "");
  formContent.style.overflowY = "visible";
  removeProducts();
});
