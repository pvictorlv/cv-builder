# CV Builder

Construtor de currículos em PDF otimizados para plataformas de recrutamento, linkedin e com sugestões por IA.

## Funcionalidades

- Formulário completo de currículo (dados pessoais, experiência, formação, habilidades, certificações, idiomas)
- Preview do PDF em tempo real enquanto você edita
- 6 templates diferentes (Classic, Modern, Elegant, Executive, Creative, Compact)
- Sugestões de IA para melhorar textos (resumo profissional, descrição de experiências, skills)
- Suporte a área Tecnologia, Recursos Humanos e Suporte Técnico
- Salvamento automático no localStorage do navegador

## Requisitos

- Node.js 18+
- Chave da API OpenRouter (opcional, só pra funcionalidade de IA)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Configurando a IA

A funcionalidade de sugestões com IA é opcional. Pra usar, clique no ícone de engrenagem no header e adicione sua chave da API OpenRouter. A chave fica salva só no seu navegador.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- @react-pdf/renderer
- dnd-kit
