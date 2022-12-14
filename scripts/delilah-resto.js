
// ARRAYS
const products_id = [];

// CREACION DE PRODUCTOS
async function productsdivs(datos, index){
    // ancho de ventana
    let windows_width = window.innerWidth;
    // ancho de ventana
    if(windows_width <= 1365){
    let section = document.getElementById("nuestros-platos-container");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let button = document.createElement("button");
    button.onclick = getinfo_products;
    button.className = "nuestros-platos-button";
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image.className = "foodimage";
    section.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "+";
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
    }else{
    let section = document.getElementById("nuestros-platos-container");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image_background = document.createElement("div");
    let image = document.createElement("img");
    let button = document.createElement("button");
    button.onclick = getinfo_products;
    button.className = "nuestros-platos-button";
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image_background.className = "foodimage";
    section.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image_background);
    image_background.appendChild(image);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "+";
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
    }
};


window.onload = async function(){
    let url = 'http://127.0.0.1:3000/productos/get';
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log(datos);
    for (let index = 0; index < datos.datos.length; index++) {
        productsdivs(datos, index);
        products_id.push(datos.datos[index].id);
    };
};
// CREACION DE PRODUCTOS TERMINO

// CREACION DE RECOMENDADOS
async function recomendeddivs(data){
    let section = document.getElementById("recomended-contenedor");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let a??adir_button = document.createElement("button");
    let span = document.createElement("div");
    span.className = "span";
    creatediv.className = "recomended";
    foodname.className = "recomended-foodname";
    price.className = "recomended-price";
    image.className = "recomended-image";
    a??adir_button.className = "a??adir";
    a??adir_button.innerHTML = "A??adir ";
    a??adir_button.onclick = recomended_checked;
    section.appendChild(creatediv);
    creatediv.appendChild(span);
    creatediv.appendChild(foodname);
    span.appendChild(price);
    creatediv.appendChild(image);
    span.appendChild(a??adir_button);
    foodname.innerHTML = data.datos[0].foodname;
    price.innerHTML = "$ "+ data.datos[0].price;
    image.src = data.datos[0].url;
    a??adir_button.value = data.datos[0].id;
}

async function recomended_checked(event){
    let value = event.target.value;
    let background_color = event.target.style;
    if(background_color.background !== "green"){
        background_color.background = "green";
        let url_pedidos = 'http://127.0.0.1:3000/productos/get/'+ value;
        const resp = await fetch(url_pedidos);
        const data = await resp.json();
        pedidos_data.id.push(data.datos[0].id);
        console.log(pedidos_data.id);
        }
        else if(background_color.background == "green"){
            background_color.background = "orange";
            const findIndex = (element) => element == value;
            let id_number = pedidos_data.id.findIndex(findIndex);
            if(id_number >= 0){
                pedidos_data.id.splice(id_number, 1);
            }else{
                console.log(id_number);    
            }
            console.log(pedidos_data.id);
        };
        let checked = pedidos_data.id.some(element => element >= 1);
        console.log(checked);
        if(checked === true){
            carrito_noactivo.style.display = "none";
            carrito_activa.style.display = "block";
        }else{
            carrito_noactivo.style.display = "block";
            carrito_activa.style.display = "none";
        }
};

function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
function removeitemofarray(random_number){
    products_id.splice(random_number, 1);
}    

setTimeout(async function recomended (){
    for (let index = 0; index < 4 ; index++) {
        let maxnumber = products_id.length;        
        let random_number = getRandomArbitrary(0 , maxnumber);
        let url_recomended = 'http://127.0.0.1:3000/productos/get/'+ products_id[random_number];
        const respuesta = await fetch(url_recomended);
        const data = await respuesta.json();
        recomendeddivs(data);
        removeitemofarray(random_number);
    };
}, 1000);

//CREACION DE RECOMENDADOS TERMINO

//CREACION DE PEDIDOS
let pedidos_data = {
    "id": [],
    "cantidad": []
}

async function getinfo_products(event){
    let style = event.target.style;
    let id = event.target.value;
    if(style.background !== "green"){
    style.background = "green";
    console.log(id);
    let url_pedidos = 'http://127.0.0.1:3000/productos/get/'+ id
    const resp = await fetch(url_pedidos);
    const data = await resp.json();
    pedidos_data.id.push(data.datos[0].id);
    console.log(pedidos_data.id);
    }
    else if(style.background == "green"){
        style.background = "orange";
        const findIndex = (element) => element == id;
        let id_number = pedidos_data.id.findIndex(findIndex);
        if(id_number >= 0){
            pedidos_data.id.splice(id_number, 1);
        }else{
            console.log(id_number);    
        }
        console.log(pedidos_data.id);
    };
    let checked = pedidos_data.id.some(element => element >= 1);
    console.log(checked);
    if(checked === true){
        carrito_noactivo.style.display = "none";
        carrito_activa.style.display = "block";
    }else{
        carrito_noactivo.style.display = "block";
        carrito_activa.style.display = "none";
    }
}

