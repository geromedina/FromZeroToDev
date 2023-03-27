function laCajaDePandora(num) {
  if (num % 2 === 0) {
    // es par, convertir a binario
    return num.toString(2);
  } else {
    // es impar, convertir a hexadecimal
    return num.toString(16);
  }
}
// a ver si anda la prote
