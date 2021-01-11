async function valideInput(input) {
    let auxEdges = [];

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

    let initialNode = {
        id: initial.toString(),
        edges: auxEdges
    }

    return await validator(input, network, initialNode, finalNodes);    
}

async function validarEntradas() {
    for(let i = 0; i <= entrys; i++) {
        let input = $(`#txtInput${i}`).val();
        let result = await valideInput(input);
        let color = '#FFF';
        if(result)
            color = '#67e480';
        else
            color = '#e96379';
        $(`#txtInput${i}`).css("background-color", color);
    }    
}

async function validator(input, network, initial, final) {    
    let actualNode = [];
    let actualEdges = initial.edges;
    let whileIndex = 0;
    actualNode.push(initial.id);

    while(whileIndex < input.length) {            
        let auxEdges = [];
        let auxNodes = [];        
        actualEdges.map((edge, index) => {              
            if(edge.label == input[whileIndex]) {                   
                network.body.data.nodes.update({
                    id: edge.from,
                    color: '#67e480',
                    border: '#489F59'
                });             
                network.body.data.edges.update({
                    id: edge.id,
                    color: '#67e480',
                    border: '#489F59'
                });               
                network.body.data.nodes.update({
                    id: edge.to,
                    color: '#67e480',
                    border: '#489F59'
                });                
                
                network.body.data.edges.map((edgeTwo, indexTwo) => {
                    if(edgeTwo.from == edge.to)
                        auxEdges.push(edgeTwo);
                });                                                
                auxNodes.push(edge.to);
            }
        });
        actualEdges = auxEdges;
        actualNode = auxNodes;
        whileIndex++;
    }

    if(whileIndex == input.length) {
        let valido = false;           
        actualNode.map(async (item, index) => {            
            if(final.includes(item)) { 
                network.body.data.nodes.update({
                    id: item,
                    color: '#67e480',
                    border: '#489F59'
                });
                valido = true;
            }
        })

        return valido;
    }        
    else
        return false;
}

async function validateStep(input, network, final) {
    let actualNode = stepNode;
    let actualEdges = stepEdges; 
          
    let auxEdges = [];
    let auxNodes = [];        
    actualEdges.map((edge, index) => {              
        if(edge.label == input[step]) {                   
            network.body.data.nodes.update({
                id: edge.from,
                color: '#67e480',
                border: '#489F59'
            });               
            
            network.body.data.edges.update({
                id: edge.id,
                color: '#67e480',
                border: '#489F59'
            });               
            network.body.data.nodes.update({
                id: edge.to,
                color: '#67e480',
                border: '#489F59'
            });                
            
            network.body.data.edges.map((edgeTwo, indexTwo) => {
                if(edgeTwo.from == edge.to)
                    auxEdges.push(edgeTwo);
            });                                                
            auxNodes.push(edge.to);
        }
    });
    stepEdges = auxEdges;
    stepNode = auxNodes;
    actualNode = auxNodes;
    let finish = false;
    if(step == input.length-1) {          
        actualNode.map(async (item, index) => {
            if(final.includes(item)) {                
                network.body.data.nodes.update({
                    id: item,
                    color: '#67e480',
                    border: '#489F59'
                });
                step = 0;                
                finish = true;
            }
        })
        step = 0;
        stepNode = undefined;
        stepEdges = undefined;
        running = false;
        return finish;
    }        
    else {
        step++;
        return 'continue';
    }
}

// (
//     validarExpAutomato(index, 1)
//     procurar um pipe que tenha index < que o index do proximo parentese de fechamento que tenha um index > que o proximo parenteses de abertura