# Brunet's hair - Aplicativo de Gerenciamento de Beleza

## Visão Geral do Projeto

**Brunet's hair** é um aplicativo mobile native (iOS e Android) para gerenciamento de um negócio autônomo de beleza, oferecendo serviços de manicure, pedicure e cabelo.

## Especificações Técnicas

- **Framework**: React 18 + TypeScript
- **Build System**: Vite 7.0
- **Estilização**: Tailwind CSS 3.4
- **Navegação**: React Router DOM 6
- **Animações**: Framer Motion 11
- **Gerenciamento de Estado**: Zustand 4

## Paleta de Cores

| Elemento | Cor | Hex |
|----------|-----|-----|
| Fundo Principal | Creme Suave | #FFF7E5 |
| Texto Principal | Marrom Terroso | #59483E |
| Destaque/CTA | Rosa Suave | #F5A3AF |
| Cards/Alertas | Rosa Claro | #FECDD0 |

## Estrutura de Navegação

### Bottom Navigation (5 abas principais)
1. **Início** - Dashboard com resumo do dia
2. **Agenda** - Calendário de agendamentos
3. **Clientes** - Lista e histórico de clientes
4. **Relatórios** - Painel financeiro
5. **Ajustes** - Configurações do app

### Transições
- **Entre abas principais**: Fade suave
- **Telas secundárias**: Slide-in da direita
- **Modal de agendamento**: Slide-up

## Páginas Implementadas

1. **Login** - Tela de autenticação
2. **Cadastro** - Criação de nova conta
3. **Dashboard** - Home com próximos atendimentos e faturamento
4. **Agenda** - Calendário semanal com horários
5. **Novo Agendamento** - Modal para criar agendamento
6. **Clientes** - Lista de clientes com busca
7. **Detalhes da Cliente** - Ficha completa com histórico
8. **Relatórios** - Métricas financeiras e serviços
9. **Configurações** - Perfil e preferências

## Funcionalidades Principais

- ✅ Gerenciamento de clientes e histórico de serviços
- ✅ Agenda com visualização semanal
- ✅ Agendamento rápido com seleção de serviço
- ✅ Painel financeiro com métricas
- ✅ Registro de informações cruciais (alergias)
- ✅ Design responsivo mobile-first

## Executando o Projeto

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build de produção
pnpm run build
```

## Próximos Passos Sugeridos

- Integração com backend para persistência de dados
- Sistema de notificações push
- Integração com calendário Google/Apple
- Modo offline com sincronização
