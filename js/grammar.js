let entrys = 0;
let inputs = 1;

function validateGrammar(grammar, input) {
    let auxArray = new Map();
    grammar.map((item, value) => {
        if (auxArray.get(item[0]) !== undefined)
            auxArray.set(item[0], `${auxArray.get(item[0])}${item[1]}|`);
        else
            auxArray.set(item[0], `${item[1]}|`);
    })

    auxArray.forEach((value, key, map) => {
        auxArray.set(key, value.substr(0, value.length - 1));
    })

    let ER = findReplace(auxArray.get('S'), auxArray);
    while (ER != findReplace(ER, auxArray)) {
        ER = findReplace(ER, auxArray);
    }

    ER = ER.replace("ε", "\\b");
    ER = ER.replace("λ", "\\b");

    var regexp = new RegExp(ER)

    return regexp.test(input);
}

function findReplace(input, grammar) {
    let i = 0;
    let newString = input;
    while (i < input.length) {
        if (grammar.has(input[i])) {
            newString = newString.replace(input[i], `(${grammar.get(input[i])})`);
        }
        i++;
    }

    return newString;
}

function reset() {
    const resetbtn = document.querySelector("#reset")
    var r = confirm("Resetar irá excluir sua gramática atual. Você tem certeza disso?")
    if (r == true) {
        window.parent.location = window.parent.location.href;
    }
}

function newProd() {
    let prod = "<div class='ctnFlex'>"
        + "<div class='col-nt'>"
        + `<input type='text' id='key-${entrys}' class='form-control' />`
        + "</div>"
        + "<div id='arrow'>→</div>"
        + "<div class='col-pr'>"
        + `<input type='text' class='form-control' id='value-${entrys}' placeholder='ε' />`
        + "</div>"
        + "</div>"

    entrys++;
    $('.container').append(prod)
}

function addEntrada() {
    let newInput = `<input name="test" id="input-${inputs}" cols="10" rows="7"></input>`;
    $(".input-area").append(newInput);
    inputs++;
}

function validarEntradas() {
    let initValue = $('#start-grammar').val();
    let grammar = [['S', initValue]];

    for(let i = 0; i < entrys; i++) {
        let key = $(`#key-${i}`).val();
        let value = $(`#value-${i}`).val();

        grammar.push([key, value])
    }

    for(let i = 0; i < inputs; i++) {
        let inputValue = $(`#input-${i}`).val();
        let result = validateGrammar(grammar, inputValue);

        if(result)
            $(`#input-${i}`).css("background-color", '#67e480');
        else
            $(`#input-${i}`).css("background-color", '#e96379');
    }
}