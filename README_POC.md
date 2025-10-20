# 🚀 POC - GitHub Copilot Metrics Dashboard
## Organização: FurukawaLatam

[![GitHub](https://img.shields.io/badge/GitHub-Original-blue)](https://github.com/microsoft/copilot-metrics-dashboard)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Sobre Este Repositório

Este é o repositório da **Prova de Conceito (POC)** do GitHub Copilot para a organização **FurukawaLatam**. 

O projeto utiliza o [GitHub Copilot Metrics Dashboard](https://github.com/microsoft/copilot-metrics-dashboard) oficial da Microsoft para:
- 📊 Monitorar métricas de uso do Copilot
- 📈 Avaliar produtividade e impacto na equipe
- 💰 Calcular ROI e justificar adoção
- 🎯 Apresentar resultados para stakeholders

---

## 🎯 Status da POC

- ✅ **Repositório criado**: 20 de Outubro de 2025
- ✅ **Ambiente local configurado**: Pronto para uso
- ✅ **Documentação completa**: Guias de setup e gestão
- ⏳ **Aguardando**: Habilitação da Copilot Metrics API pelo admin da organização

---

## 📚 Documentação

### 🚀 Início Rápido
- [**QUICK_START.md**](QUICK_START.md) - Checklist rápido de configuração
- [**POC_SETUP_GUIDE.md**](POC_SETUP_GUIDE.md) - Guia completo de setup e execução da POC

### 📊 Gestão da POC
- [**COMO_GERENCIAR_POC.md**](COMO_GERENCIAR_POC.md) - Como usar este repositório para gerenciar a POC
- [**PEDIDO_PARA_GERENTE.md**](PEDIDO_PARA_GERENTE.md) - Documento para solicitar habilitação da API

### 📖 Documentação Original
- [README.md Original](README.md) - Documentação completa do projeto Microsoft

---

## ⚙️ Configuração Rápida

### Pré-requisitos
- ✅ Node.js v22+ instalado
- ✅ GitHub Personal Access Token com scopes: `copilot`, `manage_billing:copilot`, `read:org`
- ⏳ Copilot Metrics API habilitada na organização (aguardando)

### Instalação

```powershell
# Clone o repositório
git clone https://github.com/leonardobora-lightera/poc-copilot.git
cd poc-copilot

# Navegue até a pasta do dashboard
cd src/dashboard

# Instale as dependências
npm install

# Configure o .env
# Copie o .env.example e preencha com suas credenciais
cp .env.example .env

# Execute o dashboard
npm run dev
```

Acesse: http://localhost:3000

---

## 🔑 Próximo Passo: Habilitar API

**⚠️ IMPORTANTE:** O dashboard não funcionará até que um administrador da organização **FurukawaLatam** habilite o acesso à **Copilot Metrics API**.

### Para o Administrador:
1. Acesse: https://github.com/organizations/FurukawaLatam/settings/copilot
2. Habilite a opção **"Enable Copilot Metrics API access"**
3. Salve as alterações

📄 **Documento completo para o admin:** [PEDIDO_PARA_GERENTE.md](PEDIDO_PARA_GERENTE.md)

---

## 📊 O que o Dashboard Mostra

### Página Principal
- 📈 **Taxa de Aceitação**: % de sugestões aceitas pelos desenvolvedores
- 👥 **Usuários Ativos**: Número de desenvolvedores usando ativamente
- 💯 **Taxa de Adoção**: Usuários ativos vs. total de licenças
- 💻 **Breakdown por Linguagem**: Quais linguagens têm melhor performance
- 🖥️ **Breakdown por Editor**: VS Code, JetBrains, etc.
- 📅 **Filtros**: Data range, equipes, linguagens, editores

### Página de Assentos (`/seats`)
- 📋 Lista completa de usuários com licenças
- ✅ Status: Ativo / Inativo
- 📅 Última utilização
- 👤 Informações de atribuição

---

## 🎯 Cronograma da POC

### Semana 1: Setup e Baseline
- [x] Configurar ambiente local
- [x] Criar documentação
- [ ] Habilitar API na organização
- [ ] Documentar métricas iniciais

### Semanas 2-8: Monitoramento Ativo
- [ ] Revisar dashboard semanalmente
- [ ] Coletar feedback dos desenvolvedores
- [ ] Exportar relatórios de progresso
- [ ] Identificar tendências

### Semana 9+: Análise e Apresentação
- [ ] Compilar métricas finais
- [ ] Criar apresentação com dados
- [ ] Comparar métricas antes/depois
- [ ] Apresentar resultados para liderança

---

## 🔄 Como Transferir para a Organização

**Atualmente:** Repositório em `leonardobora-lightera/poc-copilot`  
**Desejado:** Repositório em `FurukawaLatam/poc-copilot`

### Opção 1: Transferência (Requer Admin)
Um administrador da organização pode:
1. Acessar: https://github.com/leonardobora-lightera/poc-copilot/settings
2. Rolar até **"Danger Zone"**
3. Clicar em **"Transfer ownership"**
4. Transferir para a organização **FurukawaLatam**

### Opção 2: Fork na Organização
Um administrador pode fazer fork diretamente:
1. Acessar: https://github.com/leonardobora-lightera/poc-copilot
2. Clicar em **"Fork"**
3. Selecionar **FurukawaLatam** como owner
4. Criar o fork

---

## 📂 Estrutura do Projeto

```
poc-copilot/
├── 📄 README.md (este arquivo)
├── 📄 QUICK_START.md
├── 📄 POC_SETUP_GUIDE.md
├── 📄 COMO_GERENCIAR_POC.md
├── 📄 PEDIDO_PARA_GERENTE.md
│
├── 📂 src/
│   └── 📂 dashboard/
│       ├── 📂 app/              # Páginas do dashboard
│       ├── 📂 components/       # Componentes UI
│       ├── 📂 services/         # Integração com GitHub API
│       ├── 📄 .env.example      # Template de configuração
│       └── 📄 package.json
│
├── 📂 docs/                     # Diagramas e documentação
└── 📂 infra/                    # Deploy Azure (opcional)
```

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **API**: GitHub REST API (Copilot Metrics)
- **Deploy**: Azure App Service (opcional)

---

## 🔒 Segurança

### Credenciais
- ⚠️ **Nunca faça commit do arquivo `.env`** com tokens reais
- ✅ Use o `.env.example` como template
- ✅ Adicione `.env` ao `.gitignore` (já configurado)

### Token Scopes Necessários
- `copilot` - Acesso às métricas do Copilot
- `manage_billing:copilot` - Gestão de assentos
- `read:org` - Leitura de dados da organização
- `read:user` - Leitura de perfis de usuários

---

## 📈 Métricas de Sucesso da POC

### Indicadores Positivos
- ✅ Taxa de aceitação > 25-30%
- ✅ Taxa de adoção > 70%
- ✅ Usuários ativos consistentes diariamente
- ✅ Feedback positivo dos desenvolvedores

### Indicadores de Atenção
- ⚠️ Taxa de aceitação < 20%
- ⚠️ Taxa de adoção < 50%
- ⚠️ Licenças não utilizadas por >7 dias
- ⚠️ Feedback negativo recorrente

---

## 🤝 Contribuindo

### Para a Equipe FurukawaLatam
Se você quiser adicionar observações, insights ou melhorias:

1. Clone o repositório
2. Crie um branch: `git checkout -b feature/minha-observacao`
3. Adicione suas alterações
4. Commit: `git commit -m "docs: adiciona observações sobre [tema]"`
5. Push: `git push origin feature/minha-observacao`
6. Abra um Pull Request

---

## 📞 Suporte

### Interno
- **Responsável pela POC**: Leonardo Costa
- **Email**: leonardo.costa@lightera.com

### Externo
- **Documentação GitHub Copilot**: https://docs.github.com/en/copilot
- **API Metrics Docs**: https://docs.github.com/en/rest/copilot/copilot-metrics
- **Repositório Original**: https://github.com/microsoft/copilot-metrics-dashboard

---

## 📜 Licença

Este projeto é baseado no [microsoft/copilot-metrics-dashboard](https://github.com/microsoft/copilot-metrics-dashboard) e mantém a mesma licença MIT.

---

## 🎯 Próximas Ações

1. ✉️ **Admin**: Habilitar Copilot Metrics API ([instruções](PEDIDO_PARA_GERENTE.md))
2. 🔄 **Admin**: Transferir repositório para organização FurukawaLatam
3. ✅ **Equipe**: Validar acesso ao dashboard
4. 📊 **Leonardo**: Documentar baseline da POC
5. 📅 **Todos**: Monitoramento semanal por 4-8 semanas

---

**Criado em:** 20 de Outubro de 2025  
**Status:** 🟡 Aguardando habilitação da API  
**Próximo Marco:** Habilitação da API + Transferência para org

---

<div align="center">

**🚀 Vamos demonstrar o valor do GitHub Copilot com dados reais! 🚀**

</div>
