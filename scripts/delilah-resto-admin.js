const token = localStorage.getItem("token")
const body = document.getElementById("body");

// ARRAY QUE CONTIENE DATOS DE PEDIDOS
let array_datos_pedidos = [];

window.onload = async function(){
    // GET PEDIDOS
    let url = "http://127.0.0.1:3000/pedidos/get-pedidos";
    fetch(url,{
        method: "GET",
        headers:{
            'Authorization': token
        }
    })
    .then(async function(res){
        let payload = await res.json();
        console.log(payload);
        array_datos_pedidos.push(payload);
        for (let index = 0; index < payload.datos.length; index++) {
            armarpedidostable(index, payload);
        }
    })
    .catch(function(err){
        console.log(err);
    })
}

let container_pedidos = document.getElementById("container-pedidos");
let container_estado = document.getElementById("container-estado");
let container_hora = document.getElementById("container-hora");
let container_numero = document.getElementById("container-numero");
let container_descripcion = document.getElementById("container-descripcion");
let container_pago = document.getElementById("container-pago");
let container_usuario = document.getElementById("container-usuario");
let container_direccion = document.getElementById("container-direccion");

function armarpedidostable(index, payload){
    // ESTADO   
    let estado = document.createElement("button");
        estado.className = "estado";
        container_estado.appendChild(estado);
        estado.innerHTML = payload.datos[index].estado;
        estado.style.background = "red";
        switch (estado.innerHTML) {
            case "nuevo":
                estado.style.background = "red"
                break;
            case "confirmado":
                estado.style.background = "#fbdd74"
                break;
            case "preparando":
                estado.style.background = "darkcyan"
                break;
            case "enviando":
                estado.style.background = "blue"
                break;
            case "entregado":
                estado.style.background = "green";
                break;        
        };
        estado.style.color= "white"
        estado.onclick = pedidoscomeback;
        estado.value = payload.datos[index].id_pedido
        // ESTADO
    // HORA
    let hora = document.createElement("p");
        hora.className = "hora";
        container_hora.appendChild(hora);
        hora.innerHTML = payload.datos[index].hora;
        // HORA
    // NUMERO
    let numero = document.createElement("p");
        numero.className = "numero";
        container_numero.appendChild(numero);
        numero.innerHTML = "#" + payload.datos[index].id_pedido;
        // NUMERO
    // DESCRIPCION  
    let descripcion_p = document.createElement("p");
        descripcion_p.className = "descripcion_p";
        container_descripcion.appendChild(descripcion_p);
        descripcion_p.innerHTML = payload.datos[index].foodname;
        // DESCRIPCION
    // PAGO 
    let pago = document.createElement("p");
        pago.className = "pago";
        container_pago.appendChild(pago);
        pago.innerHTML = payload.datos[index].price;
        // PAGO
    // USUARIO 
    let usuario_p = document.createElement("p");
        usuario_p.className = "usuario_p"
        container_usuario.appendChild(usuario_p);
        usuario_p.innerHTML = payload.datos[index].user_fullname;
        // USUARIO
    // DIRECCION 
    let direccion = document.createElement("button");
        direccion.className = "direccion";
        container_direccion.appendChild(direccion);
    let direccion_p = document.createElement("p");
        direccion_p.className = "direccion_p";
        container_direccion.appendChild(direccion_p);
        direccion_p.innerHTML = payload.datos[index].user_adress;
        // DIRECCION
}

