/* Máscaras ER */
function applyMask(typedKey, maskFunction) {
  setTimeout(() => {
    typedKey.value = maskFunction(typedKey.value);
  }, 1);
}

function formatValueTel(typedKey) {
  let formatedValue = typedKey;

  // Remove tudo o que não é dígito
  formatedValue = formatedValue.replace(/\D/g, '');
  // Coloca parênteses em volta dos dois primeiros dígitos
  formatedValue = formatedValue.replace(/^(\d{2})(\d)/g, '($1) $2');
  // Coloca hífen entre o quarto e o quinto dígitos
  formatedValue = formatedValue.replace(/(\d)(\d{4})$/, '$1-$2');

  return formatedValue;
}

function formatValueTime(typedKey) {
  let formatedValue = typedKey;

  // Remove tudo o que não é dígito
  formatedValue = formatedValue.replace(/\D/g, '');
  // Coloca dois pontos entre o segundo e o terceiro dígitos
  formatedValue = formatedValue.replace(/(\d)(\d{2})$/g, '$1:$2');

  return formatedValue;
}

function formatValueCurrency(typedKey) {
  let formatedValue = typedKey;

  // Remove tudo o que não é dígito
  formatedValue = formatedValue.replace(/\D/g, '');
  // Coloca dois pontos entre o segundo e o terceiro dígitos
  formatedValue = formatedValue.replace(/(\d)(\d{2})$/g, '$1,$2');

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

  document.getElementById('time').onkeyup = function () {
    applyMask(this, formatValueTime);
  };

  document.getElementById('cost').onkeyup = function () {
    applyMask(this, formatValueCurrency);
  };
};
