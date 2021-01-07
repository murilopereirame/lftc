let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);

let initial = "";
let initEdges = [];

let finalNodes = [];

let container = document.getElementById("mynetwork");

let data = {
    nodes: nodes,
    edges: edges,
};

let options = {
    physics: {
        enabled: false
    },
    edges:{
        arrows: {
            to: {
                enabled: true,                            
                scaleFactor: 1,
                type: "arrow"
            },
        }
    },
    manipulation: {
        enabled: true,
    },
    locale: 'pt-br'
};

let network = new vis.Network(container, data, options);

//Função para lidar com o click simples
network.on('click', function(params) {
    console.log(network.body)
})

//Handler para duplo click
/*
    ===Aqui fica a parte em que são realizadas===|
    |-> Troca do label do nó                     |
    |-> Troca do label da transição              |
    =============================================|
*/
network.on("doubleClick", function (params) {                                
    if(params.nodes[0] !== undefined) {
        let label = prompt("Insira um rótulo para o nó", "");
        if(label == null)
            return;
        network.body.data.nodes.update([
            {
                id:params.nodes[0], 
                label: label,
                hidden: false
            }
        ]);                         
    } else if(params.edges[0] !== undefined) {
        let label = prompt("Insira um rótulo para a aresta", "");
        if(label == null)
            return;
        network.body.data.edges.update([
            {
                id:params.edges[0], 
                label: label,  
                hidden: false
            }
        ]);       
    }
});

//Handler para clicar e segurar
/*
    ===Aqui fica a parte em que são realizadas===|
    |-> Definição do estado inicial              |
    |-> Definição do estado final                |
    =============================================|
*/
network.on("hold", function (params) {    
    let label = prompt("[S]tart\n[F]inal", "");
    if(label == null)
        return;

    if(label == 'S') {
        if(params.nodes[0] !== undefined) {        
            if(initial != "") {
                network.body.data.nodes.update([
                    {
                        id:initial, 
                        shape: 'elipse'
                    }
                ]);
            }

            initial = params.nodes[0]
            initEdges = params.edges;

            network.body.data.nodes.update([
                {
                    id:params.nodes[0], 
                    shape: 'triangle'
                }
            ]);                         
        }
    } else {
        if(params.nodes[0] !== undefined) {        
            if(finalNodes.length > 0) {
                if(finalNodes.includes(params.nodes[0])) {
                    network.body.data.nodes.update([
                        {
                            id:params.nodes[0]                            
                        }
                    ]);

                    let index =  finalNodes.indexOf(params.nodes[0]);

                    finalNodes.splice(index, 1)

                    return;
                }
            }

            finalNodes.push(params.nodes[0]);            

            network.body.data.nodes.update([
                {
                    id:params.nodes[0],
                    borderWidth: 3,
                    borderWidthSelected: 3.5,
                    backgroundColor: '#DB2C0C'       
                }
            ]);                         
        }
    }
})