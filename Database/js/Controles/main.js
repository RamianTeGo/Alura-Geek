import { serviceProduct } from "../Servicios/product.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const id = document.querySelector("[data-id]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img__cajas">
        <img src="${image}" alt="imagen ${name}">
    </div>
    <div class="cajas__info">
        <h3 class="caja__name">${name}</h3>
    <div class="caja__precio_icon">
        <p class="caja__precio">${price}</p>
        <button class="icon_eliminar" data-id=${id}>
            <img src="Img/icon_eliminar.png" alt="icono eliminar">
        </button>
    </div>`;

    const deleteBoton = card.querySelector(".icon_eliminar");
    deleteBoton.addEventListener("click", () => deleteId(id));

    productContainer.appendChild(card);
return card

} 

const deleteId = (id) => {
    servicesProducts.deleteProduct(id)
        .then(() => {
            const card = productContainer.querySelector(`[data-id="${id}"]`).closest(".card");
            card.remove();
            console.log("Producto eliminado");
        })
        .catch((err) => console.log(err));
  };
  
  
  
  productContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("icon_eliminar")) {
        const id = event.target.dataset.id;
        servicesProducts.deleteProduct(id)
            .then(() => {
                event.target.closest(".card").remove();
                console.log("Producto eliminado");
            })
            .catch((err) => console.log(err));
    }
  });

const render = async ()=>{
    try {
        const listProducts = await serviceProduct.productList();
        listProducts.forEach((product) => {
            productContainer.appendChild(
                createCard(product.name, product.price,product.image, product.id)
            )
        }); 
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-image]").value;

    serviceProduct
    .createProduct(name,precio,image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

})



render()