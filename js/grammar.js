function validateGrammar(grammar, input) {
    let auxArray = new Map();
    grammar.map((item, value) => {        
        if(auxArray.get(item[0]) !== undefined)
            auxArray.set(item[0], `${auxArray.get(item[0])}${item[1]}|`);
        else
            auxArray.set(item[0], `${item[1]}|`);
    })

    auxArray.forEach((value, key, map) => {
        auxArray.set(key, value.substr(0, value.length - 1));
    }) 
    
    let ER = findReplace(auxArray.get('S'), auxArray);
    while(ER != findReplace(ER, auxArray)) {
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
    while(i < input.length) {
        if(grammar.has(input[i])) {
            newString = newString.replace(input[i], `(${grammar.get(input[i])})`);
        }
        i++;
    }

    return newString;
}