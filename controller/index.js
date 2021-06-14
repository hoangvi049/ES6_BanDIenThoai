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

const typeSelect = () => {
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
    renderProduct(mappedProduct);
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

function setItem(product, productList) {
  let cartItem = {
    ...product,
    quantity: 1,
  };

  if (productList.length === 0) {
    productList.push(cartItem);
  } else {
    for (item of productList) {
      if (cartItem.id === item.id) {
        item.quantity += 1;
      } else {
        productList.push(cartItem);
      }
    }
  }
  console.log(productList);
}