function pedidoscomeback(event){
    estado_elements.splice(0,1);
    let element_event = event.currentTarget;
    estado_elements.push(element_event);
    console.log(estado_elements);
    var clientY = Math.floor(event.clientY);
    console.log(clientY);
    let estado = event.target.innerHTML;
    console.log(estado);
    let estados_div_container = document.createElement("div");
    estados_div_container.id = "estados-container";
    estados_div_container.style.display = "flex";
    container_pedidos.appendChild(estados_div_container);
    let estados = ["nuevo", "confirmado", "preparando","enviando", "entregado"]
    let indice = estados.indexOf(estado);
    console.log(indice);
    estados.splice(indice, 1);
    for (let index = 0; index < estados.length; index++) {
        let tipos_de_estado = document.createElement("div")
        estados_div_container.appendChild(tipos_de_estado);
        tipos_de_estado.className = "estados";
        tipos_de_estado.onclick = pedidos_put;
        const element = estados[index];
        tipos_de_estado.innerHTML = element;
        switch (element) {
            case "nuevo":
                tipos_de_estado.style.background = "red"
                break;
            case "confirmado":
                tipos_de_estado.style.background = "#fbdd74"
                break;
            case "preparando":
                tipos_de_estado.style.background = "darkcyan"
                break;
            case "enviando":
                tipos_de_estado.style.background = "blue"
                break;
            case "entregado":
                tipos_de_estado.style.background = "green";
                break;        
        }
    }
    estados_div_container.style.top = clientY + "px";
}
// estados_div_container arreglar que aparezca y desaparezca en todos los casos

// array donde voy a guardar el boton de clase estado, asi trato de despejarlo y modificarlo
const estado_elements = [];

