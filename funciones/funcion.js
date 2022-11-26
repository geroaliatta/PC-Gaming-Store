let carro = [];
let tabla = document.getElementById("tbody");
let boton_comprar = document.querySelectorAll(".botonComprar");
let total_carrito = document.querySelector(".totalCarrito");

boton_comprar.forEach(boton => {
    boton.addEventListener("click" , agregar_carro)
});

let finalizarCompra = document.querySelector(".botonFinalizar");
finalizarCompra.addEventListener("click" , finalizarCompraAct);

function agregar_carro(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre_juego = padre.querySelector("h4").textContent;
    let precio_juego = padre.querySelector("span").textContent;
    let img_juego = abuelo.querySelector("img").src;

    let juego = {
        nombre: nombre_juego , 
        precio: precio_juego , 
        img: img_juego ,
        cantidad: 1
    }


    carro.push(juego);


    ver_carro(juego);

    Toastify({

        text: "Juego agregado al carrito",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #0D6601, #169705)",
        }
        
        }).showToast();

    
}

function ver_carro(juego){

    const titulo_carrito = tabla.getElementsByClassName("tituloCarrito");

    for (let i = 0; i < titulo_carrito.length; i++) {

        if (titulo_carrito[i].innerText === juego.nombre) {
            let cantidad = titulo_carrito[i].parentElement.querySelector(".inputCantidad");
            cantidad.value++;
            actualizar_total_compra();
            return;
        }
    }

    let fila = document.createElement("tr");
    fila.innerHTML =`<td class="tituloCarrito">${juego.nombre}</td>
                    <td class="precioCarrito">${juego.precio}</td>
                    <td><input class="inputCantidad" type="number"
                    value="1"></td>
                    <td><button class="botonBorrar">Borrar</td>`

    fila.classList.add("juegoCarrito");

    tabla.append(fila);

    let boton_borrar = document.querySelectorAll(".botonBorrar");

    for( let boton of boton_borrar){

        boton.addEventListener("click" , borrar_juego);
    }
    
    fila.querySelector(".inputCantidad").addEventListener("change" , agregar_cantidad);

actualizar_total_compra();

}

function borrar_juego(e){

    let borrar_valor = e.target;

    borrar_valor.closest(".juegoCarrito").remove();
    actualizar_total_compra()

    Toastify({

        text: "Juego eliminado del carrito",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #B50505, #f60f0f)",
        }
        
        }).showToast();

}

function actualizar_total_compra(){
    let total = 0;
    
    let juegos_carrito = document.querySelectorAll(".juegoCarrito")

    juegos_carrito.forEach(juego_carrito => {
        let juego_carrito_precio_el = juego_carrito.querySelector(".precioCarrito")
        let juego_carrito_precio = parseFloat(juego_carrito_precio_el.textContent.replace("$" , ""));
        let juego_carrito_cant_el = juego_carrito.querySelector(".inputCantidad");
        let juego_carrito_cant = parseFloat(juego_carrito_cant_el.value);

        total = total + juego_carrito_precio * juego_carrito_cant;
    })

    total_carrito.innerHTML = `$ ${total}`;
}

function agregar_cantidad(e){
    let agregar = e.target;
    if (agregar.value <= 0){
        agregar.value = 1
    }

    actualizar_total_compra();

    Toastify({

        text: "Cantidad modificada",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #05A0FA, #1179F0)",
        }
        
        }).showToast();
}

function finalizarCompraAct() {

    if (parseFloat(total_carrito.textContent.replace("$" , "")) === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Uups...',
            text: 'No tenés productos en el carrito, seleccioná alguno para finalizar la compra.',
        })
    } 
    
    else {
        tabla.innerHTML = "";
        actualizar_total_compra();

        const { value: email } =  Swal.fire({
            icon:`success`,
            title: 'Por último...',
            input: 'email',
            inputLabel: `En aproximadamente 24 hs. hábiles recibirás la respuesta.`,
            text: 'Indicanos tu mail para que te enviemos las instrucciones de pago y finalizar la compra.',
            inputPlaceholder: 'Ingresá tu mail...'
        })

        if (email) {
            Swal.fire(`Entered email: ${email}`);            
        }
    }
}

// VER-OCULTAR CARRITO

let boton_carrito = document.querySelector(".botonCarrito");

boton_carrito.addEventListener("click", function(){

    let carrito = document.querySelector(".sectionCarro");

    if(carrito.style.display != "none"){

        carrito.style.display = "none";
    }
    else{
        carrito.style.display = "flex";
    }

} )
