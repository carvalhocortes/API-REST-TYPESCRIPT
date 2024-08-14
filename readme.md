# uma API REST

# Antes de testar

Foi enviado um arquivo .env no e-mail. este deve ser salvo na raiz do diretório (junto ao package.json).
Não compartilhar a chave da API.

# Para executar o Docker

Para instalar o Docker acessar o site abaixo:

[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

No terminal

```SH
docker-compose up --build
```

# Para testes

[Aqui](https://drive.google.com/file/d/1ehwOB1Jk4HyV0ei12yeu5nq82HIz1pLb/view?usp=sharing) temos arquivos do postman para realizar os testes da API.

# Documentação

A documentação foi feita utilizando padrão opemApi e com a biblioteca Redocly.

Primeiro passo é fazer o build.

```SH
node rum docs
```

Vai ser aberto um host para ver os arquivos no navegador.

[localhost](http://localhost:8080/)