function pedidos_put(event){
    let estados_container = document.getElementById("estados-container");
    estados_container.remove(); 
    let element_estado = estado_elements[0];
    console.log(element_estado.value);
    let event_text = event.target.innerHTML;
    let event_background = event.target.style.background;
    element_estado.innerHTML = event_text;
    element_estado.style.background = event_background;
    let body = {
        "estado": event_text
    }
    fetch("http://127.0.0.1:3000/pedidos/update?id=" + element_estado.value,{
        method: "PUT",
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    window.location.assign("delilah-resto-admin.html");
}

// HEADER NAVEGADOR BOTONES

let administracion = document.getElementById("administracion");
let administracion_section = document.getElementById("administracion-section");
let pedidos = document.getElementById("pedidos");
let cargar_productos_container = document.getElementById("cargar-productos-container");
let cargar_productos = document.getElementById("cargar-producto");


administracion.addEventListener("click", function(){
    let windows_widht = window.innerWidth;
        if (windows_widht < 1366) {
            if(administracion_section.style.display == "none"){
                container_pedidos.style.display = "none";
                cargar_productos_container.style.display = "none";
                administracion_section.style.display = "flex";
        }}
        else if(windows_widht > 1366){
            if (administracion_section.style.display == "none") {
                container_pedidos.style.filter = "blur(5px)";
                container_pedidos.style.display = "flex";
                cargar_productos_container.style.display = "none";
                administracion_section.style.display = "flex";
            }}
})

pedidos.addEventListener("click", function(){
    let windows_widht = window.innerWidth;
    if (windows_widht < 1366) {
        if(container_pedidos.style.display == "none"){
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
    }}
    else if (windows_widht > 1366) {
        if(container_pedidos.style.filter == "blur(5px)" || container_pedidos.style.display == "none") {
            container_pedidos.style.filter = "blur(0px)";
            container_pedidos.style.display = "flex";
            cargar_productos_container.style.display = "none";
            administracion_section.style.display = "none";
        }}
})

 cargar_productos.addEventListener("click", function(){
    let windows_widht = window.innerWidth;
    if (windows_widht < 1366) {
        if(cargar_productos_container.style.display == "none"){
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
     }}
    else if (windows_widht > 1366) {
        if (cargar_productos_container.style.display == "none") {
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
            cargar_productos_container.style.display = "flex";
        }
    }
     })

// ADMINISTRACION BORRAR PRODUCTOS

let borrar_productos = document.getElementById("borrar-productos");

function load_delete_products(){
    administracion_section.style.display = "none";
    // container
    let borrar_productos_container = document.createElement("section");
    borrar_productos_container.id = "borrar-productos-container";
    borrar_productos_container.style.display = "flex";
    body.appendChild(borrar_productos_container);
        // container
    // boton para volver atras
    let back = document.createElement("input");
    back.addEventListener("click",function(){
        if(borrar_productos_container.style.display == "flex"){
            borrar_productos_container.remove();
            administracion_section.style.display = "flex";
        }
    })
    borrar_productos_container.appendChild(back);
    back.type = "image";
    back.src = "./images/icons/espalda.svg";
        // boton para volver atras
    // titulo h1
    let h1 = document.createElement("h1");
    borrar_productos_container.appendChild(h1);
    h1.innerHTML = "Borrar productos"
        // titulo h1
    // FUNCION GET 
    get(borrar_productos_container)

    // GET BACK --- PEDIDOS, ADMINISTRADOR, CARGAR PRODUCTOS
    pedidos.addEventListener("click", function(){
        if(borrar_productos_container.style.display == "flex"){
            borrar_productos_container.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    pedidos.addEventListener("click", function(){
        if(borrar_productos_container.style.display == "flex"){
            borrar_productos_container.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    
    cargar_productos.addEventListener("click", function(){
        if(borrar_productos_container.style.display == "flex"){
            borrar_productos_container.remove();
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
         }
    });
}

borrar_productos.addEventListener("click", load_delete_products);

function traer_productos_for_delete(borrar_productos_container, datos, index){
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let button = document.createElement("button");
    button.className = "nuestros-platos-button";
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image.className = "foodimage";
    borrar_productos_container.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "X";
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
    button.onclick = delete_products;
}

async function get (borrar_productos_container){
    let url = 'http://127.0.0.1:3000/productos/get';
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log(datos);
    for (let index = 0; index < datos.datos.length; index++) {
        traer_productos_for_delete(borrar_productos_container,datos, index);
    };
};

function delete_products(){
    let value = event.target.value;
    let borrar_productos_container = document.getElementById("borrar-productos-container");
    borrar_productos_container.style.filter = "blur(5px)";
    // crear advertencia
    let contenedor_advertencia = document.createElement("div");
    contenedor_advertencia.className = "advertencia";
    body.appendChild(contenedor_advertencia);
    let div = document.createElement("div");
    div.innerHTML = "Borrar productos";
    contenedor_advertencia.appendChild(div);
    let p = document.createElement("p");
    p.innerHTML = "??Estas seguro de querer eliminar el producto seleccionado?";
    contenedor_advertencia.appendChild(p);
    let button_yes = document.createElement("button");
    button_yes.innerHTML = "SI";
    button_yes.style.background = "#51c286";
    contenedor_advertencia.appendChild(button_yes);
    let button_no = document.createElement("button");
    button_no.innerHTML = "NO";
    button_no.style.background = "red";
    contenedor_advertencia.appendChild(button_no);
    //  crear advertencia finalizado
    button_yes.addEventListener("click", function(){
    fetch("http://127.0.0.1:3000/productos/delete?id="+ value,{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    contenedor_advertencia.remove();
    borrar_productos_container.style.filter = "blur(0px)";  /* ACORDARSE: CREAR UN SIGNO DE CARGA EN LA PAGINA EN BLANCO */ 
    borrar_productos_container.remove();
    setTimeout(load_delete_products, 3000);
});
    button_no.addEventListener("click", function(){
        contenedor_advertencia.remove();
        borrar_productos_container.style.filter = "blur(0px)";
    });
};

    // ADMINISTRACION BORRAR PRODUCTOS 

// CREAR ADMINISTRADOR NUEVO

let create_admins = document.getElementById("crear-administrador");

function reload_create_admins(){
    administracion_section.style.display = "none";
    let section_crear_admin = document.createElement("section");
    section_crear_admin.id = "crear-admin-container";
    section_crear_admin.style.display = "flex";
    body.appendChild(section_crear_admin);
    // BACK-BUTTON
    let back = document.createElement("input");
    back.addEventListener("click", function(){
        if(section_crear_admin.style.display == "flex"){
            section_crear_admin.remove();
            administracion_section.style.display = "flex";
        }
    })
    back.type = "image";
    back.src = "./images/icons/espalda.svg";
    section_crear_admin.appendChild(back);
    back.className = "back-button-create-admin";
    // TITULO CREAR ADMINISTRADOR
    let h1 = document.createElement("h1");
    h1.innerHTML = "Crear administrador"
    section_crear_admin.appendChild(h1);
    // USUARIO INPUT
    let label_usuario = document.createElement("label");
    label_usuario.innerHTML = "Usuario/Administrador";
    section_crear_admin.appendChild(label_usuario);
    let input_usuario = document.createElement("input");
    input_usuario.type = "text";
    input_usuario.name = "admin";
    input_usuario.id = "admin";
    section_crear_admin.appendChild(input_usuario);
    // PASSWORD INPUT
    let label_password = document.createElement("label");
    label_password.innerHTML = "Contrase??a";
    section_crear_admin.appendChild(label_password);
    let input_password = document.createElement("input");
    input_password.type = "text";
    input_password.name = "contra";
    input_password.id = "contra";
    section_crear_admin.appendChild(input_password);
    // CREATE BUTTON SEND INFO
    let button_send = document.createElement("button");
    button_send.innerHTML = "Crear administrador";
    button_send.id = "send-admin-info";
    section_crear_admin.appendChild(button_send);
    button_send.onclick = new_admins_function;

     // GET BACK --- PEDIDOS, ADMINISTRADOR, CARGAR PRODUCTOS
     pedidos.addEventListener("click", function(){
        if(section_crear_admin.style.display == "flex"){
            section_crear_admin.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    pedidos.addEventListener("click", function(){
        if(section_crear_admin.style.display == "flex"){
            section_crear_admin.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    
    cargar_productos.addEventListener("click", function(){
        if(section_crear_admin.style.display == "flex"){
            section_crear_admin.remove();
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
        }
    });
}

create_admins.addEventListener("click", reload_create_admins);

function new_admins_function(event){
    let contenedor = document.getElementById("crear-admin-container");
    event.preventDefault();
    let body = {
        "username": document.getElementById("admin").value,
        "password": document.getElementById("contra").value,
    }
    console.log(body);
    fetch("http://127.0.0.1:3000/admin/crearadmin",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body),
    });
    contenedor.remove(); /*borra el contenedor para poderlo refrescar, ACORDARSE: HACER ANIMACION DE CARGA*/
    setTimeout(reload_create_admins, 3000);
};

    // CREAR ADMINISTRADOR NUEVO

// BORRAR PEDIDOS
let delete_pedidos = document.getElementById("borrar-pedidos");

async function reload_delete_pedidos(){
    // funcion GET
    fetch('http://127.0.0.1:3000/pedidos/get-pedidos',{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(async function(res){
        let payload = await res.json();
        console.log(payload);
         // funcion GET
    administracion_section.style.display = "none";
    let section_borrar_pedidos = document.createElement("section");
    section_borrar_pedidos.id = "borrar-pedidos-container";
    section_borrar_pedidos.style.display = "flex";
    body.appendChild(section_borrar_pedidos);
     // BACK-BUTTON
     let back = document.createElement("input");
     back.addEventListener("click", function(){
         if(section_borrar_pedidos.style.display == "flex"){
             section_borrar_pedidos.remove();
             administracion_section.style.display = "flex";
         }
     })
     back.type = "image";
     back.src = "./images/icons/espalda.svg";
     section_borrar_pedidos.appendChild(back);
     back.className = "back-button-create-admin";
     // TITULO CREAR ADMINISTRADOR
     let h1 = document.createElement("h1");
     h1.innerHTML = "Borrar pedidos"
     section_borrar_pedidos.appendChild(h1);
    //  CREAR INFO_CONTAINER
    let info_container = document.createElement("div");
    info_container.id = "info_container";
    section_borrar_pedidos.appendChild(info_container);
    //  ESTADO
    let estado_container = document.createElement("div");
    estado_container.className = "estado_container";
    info_container.appendChild(estado_container);
    let h2_estado = document.createElement("h2");
    estado_container.appendChild(h2_estado);
    h2_estado.innerHTML = "Estado";
    for (let index = 0; index < payload.datos.length; index++) {
        let estado = document.createElement("h3");
        estado.className = "estado";
        estado_container.appendChild(estado);
        estado.innerHTML = payload.datos[index].estado;
    }
    // NUMERO DE PEDIDO
    let numero_pedido_container = document.createElement("div");
    numero_pedido_container.className = "numero_pedido";
    info_container.appendChild(numero_pedido_container);
    let h2_pedido = document.createElement("h2");
    numero_pedido_container.appendChild(h2_pedido)
    h2_pedido.innerHTML = "numero";
    for (let index = 0; index < payload.datos.length; index++) {
        let pedido = document.createElement("p");
        numero_pedido_container.appendChild(pedido);
        pedido.className = "numero-pedidos";
        pedido.innerHTML = "#" + payload.datos[index].id_pedido;
        
    }
    // HORA
    let hora_container = document.createElement("div");
    hora_container.className = "hora_container";
    info_container.appendChild(hora_container);
    let h2_hora = document.createElement("h2");
    hora_container.appendChild(h2_hora);
    h2_hora.innerHTML = "Hora";
    for (let index = 0; index < payload.datos.length; index++) {
        let hora = document.createElement("p");
        hora_container.appendChild(hora);
        hora.className = "hora";
        hora.innerHTML = payload.datos[index].hora;
    }
    // USUARIO
    let usuario_container = document.createElement("div");
    info_container.appendChild(usuario_container);
    usuario_container.className = "usuario_container";
    let h2_usuario = document.createElement("h2");
    usuario_container.appendChild(h2_usuario);
    h2_usuario.innerHTML = "Usuario";
    for (let index = 0; index < payload.datos.length; index++) {
        let usuario_p = document.createElement("p");
        usuario_p.className = "usuario_p"
        usuario_container.appendChild(usuario_p);
        usuario_p.innerHTML = payload.datos[index].user_fullname;        
    }
    // BOTON DELETE
    let boton_container = document.createElement("div");
    info_container.appendChild(boton_container);
    boton_container.className = "boton_container";
    for (let index = 0; index < payload.datos.length; index++) {
        let boton_delete = document.createElement("button");
        boton_container.appendChild(boton_delete);
        boton_delete.innerHTML = "X";
        boton_delete.value = payload.datos[index].id_pedido;
        boton_delete.onclick = borrar_pedidos;
    }

     // GET BACK --- PEDIDOS, ADMINISTRADOR, CARGAR PRODUCTOS
     pedidos.addEventListener("click", function(){
        if(section_borrar_pedidos.style.display == "flex"){
            section_borrar_pedidos.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    pedidos.addEventListener("click", function(){
        if(section_borrar_pedidos.style.display == "flex"){
            section_borrar_pedidos.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    
    cargar_productos.addEventListener("click", function(){
        if(section_borrar_pedidos.style.display == "flex"){
            section_borrar_pedidos.remove();
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
         }
    });
    })
    .catch(function(err){
        console.log(err);
    })
}

delete_pedidos.addEventListener("click", reload_delete_pedidos);

function borrar_pedidos(event){
    let contenedor = document.getElementById("borrar-pedidos-container");
    console.log(event.target);
    event.preventDefault();
    let value = event.target.value;
    contenedor.style.filter = "blur(5px)";
    // div advertencia YES/NO
    let contenedor_advertencia = document.createElement("div");
    contenedor_advertencia.className = "advertencia";
    body.appendChild(contenedor_advertencia);
    let div = document.createElement("div");
    div.innerHTML = "Borrar pedidos";
    contenedor_advertencia.appendChild(div);
    let p = document.createElement("p");
    p.innerHTML = "??Estas seguro de querer eliminar el pedido seleccionado?";
    contenedor_advertencia.appendChild(p);
    let button_yes = document.createElement("button");
    button_yes.innerHTML = "SI";
    button_yes.style.background = "#51c286";
    contenedor_advertencia.appendChild(button_yes);
    let button_no = document.createElement("button");
    button_no.innerHTML = "NO";
    button_no.style.background = "red";
    contenedor_advertencia.appendChild(button_no);
    // div advertencia YES/NO
    button_yes.addEventListener("click", function(){
        fetch("http://127.0.0.1:3000/pedidos/delete?id=" + value,{
        method: "DELETE",  
        headers:{
            'Authorization': token
        }
    });
        contenedor.style.filter = "blur(0px)";
        contenedor.remove(); /*borra el contenedor para poderlo refrescar, ACORDARSE: HACER ANIMACION DE CARGA*/
        setTimeout(reload_delete_pedidos, 3000);
        contenedor_advertencia.remove();
    });
    button_no.addEventListener("click", function(){
        contenedor_advertencia.remove();
        contenedor.style.filter = "blur(0px)";
    });
};

    // BORRAR PEDIDOS

// MODIFICAR PRODUCTOS

// arrays
let array_categorias = ["carne", "hamburguesa", "ensalada", "tarta", "cafe", "postre", "pizzas", "bebidas", "pastas", "sushi"];
let arrays_divs_productos = [];
// arrays

let modificar_productos = document.getElementById("modificar-productos");

function reload_modificar_productos(){
    administracion_section.style.display = "none";
    // DIV-HEADER
    let div_header = document.createElement("div");
    div_header.style.display = "flex";
    div_header.id = "header-modificar";
    body.appendChild(div_header);
    // BOTON BACK
    let back = document.createElement("input");
    back.addEventListener("click", function(){
        if(div_header.style.display == "flex" && section_modificar.style.display == "flex"){
            div_header.remove();
            section_modificar.remove();
            administracion_section.style.display = "flex";
        }
    });
    back.type = "image";
    back.src = "./images/icons/espalda.svg";
    div_header.appendChild(back);
    back.className = "back-button-modificar-productos";
    // TITULO MODIFICAR PRODUCTOS
    let h1 = document.createElement("h1");
    h1.innerHTML = "Modificar productos";
    div_header.appendChild(h1);
    // SECTION CONTENEDOR-PRODUCTOS
    let section_modificar = document.createElement("section");
    section_modificar.id = "info-productos";
    section_modificar.style.display = "flex";
    body.appendChild(section_modificar);
    // FUNCION TRAER PRODUCTOS
    modificar_get(section_modificar);

     // GET BACK --- PEDIDOS, ADMINISTRADOR, CARGAR PRODUCTOS
     pedidos.addEventListener("click", function(){
        if(section_modificar.style.display == "flex"){
            section_modificar.remove();
            div_header.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    pedidos.addEventListener("click", function(){
        if(section_modificar.style.display == "flex"){
            section_modificar.remove();
            div_header.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    
    cargar_productos.addEventListener("click", function(){
        if(section_modificar.style.display == "flex"){
            section_modificar.remove();
            div_header.remove();
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
         }
    });
};

modificar_productos.addEventListener("click", reload_modificar_productos);    

function traerproductosparamodificar(section_modificar, datos, index){
    let creatediv = document.createElement("div");
    let foodname = document.createElement("input");
    let price = document.createElement("input");
    let url = document.createElement("input");
    let categoria = document.createElement("select");
    for (let index = 0; index < array_categorias.length; index++) {
        const element = array_categorias[index];
        let option = document.createElement("option");
        option.value = element;
        option.text = element
        categoria.options.add(option);
    };
    let button = document.createElement("button");
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    url.className = "url";
    categoria.className = "categoria";
    button.className = "modificar";
    foodname.value = datos.datos[index].foodname;
    price.value = datos.datos[index].price;
    url.value = datos.datos[index].url;
    categoria.value = datos.datos[index].categoria;
    categoria.text = datos.datos[index].categoria;
    creatediv.id = datos.datos[index].id;
    section_modificar.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(url);
    creatediv.appendChild(categoria);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "Modificar";
    button.onclick = modificar_put;
}

async function modificar_get(section_modificar){
        let url = 'http://127.0.0.1:3000/productos/get';
        const resp = await fetch(url);
        const datos = await resp.json();
        console.log(datos);
    for (let index = 0; index < datos.datos.length; index++) {
        traerproductosparamodificar(section_modificar,datos,index);
    };
}

let button_modificar_productos = document.getElementsByClassName("modificar");


function modificar_put(){
    let header_contenedor = document.getElementById("header-modificar");
    let contenedor = document.getElementById("info-productos");
    let value = event.target.value;
    let div_contenedor_info = document.getElementById(value).children;
    for (let index = 0; index < 4; index++) {
        let element_classname = div_contenedor_info[index].className;
        let element_value = div_contenedor_info[index].value;
        fetch("http://127.0.0.1:3000/productos/put/"+ value + "?" + element_classname + "=" + element_value,{
            method: "PUT",
            headers:{
                'Authorization': token
            },
        })
    }
    header_contenedor.remove();
    contenedor.remove(); /*borra el contenedor para poderlo refrescar, ACORDARSE: HACER ANIMACION DE CARGA*/
    setTimeout(reload_modificar_productos, 3000);
};
    // MODIFICAR PRODUCTOS

// CARGAR PRODUCTOS

let button_cargar_productos = document.getElementById("cargar-productos-submit-button");

button_cargar_productos.addEventListener("click", function(event){
    event.preventDefault();
    let section_cargar_productos = document.getElementById("cargar-productos-container");
    let foodname = document.getElementById("foodname").value;
    let price = document.getElementById("price").value;
    let url = document.getElementById("url").value;
    let categoria = document.getElementById("list").value;
    let body_send = {
        "foodname": foodname,
        "price": price,
        "url": url,
        "categoria": categoria
    }
    console.log(body_send);
    fetch("http://127.0.0.1:3000/productos/post",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body_send)
    });
    section_cargar_productos.style.display = "none"; 
    producto_creado_exitosamente();
});

function producto_creado_exitosamente(){
    let section_cargar_productos = document.getElementById("cargar-productos-container")
    let section_pasta = document.createElement("section");
    section_pasta.style.display = "flex";
    let pasta = document.createElement("img");
    let botton = document.createElement("button");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Has creado un nuevo producto satisfactoriamente";
    pasta.src = "./images/spaghetti-svgrepo-com.svg";
    botton.innerHTML = "volver a crear producto";
    botton.id = "comeback";
    section_pasta.id = "pasta-section";
    section_pasta.appendChild(pasta);
    section_pasta.appendChild(botton);
    section_pasta.appendChild(h1);
    body.appendChild(section_pasta);
    botton.addEventListener("click", function(){
        section_pasta.remove();
        section_cargar_productos.style.display = "flex";
    });
     // GET BACK --- PEDIDOS, ADMINISTRADOR, CARGAR PRODUCTOS
     pedidos.addEventListener("click", function(){
        if(section_pasta.style.display == "flex"){
            section_pasta.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    pedidos.addEventListener("click", function(){
        if(section_pasta.style.display == "flex"){
            section_pasta.remove();
            container_pedidos.style.display = "flex";
            administracion_section.style.display = "none"
            cargar_productos_container.style.display = "none"; 
        }
    });
    
    cargar_productos.addEventListener("click", function(){
        if(section_pasta.style.display == "flex"){
            section_pasta.remove();
            cargar_productos_container.style.display = "flex";
            administracion_section.style.display = "none";
            container_pedidos.style.display = "none";
         }
    });
};
    // CARGAR PRODUCTOS

