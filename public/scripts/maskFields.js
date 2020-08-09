/* Máscaras ER */
function applyMask(typedKey, maskFunction) {
  setTimeout(() => {
    typedKey.value = maskFunction(typedKey.value);
  }, 1);
}

function formatValueTel(typedKey) {
  let formatedValue = typedKey;
  formatedValue = formatedValue.replace(/\D/g, ''); //Remove tudo o que não é dígito
  formatedValue = formatedValue.replace(/^(\d{2})(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
  formatedValue = formatedValue.replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
  return formatedValue;
}

function formatValueTime(typedKey) {
  let formatedValue = typedKey;
  formatedValue = formatedValue.replace(/\D/g, ''); //Remove tudo o que não é dígito
  formatedValue = formatedValue.replace(/(\d)(\d{2})$/, '$1:$2'); //Coloca hífen entre o quarto e o quinto dígitos
  return formatedValue;
}

window.onload = function () {
  document.getElementById('whatsapp').onkeyup = function () {
    applyMask(this, formatValueTel);
  };

  document.getElementById('time_from[]').onkeyup = function () {
    applyMask(this, formatValueTime);
  };

  document.getElementById('time_to[]').onkeyup = function () {
    applyMask(this, formatValueTime);
  };
};
