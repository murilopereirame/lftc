let entrys = 0;
let step = 0;
let stepEdges = undefined;
let stepNode = undefined;
let running = false;

function novaEntrada() {
    let newEntry = `<div><label for="txtInput${entrys+1}">Entrada ${entrys+1}:</label><div class="container"><input type="text" name="txtInput" id="txtInput${entrys+1}" placeholder="aaabb"/></div></div>`
    entrys++;
    $("#inputContainer").append(newEntry);
}

function stepByStep() {
    if($("#buttonsContainer") == undefined)        
        return;
    let btn = '<button class="btnPrimary" id="btnStep" type="button" onclick="nextStep()">Próximo Passo</button>';
    $("#buttonsContainer").append(btn);
}

async function nextStep() {
    let auxEdges = [];
    
    if(!running) {
        initEdges.map((item, index) => {
            auxEdges.push(network.body.data.edges.get(item));
        });

        network.body.data.nodes.map((item, index) => {
            network.body.data.nodes.update({
                id: index,
                color: '#78D1E1',
                border: '#54929D'
            });
        });

        network.body.data.edges.map((item, index) => {
            network.body.data.edges.update({
                id: item.id,
                color: '#78D1E1',
                border: '#54929D'
            });
        });
        
        stepNode = [initial.toString()];
        stepEdges = auxEdges;
        running = true;
    }

    let input = $(`#txtInput0`).val();
    let result = await validateStep(input, network, finalNodes);
    if(result == 'continue')
        return;
    else if(result == true)
        $(`#txtInput0`).css("background-color", '#67e480');
    else if(result == false)
        $(`#txtInput0`).css("background-color", '#e96379');    
        
}