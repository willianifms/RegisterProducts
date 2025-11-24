import express from "express";

const host = "0.0.0.0";
const porta = 3000;
var listaProdutos = [];

const server = express();

server.use(express.urlencoded({ extended: true }));

server.get("/logout", (requisicao, resposta) => {
    resposta.send(`<h1>Logout efetuado com sucesso!</h1>`);
});

server.get("/", (requisicao, resposta) => {
    resposta.send(`
        <DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <title>Menu do Sistema</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MENU</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastros
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/cadastroProduto">Produtos</a></li>
                        </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/listarProduto">Lista de Produtos cadastrados</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                        </li>

                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/login">Entrar</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
    `);
});

server.get("/Login", (requisicao, resposta) => {
    resposta.send(`
        <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login Produto</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: #f2f5f9;
        }

        .login-card {
            max-width: 400px;
            margin: 80px auto;
            padding: 30px;
            border-radius: 20px;
            background: #ffffff;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .login-title {
            font-weight: 600;
        }
    </style>
</head>
<body>

<div class="login-card">
    <h3 class="text-center login-title mb-4">Entrar</h3>

    <form id="loginForm">
        <div class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="teste@teste.com">
        </div>

        <div class="mb-3">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" placeholder="123">
        </div>

        <button type="submit" class="btn btn-primary w-100 mt-3">Acessar</button>
    </form>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const emailCorreto = "teste@teste.com";
    const senhaCorreta = "123";

    if (email === emailCorreto && senha === senhaCorreta) {
        alert("Login realizado com sucesso!");

        window.location.href = "/";
    } else {
        alert("Usuário ou senha incorretos!");
    }

});
</script>

</body>
</html>

`); 

});

// Rotas de Produto
// ------------------------------------------------------------------

server.get("/cadastroProduto", (requisicao, resposta) => {
    resposta.send(`
        <DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>Cadastro de Produto</title>
    </head>

    <body>
        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produto</h1>
            <form method="POST" action="/adicionarProduto" class="row g-3 m-3 p-3 bg-light">
                <div class="col-md-12">
                    <label for="descricao" class="form-label">Descrição do Produto</label>
                    <input type="text" class="form-control" id="descricao" name="descricao" required>
                </div>

                <div class="col-md-4">
                    <label for="custo" class="form-label">Preço de Custo (R$)</label>
                    <input type="number" step="0.01" min="0" class="form-control" id="custo" name="custo" required>
                </div>

                <div class="col-md-4">
                    <label for="venda" class="form-label">Preço de Venda (R$)</label>
                    <input type="number" step="0.01" min="0" class="form-control" id="venda" name="venda" required>
                </div>

                <div class="col-md-4">
                    <label for="estoque" class="form-label">Qtd em Estoque</label>
                    <input type="number" min="0" class="form-control" id="estoque" name="estoque" required>
                </div>
                
                <div class="col-md-6">
                    <label for="validade" class="form-label">Data de Validade</label>
                    <input type="date" class="form-control" id="validade" name="validade">
                </div>

                <div class="col-md-6">
                    <label for="fabricante" class="form-label">Nome do Fabricante</label>
                    <input type="text" class="form-control" id="fabricante" name="fabricante" required>
                </div>
            
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
            </form>
        </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>

    `);
})

server.post('/adicionarProduto', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao;
    const custo = requisicao.body.custo;
    const venda = requisicao.body.venda;
    const validade = requisicao.body.validade;
    const estoque = requisicao.body.estoque;
    const fabricante = requisicao.body.fabricante;

    if (descricao && custo && venda && estoque && fabricante) {
        listaProdutos.push({ descricao, custo, venda, validade, estoque, fabricante });
        resposta.redirect("/listarProduto");
    }
    else {
        let conteudo = `
        
        <DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <title>Cadastro de Produto</title>
            </head>
            <body>
                <div class="container">
                    <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produto</h1>
                    <form method="POST" action="/adicionarProduto" class="row g-3 m-3 p-3 bg-light">
                            <div class="col-md-12">
                                <label for="descricao" class="form-label">Descrição do Produto</label>
                                <input type="text" class="form-control" id="descricao" name="descricao" value="${descricao}">
                                
                                ${!descricao ? '<div><p class="text-danger">Por favor, informe a descrição do produto</p></div>' : ''}
                            </div>

                            <div class="col-md-4">
                                <label for="custo" class="form-label">Preço de Custo (R$)</label>
                                <input type="number" step="0.01" min="0" class="form-control" id="custo" name="custo" value="${custo}">
                                
                                ${!custo ? '<div><p class="text-danger">Por favor, informe o preço de custo</p></div>' : ''}
                            </div>

                            <div class="col-md-4">
                                <label for="venda" class="form-label">Preço de Venda (R$)</label>
                                <input type="number" step="0.01" min="0" class="form-control" id="venda" name="venda" value="${venda}">
                                
                                ${!venda ? '<div><p class="text-danger">Por favor, informe o preço de venda</p></div>' : ''}
                            </div>

                            <div class="col-md-4">
                                <label for="estoque" class="form-label">Qtd em Estoque</label>
                                <input type="number" min="0" class="form-control" id="estoque" name="estoque" value="${estoque}">
                                
                                ${!estoque ? '<div><p class="text-danger">Por favor, informe a quantidade em estoque</p></div>' : ''}
                            </div>

                            <div class="col-md-6">
                                <label for="validade" class="form-label">Data de Validade</label>
                                <input type="date" class="form-control" id="validade" name="validade" value="${validade}">
                            </div>

                            <div class="col-md-6">
                                <label for="fabricante" class="form-label">Nome do Fabricante</label>
                                <input type="text" class="form-control" id="fabricante" name="fabricante" value="${fabricante}">
                                
                                ${!fabricante ? '<div><p class="text-danger">Por favor, informe o nome do fabricante</p></div>' : ''}
                            </div>
                        
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
        
        `;
        resposta.send(conteudo);
    }
});

server.get("/listarProduto", (requisicao, resposta) => {
    let conteudo = `
        <DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <title>Lista de Produtos no Sistema</title>
            </head>
            <body>
                <div class="container">
                    <h1 class="text-center border m-3 p-3 bg-light">Lista de Produtos</h1>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Custo (R$)</th>
                                <th>Venda (R$)</th>
                                <th>Estoque</th>
                                <th>Validade</th>
                                <th>Fabricante</th>
                            </tr>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < listaProdutos.length; i++) {
        conteudo += `
            <tr>
                <td>${listaProdutos[i].descricao}</td>
                <td>${listaProdutos[i].custo}</td>
                <td>${listaProdutos[i].venda}</td>
                <td>${listaProdutos[i].estoque}</td>
                <td>${listaProdutos[i].validade}</td>
                <td>${listaProdutos[i].fabricante}</td>
            </tr>
        `;
    }
    conteudo += `
                        </tbody>
                    </table>
                    <a class="btn btn-secondary" href="/cadastroProduto">Cadastrar Novo Produto</a>
                    <a class="btn btn-info text-white" href="/">Voltar ao Menu</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
    `
    resposta.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});