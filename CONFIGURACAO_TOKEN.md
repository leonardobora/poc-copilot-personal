# 🔐 Configuração do Personal Access Token (PAT)

## ✅ Status
- **Token adicionado**: ✓ Configurado
- **Arquivo .env criado**: ✓ Sim
- **Configuração validada**: ⚠️ Parcial (requer organização GitHub)

---

## 📝 O que foi configurado

### 1. Arquivo .env Criado
O arquivo `.env` foi criado em `src/dashboard/.env` com as seguintes configurações:

```env
GITHUB_ENTERPRISE=leonardobora
GITHUB_ORGANIZATION=leonardobora
GITHUB_TOKEN=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
GITHUB_API_VERSION=2022-11-28
GITHUB_API_SCOPE=organization
```

**⚠️ IMPORTANTE**: O arquivo `.env` está configurado no `.gitignore` e **NÃO será commitado** ao repositório. Isso protege seu token de acesso.

### 2. Script de Validação
Foi criado um script de validação (`validate-config.js`) que verifica:
- ✓ Presença de todas as variáveis de ambiente necessárias
- ✓ Formato correto do token
- ✓ Conectividade com a API do GitHub
- ✓ Acesso à API de Métricas do Copilot

**Para executar a validação:**
```bash
cd src/dashboard
npm run validate
```

---

## ⚠️ Observações Importantes

### GitHub Copilot Metrics API - Requisitos

A **GitHub Copilot Metrics API** é projetada para **organizações e empresas**, não para contas pessoais individuais. Para utilizar este dashboard, você precisa:

#### Opção 1: Conta Pessoal com Copilot Individual
Se você tem **GitHub Copilot Individual** (conta pessoal):
- ❌ A API de métricas **não está disponível**
- ❌ Este dashboard não funcionará
- ℹ️ O Copilot Individual não expõe métricas de uso via API

#### Opção 2: Membro de Organização
Se você é **membro de uma organização** com GitHub Copilot Business/Enterprise:
1. ✓ Configure `GITHUB_ORGANIZATION` com o nome da sua organização
2. ✓ Certifique-se de que seu token tem as permissões corretas
3. ✓ Verifique se a organização habilitou a Copilot Metrics API

**Exemplo para organização:**
```env
GITHUB_ORGANIZATION=nome-da-sua-organizacao
GITHUB_ENTERPRISE=nome-da-sua-organizacao
```

---

## 🔑 Permissões do Token

Para funcionar corretamente, seu Personal Access Token precisa dos seguintes **scopes**:

### Scopes Obrigatórios:
- ✅ `copilot` - Acesso às métricas do Copilot
- ✅ `manage_billing:copilot` - Gerenciamento de assentos do Copilot
- ✅ `read:org` - Leitura de dados da organização
- ✅ `read:user` - Leitura de perfil de usuários

### Como Criar/Atualizar seu Token:
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Selecione os scopes listados acima
4. Defina uma expiração apropriada (recomendado: 90 dias para POC)
5. Gere o token e copie-o imediatamente

---

## 🚀 Próximos Passos

### Cenário A: Você está em uma Organização

1. **Atualize o arquivo .env** com o nome correto da organização:
   ```bash
   cd src/dashboard
   nano .env  # ou use seu editor preferido
   ```

2. **Modifique as linhas:**
   ```env
   GITHUB_ORGANIZATION=sua-organizacao-aqui
   GITHUB_ENTERPRISE=sua-organizacao-aqui
   ```

3. **Valide a configuração:**
   ```bash
   npm run validate
   ```

4. **Inicie o dashboard:**
   ```bash
   npm run dev
   ```

5. **Acesse:** http://localhost:3000

### Cenário B: Você tem Copilot Individual (Conta Pessoal)

Infelizmente, o GitHub Copilot para contas individuais **não expõe métricas via API**. 

**Alternativas:**
1. **Use o dashboard da GitHub:** https://github.com/settings/copilot
   - Veja suas estatísticas pessoais diretamente no GitHub
   
2. **Solicite acesso a uma organização:**
   - Entre em contato com sua empresa/organização
   - Peça para ser adicionado à licença corporativa do Copilot
   
3. **Crie uma organização de teste:**
   - Crie uma organização gratuita no GitHub
   - Adicione uma licença de teste do Copilot Business (se disponível)

---

## 🔧 Verificação da Configuração

### Comando Rápido:
```bash
cd src/dashboard
npm run validate
```

### O que o script valida:

#### ✓ Variáveis de Ambiente
- `GITHUB_ORGANIZATION` está configurado
- `GITHUB_ENTERPRISE` está configurado
- `GITHUB_TOKEN` está presente (mascarado na saída)
- `GITHUB_API_VERSION` está configurado
- `GITHUB_API_SCOPE` é válido (`organization` ou `enterprise`)