let carrito_noactivo = document.getElementById("carrito-no-activo");
let carrito_activa = document.getElementById("carrito-activo");
let icons = document.getElementById("icons");
let recomendados = document.getElementById("recomended");
let nuestros_platos = document.getElementById("nuestros-platos");
let pedidos = document.getElementById("pedidos");

carrito_activa.addEventListener("click", async function(event){
    event.preventDefault();
    icons.style.display = "none";
    recomendados.style.display = "none";
    nuestros_platos.style.display = "none";
    pedidos.style.display = "flex";
    let detalle_pedido = document.createElement("section");
    detalle_pedido.id = "first-half"; 
    pedidos.appendChild(detalle_pedido);
    let detalle = document.createElement("h1");
    detalle_pedido.appendChild(detalle);
    detalle.innerHTML = "detalle";
    for (let index = 0; index < pedidos_data.id.length; index++) {
        const element = pedidos_data.id[index];
        let url = 'http://127.0.0.1:3000/productos/get/'+ element;
        const resp = await fetch(url);
        const data = await resp.json();
        createpedidosxproductos_section(data, detalle_pedido);
    }
})

function createpedidosxproductos_section(data, detalle_pedido){
    let div_producto = document.createElement("div");
    div_producto.className = "div_producto";
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let arriba = document.createElement("img");
    let abajo = document.createElement("img");
    let contador = document.createElement("p");
    contador.className = "contador";
    contador.innerHTML = "1";
    arriba.className = "flecha-arriba";
    abajo.className = "flecha-abajo";
    arriba.src = "./images/icons/proximo.svg";
    abajo.src = "./images/icons/regreso.svg";
    detalle_pedido.appendChild(div_producto);
    div_producto.appendChild(foodname);
    div_producto.appendChild(price);
    div_producto.appendChild(image);
    div_producto.appendChild(arriba);
    div_producto.appendChild(abajo);
    div_producto.appendChild(contador);
    foodname.innerHTML = data.datos[0].foodname;
    price.innerHTML = data.datos[0].price;
    image.src = data.datos[0].url;
    arriba.addEventListener("click", function(event){
        if(contador.innerHTML == 10){
            console.log("no se puede aumentar");
        }else{
            event.preventDefault();
            let number = parseInt(contador.innerHTML);
            console.log(number);
            let newnumber = number += 1;
            contador.innerHTML = newnumber; 
        }
    });
    abajo.addEventListener("click", function(event){
        if(contador.innerHTML == 1){
            console.log("no se puede disminuir")
        }else{
            event.preventDefault();
            let number = parseInt(contador.innerHTML);
            console.log(number);
            let newnumber = number -= 1;
            contador.innerHTML = newnumber;
        }
    })
}

let confirmar_pedido = document.getElementById("confirmar-pedido");
let cancelar_pedido = document.getElementById("cancelar-pedido");



confirmar_pedido.addEventListener("click", function(event){
    let contador = document.querySelectorAll(".contador");
    console.log(contador);
    event.preventDefault();
    contador.forEach(element => {
        let values = parseInt(element.innerHTML);
        console.log(values);
        pedidos_data.cantidad.push(values);
    })
    console.log(pedidos_data);
    let token = localStorage.getItem("token");
    console.log(token);
    fetch('http://127.0.0.1:3000/pedidos/pedidos',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(pedidos_data)
    })
    .then(async function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
    pedidos.style.display = "none";
    imagepizzacreated();
});

cancelar_pedido.addEventListener("click", function(event){
    event.preventDefault();
    setTimeout(window.location.replace("delilah-resto-user.html"), 3000);
});

// creacion del mensaje de pedido creado

let body = document.getElementById("body");

function imagepizzacreated(){
    let section_pizza = document.createElement("section");
    let pizza = document.createElement("img");
    let paragraph = document.createElement("p");
    let botton = document.createElement("button");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Recibimos tu pedido";
    pizza.src = "./images/53798bcd7054e4feaef568a5cf49574b-etiqueta-de-pizza-by-vexels.png";
    paragraph.innerHTML = "gracias por pedir en Delilah, tu pedido fue registrado con exito";
    botton.innerHTML = "volver a la pagina principal";
    botton.id = "comeback";
    section_pizza.id = "pizza-section";
    section_pizza.appendChild(pizza);
    section_pizza.appendChild(paragraph);
    section_pizza.appendChild(botton);
    section_pizza.appendChild(h1);
    body.appendChild(section_pizza);
    botton.onclick = backtothelandingpage;
}
// creacion del mensaje de pedido creado finalizado // 

function backtothelandingpage(event, callback){
    event.preventDefault();
    window.location.assign("delilah-resto-user.html");
    callback = setTimeout(function(){
        console.log("crear en el futuro los pedidos del usuario en esta funcion")
    }, 3000)
 }  //ultima funcion no anda 

console.log("ancho de pantalla:" + window.innerWidth);


