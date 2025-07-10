
# Projeto: Boss Remainder

Este arquivo resume o escopo e os requisitos do projeto "Boss Remainder" para contextualização futura.

## Visão Geral

O "Boss Remainder" é uma aplicação web projetada para ajudar guildas ou grupos de jogadores a coordenar a participação em eventos de boss em jogos online. A aplicação funcionará inteiramente no navegador, sem necessidade de instalação.

## Funcionalidades Principais

1.  **Sistema de Cargos:**
    *   **Receptores:** Apenas recebem notificações.
    *   **Emissores:** Podem enviar e receber notificações.
    *   **Admins:** Podem enviar notificações em massa para todos os usuários.

2.  **Envio de Alertas Manuais com Sugestões:**
    *   O sistema não envia alertas automaticamente.
    *   Emissores/Admins terão uma interface que sugere mensagens de alerta com base nos horários definidos em um arquivo `bosses.json`.
    *   Eles podem usar a sugestão ou escrever uma mensagem personalizada.

3.  **Notificações Interativas:**
    *   As notificações push enviadas aos usuários terão botões de resposta rápida: "Logado", "Já entro", "Não posso".

4.  **Lógica de Resposta Inteligente:**
    *   A resposta a um alerta afeta o recebimento de notificações futuras *apenas para aquele evento de boss específico*.
    *   **"Logado" / "Não posso"**: Interrompe o recebimento de mais lembretes para aquele boss.
    *   **"Já entro"**: Continua recebendo os lembretes subsequentes para o mesmo boss.

5.  **Feedback para o Emissor:**
    *   O emissor do alerta terá um painel para visualizar a contagem anônima e em tempo real das respostas recebidas (ex: Logado: 5, Já entro: 9, Não posso: 10).

6.  **Controles de Usuário:**
    *   **Silenciar/Reativar:** Uma opção para o usuário pausar o recebimento de todas as notificações por 24 horas, com a possibilidade de reativar a qualquer momento.
    *   **Login Facilitado:** Uma opção "Manter conectado" e suporte para o salvamento de credenciais pelo navegador.

7.  **Manutenção do Sistema:**
    *   **Limpeza Automática:** Uma rotina de backend para apagar dados de alertas antigos (ex: com mais de 7 dias) para manter a base de dados leve e dentro dos limites de planos gratuitos.

## Pilha de Tecnologia Proposta

*   **Frontend:** HTML, CSS, JavaScript (Vanilla)
*   **Backend:** Funções Serverless (Node.js)
*   **Banco de Dados:** PostgreSQL (via Vercel Postgres ou Neon)
*   **Notificações:** Web Push API
*   **Hospedagem:** Vercel ou Netlify
