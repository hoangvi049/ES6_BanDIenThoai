let mappedProduct;

const fetchProduct = async () => {
  await axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (result) {
      console.log(result.data);
      mappedProduct = mapData(result.data);
      renderProduct(mappedProduct);
    })
    .catch(function (errors) {
      console.log(errors.data);
    });
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
document.getElementById("mySelect").onchange = typeSelect;

fetchProduct();
