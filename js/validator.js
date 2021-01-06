function valideInput(input) {
    let auxEdges = [];

    initEdges.map((item, index) => {
        auxEdges.push(network.body.data.edges.get(item));
    });

    let initialNode = {
        id: initial.toString(),
        edges: auxEdges
    }

    let result = validator(input, network, initialNode, finalNodes);
    
    alert(result);
}


function validator(input, network, initial, final) {    
    let actualNode = [];
    let actualEdges = initial.edges;
    let whileIndex = 0;
    actualNode.push(initial.id);

    while(whileIndex < input.length) {            
        let auxEdges = [];
        let auxNodes = [];
        actualEdges.map((edge, index) => {  
            if(edge.label == input[whileIndex]) {
                let id = edge.to;
                network.body.data.nodes.update({
                    id,
                    color: '#2777E3',
                });
                
                network.body.data.edges.map((edgeTwo, indexTwo) => {
                    if(edgeTwo.from == id)
                        auxEdges.push(edgeTwo);
                });

                auxNodes.push(id);
            }
        });
        actualEdges = auxEdges;
        actualNode = auxNodes;
        whileIndex++;
    }

    if(whileIndex == input.length) {
        let valido = false;
        actualNode.map((item, index) => {
            if(final.includes(item))
                valido = true;
        })

        return valido;
    }        
    else
        return false;
}

// (
//     validarExpAutomato(index, 1)
//     procurar um pipe que tenha index < que o index do proximo parentese de fechamento que tenha um index > que o proximo parenteses de abertura