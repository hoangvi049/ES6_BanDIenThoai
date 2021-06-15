let mappedProduct = [];
let cartStorage = [];

const fetchProduct = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
    mappedProduct = mapData(res.data);

    return mappedProduct;
  } catch (error) {
    console.log(error);
  }
};

const renderProduct = (productList) => {
  let content = "";
  for (let item in productList) {
    content += productList[item].render(+item + 1);
  }
  document.getElementById("product").innerHTML = content;
};

const mapData = (productList) => {
  const mappedData = productList.map((item) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      image,
      inventory,
      rating,
      fontCamera,
    } = item;

    return new Product(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      image,
      inventory,
      rating,
      fontCamera
    );
  });
  return mappedData;
};

const typeSelect = (mappedProduct) => {
  //   console.log(mappedProduct[0].type);
  let iphoneList = mappedProduct.filter((mappedProduct) => {
    return mappedProduct.type === "iphone";
  });
  let samsungList = mappedProduct.filter((mappedProduct) => {
    return mappedProduct.type === "samsung";
  });
  if (document.getElementById("mySelect").value === "iphone") {
    renderProduct(iphoneList);
  } else if (document.getElementById("mySelect").value === "samsung") {
    renderProduct(samsungList);
  } else {
    renderProduct(productList);
  }
};

fetchProduct().then((mappedProduct) => {
  console.log(mappedProduct);
  renderProduct(mappedProduct);
  document.getElementById("mySelect").onchange = typeSelect;
  let cartSubmit = document.querySelectorAll(".btn-add");

  for (let i = 0; i < cartSubmit.length; i++) {
    cartSubmit[i].addEventListener("click", () => {
      setItem(mappedProduct[i], cartStorage);
      console.log(cartStorage);
      renderCart(cartStorage);
    });
  }
});
// function onLoadCart() {
//   let productNumber = localStorage.getItem("cartNumbers");
//   if (productNumber) {
//     document.querySelector(".cart-couter").textContent = productNumber;
//   }
// }
// onLoadCart();

// function cartNumbers(product) {
//   let productNumber = localStorage.getItem("cartNumbers", 1);
//   productNumber = parseInt(productNumber);
//   if (productNumber) {
//     localStorage.setItem("cartNumbers", productNumber + 1);
//     document.querySelector(".cart-couter").textContent = productNumber + 1;
//   } else {
//     localStorage.setItem("cartNumbers", 1);
//     document.querySelector(".cart-couter").textContent = 1;
//   }
//   setItem(product);
// }

// function setItem(product) {
//   console.log(product);
// }

function setItem(prod, cartStorage) {
  const checkProduct = cartStorage.find((item) => {
    return item.product.id === prod.id;
  });

  if (checkProduct) {
    checkProduct.quantity++;
  } else {
    const cartItem = { product: prod, quantity: 1 };
    cartStorage.push(cartItem);
  }
}

renderCart = (cartStorage) => {
  let cartHTML = "";
  for (var i = 0; i < cartStorage.length; i++) {
    cartHTML += `
    <tr>
    <td><img src ="${
      cartStorage[i].product.image
    }" style="width:100px; height:100px"></img></td>
    <td><p>${cartStorage[i].product.name}</p></td>
    <td><p>${cartStorage[i].product.price}</p></td>
    <td>
            <button id="btnDecrease" onclick="decrease(${
              cartStorage[i].product.id
            })"> - </button>
            <span>${cartStorage[i].quantity}</span>
            <button id="btnIncrease" onclick="increase(${
              cartStorage[i].product.id
            })"> + </button>
          </td>
    <td><p>${cartStorage[i].product.price * cartStorage[i].quantity}</p></td>
    <td> <button id="btnRemove" style="background:red; color:white; width:40px" onclick="remove(${
      cartStorage[i].product.id
    })"> Xóa </button></td>

      </tr>
    `;
  }
  document.getElementById("cart-content").innerHTML = cartHTML;
};

decrease = (id) => {
  const checkProduct = cartStorage.find((item) => {
    return item.product.id == id;
  });
  if (checkProduct) {
    if (checkProduct.quantity <= 1) {
      cartStorage.splice(checkProduct, 1);
    } else {
      checkProduct.quantity--;
    }
  }

  renderCart(cartStorage);
};

increase = (id) => {
  const checkProduct = cartStorage.find((item) => {
    return item.product.id == id;
  });
  if (checkProduct) {
    checkProduct.quantity++;
  }

  renderCart(cartStorage);
};

remove = (id) => {
  const index = cartStorage.findIndex((item) => {
    return item.product.id == id;
  });
  cartStorage.splice(index, 1);
  console.log(cartStorage);
  renderCart(cartStorage);
};
