function verifica() {
  var pattern = document.querySelector('#txtRegex').value;
  var test1 = document.querySelector('#txtTeste1');
  var test2 = document.querySelector('#txtTeste2');

  var regexp = new RegExp(pattern,)

  if (regexp.test(test1.value))
    test1.style.backgroundColor = "#67e480";
  else
    test1.style.backgroundColor = "#e96379";

  if (regexp.test(test2.value))
    test2.style.backgroundColor = "#67e480";
  else
    test2.style.backgroundColor = "#e96379";
}

$(document).ready(function () {
  $("#txtRegex").on("keyup", function () {
    verifica();
  });
  $("#txtTeste1").on("keyup", function () {
    verifica();
  });
  $("#txtTeste2").on("keyup", function () {
    verifica();
  });
});