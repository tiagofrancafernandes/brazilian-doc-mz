document.getElementById("gerar").addEventListener("click", function () {
  generateAndCopy();
});

function sendFeedback() {
  let timeout = 5000;

  let feedbackItem = document.querySelector('[item-type="feedback"]');

  if (!feedbackItem) {
    return;
  }

  feedbackItem.appendChild(document.createTextNode(browser.i18n.getMessage("SuccessfullyCopied"))),
    feedbackItem.classList.add("active");

  setTimeout(() => {
    feedbackItem.innerHTML = "";
  }, timeout);
}

function copyNumber() {
  let numberInputElement = document.querySelector('input[name="numero"]');
  if (!numberInputElement || !numberInputElement.value) {
    return;
  }

  navigator.clipboard.writeText(numberInputElement.value);
  sendFeedback();
}

document.querySelector('button[action-type="copy"]').addEventListener("click", function (event) {
  event.preventDefault();
  copyNumber();
});

let create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
let number_random = (number) => Math.round(Math.random() * number);
let mod = (dividendo, divisor) => Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

function generateAndCopy() {
  let numberInputElement = document.querySelector('input[name="numero"]');

  if (!numberInputElement) {
    return;
  }

  numberInputElement.value = document.form_main.tipo[0].checked ? cpf() : cnpj(); //TODO change way to get item

  copyNumber();
}

function cpf() {
  let total_array = 9;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n);

  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  if (document.form_main.mascara.checked) return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
  else return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

function cnpj() {
  let total_array = 8;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
  let n9 = 0;
  let n10 = 0;
  let n11 = 0;
  let n12 = 1;

  let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n12 * 3 +
    n11 * 4 +
    n10 * 5 +
    n9 * 6 +
    n8 * 7 +
    n7 * 8 +
    n6 * 9 +
    n5 * 2 +
    n4 * 3 +
    n3 * 4 +
    n2 * 5 +
    n1 * 6;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  if (document.form_main.mascara.checked)
    return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
  else return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}