#### ✓ Conectividade
- Testa conexão com `api.github.com`
- Verifica autenticação do token
- Mostra informações do usuário autenticado

#### ✓ API de Métricas
- Tenta acessar `/orgs/{org}/copilot/metrics`
- Reporta se há dados disponíveis
- Identifica problemas de permissão ou configuração

---

## 🐛 Troubleshooting

### Erro 404 - Not Found
**Causas possíveis:**
- Nome da organização incorreto
- Você não tem acesso à organização
- A organização não tem Copilot habilitado
- Você está usando conta pessoal (não suportado)

**Solução:**
- Verifique o nome exato da organização em https://github.com/settings/organizations
- Confirme que você é membro da organização
- Peça ao admin para habilitar Copilot Metrics API

### Erro 401/403 - Unauthorized/Forbidden
**Causas possíveis:**
- Token expirado ou inválido
- Falta de permissões (scopes) no token
- Token não tem acesso à organização

**Solução:**
- Gere um novo token com os scopes corretos
- Verifique se você tem acesso à organização
- Confirme que o token não expirou

### Nenhum Dado Aparece
**Causas possíveis:**
- Copilot foi habilitado recentemente (< 24-48 horas)
- Nenhum desenvolvedor está usando ativamente
- API ainda está coletando dados

**Solução:**
- Aguarde 24-48 horas após habilitar o Copilot
- Certifique-se de que desenvolvedores estão usando o Copilot
- Verifique em https://github.com/orgs/SUA-ORG/copilot/usage

---

## 📊 Extração de Métricas do Usuário Atual

### Como Funciona

O dashboard extrai métricas através da **GitHub Copilot Metrics API**:

```
GET https://api.github.com/orgs/{organization}/copilot/metrics
```

### Dados Disponíveis:

1. **Métricas de Aceitação:**
   - Total de sugestões geradas
   - Total de sugestões aceitas
   - Taxa de aceitação (%)

2. **Usuários Ativos:**
   - Número de usuários ativos no período
   - Lista de usuários e suas atividades

3. **Breakdown por Linguagem:**
   - Uso do Copilot por linguagem de programação
   - Taxa de aceitação por linguagem

4. **Breakdown por Editor:**
   - VS Code
   - JetBrains IDEs
   - Neovim
   - Visual Studio
   - Outros

5. **Informações de Assentos:**
   - Total de licenças
   - Assentos ativos
   - Assentos inativos
   - Última utilização por usuário

### Filtros Disponíveis:
- **Período:** Data inicial e final
- **Time Frame:** Diário, Semanal, Mensal
- **Linguagens:** Filtrar por linguagens específicas
- **Editores:** Filtrar por editores específicos
- **Times:** Filtrar por times da organização

---

## 📚 Recursos Adicionais

### Documentação Oficial:
- [GitHub Copilot Metrics API](https://docs.github.com/en/rest/copilot/copilot-metrics)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Copilot Business](https://docs.github.com/en/copilot/overview-of-github-copilot/about-github-copilot-business)

### Arquivos de Referência:
- [README.md](../../README.md) - Documentação principal do projeto
- [POC_SETUP_GUIDE.md](../../POC_SETUP_GUIDE.md) - Guia completo de setup da POC
- [QUICK_START.md](../../QUICK_START.md) - Início rápido

---

## 🔒 Segurança

### ⚠️ NUNCA faça commit do arquivo .env
O arquivo `.env` contém seu token de acesso pessoal. **NUNCA** o commite ao repositório.

**Proteções implementadas:**
- ✅ `.env` está em `.gitignore`
- ✅ Token é mascarado no script de validação
- ✅ Arquivo é local apenas

### Se o token foi exposto:
1. **Revogue imediatamente:** https://github.com/settings/tokens
2. Gere um novo token
3. Atualize o arquivo `.env`
4. Verifique o histórico do git para garantir que não foi commitado

---

## ✅ Checklist de Configuração Completa

- [x] Arquivo `.env` criado em `src/dashboard/.env`
- [x] Token de acesso pessoal adicionado
- [x] Script de validação criado (`validate-config.js`)
- [x] Comando `npm run validate` disponível
- [ ] Organização GitHub configurada corretamente
- [ ] Token com scopes adequados
- [ ] Copilot Metrics API habilitada na organização
- [ ] Validação executada com sucesso
- [ ] Dashboard iniciado e funcionando

---

**Data de Configuração:** 20 de Outubro de 2025  
**Versão do Token:** Classic PAT  
**Próxima Revisão:** Verificar se a organização está configurada corretamente
