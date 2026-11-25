# Vila Palmeira Boas-vindas 2027

Guia de hóspedes do Vila Palmeira Beach Resort em português e inglês. O site é estático e funciona a partir de `docs/index.html`, com CSS, JavaScript, fotografias e mapas na mesma pasta de publicação.

## Pré-visualizar

Pode abrir `docs/index.html` diretamente. Para testar por HTTP, execute este comando na raiz do projeto e abra [a pré-visualização local](http://127.0.0.1:8080/).

```sh
python -m http.server 8080 --bind 127.0.0.1 --directory docs
```

## Colocar no GitHub

Crie um repositório vazio no GitHub. Extraia o pacote para uma pasta própria e execute os comandos a partir da pasta que contém este README. Substitua `CONTA/REPOSITORIO` pelos dados do repositório.

```sh
git init -b main
git add -- .gitignore README.md docs
git commit -m "Add Vila Palmeira guest guide"
git remote add origin https://github.com/CONTA/REPOSITORIO.git
git push -u origin main
```

## Servir num servidor

Após clonar o repositório no servidor, aponte a raiz do site para a pasta `docs/` e defina `index.html` como página inicial. Se usar um alojamento com uma raiz web já configurada, envie o **conteúdo** de `docs/` para essa raiz. O site funciona num domínio próprio ou numa subpasta e dispensa Node.js, base de dados e etapa de compilação.

Exemplo para um servidor Caddy. Substitua o domínio e o caminho pelos valores do alojamento.

```caddyfile
guia.example.com {
    root * /var/www/vila-palmeira-website/docs
    file_server
}
```

Para disponibilizar uma atualização, publique o conteúdo atualizado de `docs/` a partir do novo commit. Confirme no endereço final que a página abre com estilos, que o seletor de idioma responde e que os mapas abrem em tamanho grande.

## GitHub Pages

Se preferir usar GitHub Pages, abra **Settings → Pages** no repositório. Em **Source**, escolha **Deploy from a branch**, selecione `main` e a pasta `/docs`, e guarde. [Documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Conteúdo e manutenção

- Edite `docs/index.html` para atualizar o guia. Os atributos `data-en`, `data-en-alt` e `data-en-label` contêm as versões inglesas do texto, das descrições de imagem e dos rótulos de acessibilidade.
- As fontes Cormorant Garamond e Jost são servidas localmente. As respetivas licenças SIL Open Font License estão em `docs/fonts/`.
- A secção de Wi‑Fi mantém no repositório público um pedido para contactar a receção. Para gerar uma cópia configurada para os hóspedes, defina `VILA_PALMEIRA_WIFI_PASSWORD` apenas no ambiente do processo e execute `node scripts/build-local-release.mjs`. O Node.js só é necessário nesta geração. A cópia é criada em `local-release/`, que está ignorada pelo Git, e a versão sem a variável mantém o pedido original. Esta geração apenas coloca o valor no HTML configurado. O QR code e o endereço da página não são autenticação ou controlo de acesso.
- O botão flutuante do WhatsApp usa o contacto da receção e permanece disponível durante a navegação, incluindo em ecrãs pequenos. Coloque apenas os ficheiros fonte no GitHub. Para apresentar a palavra-passe configurada, publique o conteúdo de `local-release/` no endereço atual do guia. A pasta `docs/` mantém a indicação para contactar a receção.
