function laCajaDePandora(numero) {
  if (numero % 2 === 0) {
    return (numero >>> 0).toString(2);
  } else return (numero >>> 0).toString(16);
}
