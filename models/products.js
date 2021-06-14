class Product {
  constructor(
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
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.image = image;
    this.inventory = inventory;
    this.rating = rating;
    this.fontCamera = fontCamera;
  }

  render(index) {
    return `
        <div class="render-products" id=${this.id}>
        <img src="${this.image}" alt="">
        <p class ="product-name ${index}">${this.name}</p>
        <p class ="product-price">${this.price}$</p>
        <a><button class="btn btn-add cart-${index}"  id=${this.id}>Add to cart</button></a>
        
        </div>    
    `;
  }
}
