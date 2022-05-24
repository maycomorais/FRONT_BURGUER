// async function listarTodos() {
//     const response = await fetch('http://localhost:3007/burguers/todos');

//     const burguers = await response.json();

    
// }

// listarTodos()


// Base url
const baseUrl = 'http://localhost:3007';

// Listar Todos
const listarTodos = async () => {
    const response = await fetch(`${baseUrl}/burguers/todos`);

    const burguers = await response.json();

    return burguers
}

// Buscar por Id
const listarPorId = async (id) => {
    const response = await fetch(`${baseUrl}/burguers/burguer/${id}`);

    if(response.status === 404){
        return "Nenhum Item encontrado"
    }

    const burguer = await response.json();

    return burguer
}

// criar lanche
const criarNovoBurguer = async (nome, ingredientes, foto, preco, categoria) => {
    const burguer = {
        nome,
        ingredientes,
        foto,
        preco,
        categoria,
    };

    const response = await fetch(`${baseUrl}/burguers/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(burguer),
    });

    const novoBurguer = await response.json();

    return(novoBurguer)
}
 

// atualizar Burguer
const refreshBurguer = async (id, nome, ingredientes, foto, preco, categoria) => {
    const burguer = {
        nome,
        ingredientes,
        foto,
        preco,
        categoria,
    };

    const response = await fetch(`${baseUrl}/burguers/refresh/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(burguer),
    });

    const burguerRefresh = await response.json();

    return burguerRefresh;
}

const deleteBurguer = async (id) => {
    const response = await fetch(`${baseUrl}/burguers/delete/${id}`, {
        method: "DELETE",
        mode: "cors"
    });

    if(response.status === 204) {
        return "Item excluído com sucesso"
    } else{
        return "Item Não encontrado"
    }

}

// Manipilação de Documento

const imprimirTodosItems = async () => {
    const burguers = await listarTodos();

    burguers.forEach((element) =>{
        if (element.categoria == 'lanche'){
        document.getElementById('card').insertAdjacentHTML(
            'beforeend', `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                    <a class="editar" href="editar"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="deletar" href="deletar"><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>
            `)}
    });
    burguers.forEach((element) =>{
        if (element.categoria == 'bebida'){
        document.getElementById('card2').insertAdjacentHTML(
            'beforeend', `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                    <a class="editar" href="editar"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="deletar" href="deletar"><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>
            `)}
    });
    burguers.forEach((element) =>{
        if (element.categoria == 'porção'){
        document.getElementById('card3').insertAdjacentHTML(
            'beforeend', `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                    <a class="editar" href="editar"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="deletar" href="deletar"><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>
            `)}
    });
    burguers.forEach((element) =>{
        if (element.categoria == 'sobremesa'){
        document.getElementById('card4').insertAdjacentHTML(
            'beforeend', `
            <div class="box">
                <img src="${element.foto}" alt="${element.nome}">
                <div class="nome"> ${element.nome}</div>
                <div class="descricao"> ${element.ingredientes} </div>
                <div class="preco"><span>R$ </span>${element.preco}</div>
                <div class="button">
                    <a class="editar" href="editar"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="deletar" href="deletar"><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>
            `)}
    });
};

imprimirTodosItems()

const printarPorId = async () => {
    const id = document.getElementById("inputIdburguer").value;
    
    const burguer = await listarPorId(id);

    if (typeof burguer === false){
        const mensagemDeErro = document.createElement('p');
        mensagemDeErro.id = "mensagemDeErro"
        mensagemDeErro.className.padEnd('MensagemDeErro')

        document.getElementById('pesquisar').innerText = "Nenhum burguer encontrado";
    }

    document.getElementById('pesquisado').innerHTML = `
        <div class="box">
            <img src="${burguer.foto}" alt="${burguer.nome}">
            <div class="nome"> ${burguer.nome}</div>
            <div class="descricao"> ${burguer.ingredientes} </div>
            <div class="preco"><span>R$ </span>${burguer.preco}</div>
            <div class="button">
                <a class="editar" href="editar"><i class="fa-solid fa-pen-to-square"></i></a>
                <a class="deletar" href="deletar"><i class="fa-solid fa-trash-can"></i></a>
            </div>
        </div>
    `;

};
document.getElementById('printarPorId').addEventListener('click', printarPorId)