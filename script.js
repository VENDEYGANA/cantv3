let recargaConInteres = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
});

function guardarDatos() {
    const cedula = document.getElementById('cedula').value;
    const correo = document.getElementById('correo').value;
    localStorage.setItem('cedula', cedula);
    localStorage.setItem('correo', correo);
}

function cargarDatos() {
    const cedula = localStorage.getItem('cedula');
    const correo = localStorage.getItem('correo');
    if (cedula) {
        document.getElementById('cedula').value = cedula;
    }
    if (correo) {
        document.getElementById('correo').value = correo;
    }
}

function validarTelefono() {
    let telefono = document.getElementById('telefono').value;
    const regex = /^02\d{9}$/;
    if (!regex.test(telefono)) {
        document.getElementById('resultado').innerText = 'El número de teléfono debe tener 11 dígitos y comenzar con 02.';
        document.getElementById('procesarButton').style.display = 'none';
        return false;
    }
    document.getElementById('resultado').innerText = '';
    return true;
}

function actualizarRecarga() {
    if (!validarTelefono()) return;

    let montoIngresado = parseFloat(document.getElementById('monto').value);
    if (isNaN(montoIngresado) || montoIngresado < 5) {
        document.getElementById('resultado').innerText = 'El monto debe ser un número mayor o igual a 5 Bs.';
        document.getElementById('procesarButton').style.display = 'none';
        return;
    }

    recargaConInteres = montoIngresado + (montoIngresado * 0.01);
    document.getElementById('resultado').innerText = `Monto a recargar más el 1%: ${recargaConInteres.toFixed(2)} Bs`;
    document.getElementById('procesarButton').style.display = 'inline-block';
}

function procesarRecarga() {
    let telefono = document.getElementById('telefono').value;
    let montoIngresado = parseFloat(document.getElementById('monto').value);
    let cedula = document.getElementById('cedula').value;
    let correo = document.getElementById('correo').value;

    const mensaje = `SOLICITUD DE RECARGA\nCédula: ${cedula}\nCorreo: ${correo}\nNúmero: ${telefono}\nMonto ingresado: ${montoIngresado.toFixed(2)} Bs\nMonto con 1% de interés: ${recargaConInteres.toFixed(2)} Bs\nEL MONTO SERA DEBITADO DE SU CUENTA VENDE Y GANA\n\nAprobación: ✅`;
    const url = `https://wa.me/584147397648?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}