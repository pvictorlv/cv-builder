import type { ProfessionalArea } from "@/types/cv";

export type AIAction = "improve-summary" | "improve-bullets" | "suggest-skills" | "parse-cv" | "translate-cv" | "analyze-cv";

interface PromptContext {
  summary?: string;
  role?: string;
  company?: string;
  description?: string;
  currentSkills?: string[];
  type?: string;
  workExperience?: { role: string; company: string; description: string }[];
  professionalArea?: ProfessionalArea;
  cvText?: string;
  cvJson?: string;
  targetLanguage?: string;
}

interface AreaConfig {
  label: string;
  summaryFocus: string;
  summaryKeywords: string;
  summaryMetrics: string;
  bulletFormula: string;
  bulletVerbs: string;
  bulletMetrics: string;
  skillsFocus: string;
  skillsExamples: string;
}

const AREA_CONFIGS: Record<ProfessionalArea, AreaConfig> = {
  tech: {
    label: "Tecnologia/Desenvolvimento",
    summaryFocus: "stack tecnológico, senioridade e metodologias de desenvolvimento",
    summaryKeywords: "tecnologias, ferramentas, frameworks, linguagens, cloud, DevOps, metodologias ágeis",
    summaryMetrics: "performance de sistemas, uptime, redução de bugs, entregas técnicas",
    bulletFormula: "Contexto (situação/escopo técnico) → Ação (implementação/solução) → Resultado (impacto mensurável)",
    bulletVerbs: "Desenvolvi, Implementei, Liderei, Otimizei, Reduzi, Automatizei, Migrei, Arquitetei, Refatorei, Integrei",
    bulletMetrics: "percentuais de melhoria (30%), volumes (500+ usuários), tempos de resposta (de 2s para 200ms), uptime (99.9%), redução de bugs",
    skillsFocus: "tecnologias, frameworks, linguagens de programação, ferramentas de desenvolvimento, cloud e DevOps",
    skillsExamples: "TypeScript, React, Node.js, AWS, Docker, Kubernetes, PostgreSQL, Redis, CI/CD, Arquitetura de Software",
  },
  support: {
    label: "Suporte/Atendimento ao Cliente",
    summaryFocus: "canais de atendimento, ferramentas de suporte e especialização em resolução de problemas",
    summaryKeywords: "suporte técnico, atendimento ao cliente, help desk, service desk, gestão de tickets, SLA, experiência do cliente",
    summaryMetrics: "NPS, CSAT, FCR (First Call Resolution), tempo médio de resolução, volume de atendimentos, satisfação do cliente",
    bulletFormula: "Desafio (problema/demanda do cliente) → Solução (ação tomada) → Impacto (resultado para o cliente/empresa)",
    bulletVerbs: "Atendi, Resolvi, Reduzi, Implementei, Treinei, Documentei, Escalei, Diagnostiquei, Solucionei, Gerenciei",
    bulletMetrics: "NPS, CSAT (%), FCR (%), tempo de resolução (de 48h para 4h), volume de tickets (500+/mês), taxa de satisfação",
    skillsFocus: "ferramentas de suporte, sistemas de tickets, metodologias de atendimento e gestão de serviços",
    skillsExamples: "Zendesk, Freshdesk, Intercom, Salesforce Service Cloud, ITIL, ServiceNow, Jira Service Management, Gestão de SLA",
  },
  hr: {
    label: "Recursos Humanos",
    summaryFocus: "subsistemas de RH, porte de empresas atendidas e especialização em gestão de pessoas",
    summaryKeywords: "recrutamento e seleção, desenvolvimento organizacional, gestão de pessoas, DP, treinamento, clima organizacional",
    summaryMetrics: "vagas fechadas, tempo de contratação (time-to-hire), turnover, retenção, headcount gerenciado, programas implementados",
    bulletFormula: "Necessidade (demanda organizacional) → Iniciativa (programa/processo implementado) → Resultado (impacto em pessoas/negócio)",
    bulletVerbs: "Recrutei, Implementei, Capacitei, Desenvolvi, Conduzi, Estruturei, Reduzi, Gerenciei, Coordenei, Elaborei",
    bulletMetrics: "vagas fechadas (50+/ano), tempo de contratação (de 45 para 20 dias), turnover (redução de 25%), headcount (200+ colaboradores), participação em treinamentos",
    skillsFocus: "sistemas de RH, ferramentas de recrutamento, gestão de folha e processos de desenvolvimento",
    skillsExamples: "Gupy, Kenoby, SAP RH, TOTVS, ADP, Excel Avançado, Entrevista por Competências, Avaliação de Desempenho, Pesquisa de Clima",
  },
};

export function buildPrompt(action: AIAction, context: PromptContext): string {
  const area = context.professionalArea ?? "tech";
  const config = AREA_CONFIGS[area];

  switch (action) {
    case "improve-summary":
      return buildSummaryPrompt(context, config);
    case "improve-bullets":
      return buildBulletsPrompt(context, config);
    case "suggest-skills":
      return buildSkillsPrompt(context, config);
    case "parse-cv":
      return buildParseCvPrompt(context);
    case "translate-cv":
      return buildTranslateCvPrompt(context);
    case "analyze-cv":
      return buildAnalyzeCvPrompt(context, config);
  }
}

function buildSummaryPrompt(context: PromptContext, config: AreaConfig): string {
  return `Você é um redator especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutadores de ${config.label} no mercado brasileiro.

Reescreva o resumo profissional abaixo para maximizar a pontuação em sistemas ATS e causar impacto imediato em recrutadores.

Estrutura recomendada (adapte conforme o conteúdo disponível):
1. Abra com título profissional, nível de senioridade e anos de experiência
2. Liste as principais competências e áreas de atuação relevantes para ${config.label}
3. Feche com um resultado concreto ou diferencial competitivo

Foco da área (${config.label}):
- Destaque: ${config.summaryFocus}
- Keywords prioritárias: ${config.summaryKeywords}
- Métricas típicas: ${config.summaryMetrics}

Regras:
- Coloque as keywords mais importantes nas primeiras linhas (ATS e recrutadores escaneiam o início do resumo)
- Nomeie ferramentas, metodologias e certificações pelo nome oficial e completo
- Priorize: competências dominadas, metodologias, resultados mensuráveis, senioridade
- Use verbos de ação e linguagem direta e profissional
- Mantenha primeira pessoa implícita (sem "eu")
- Priorize informações que já existem no texto original. NÃO invente ferramentas ou experiências que não estejam no texto
- Se o texto não menciona métricas, você pode sugerir métricas realistas e conservadoras (ex: "redução de 15%", "mais de 10 clientes") para dar impacto, mas sem exageros nem números grandiosos
- Reorganize e melhore a redação do que já existe, adicionando o mínimo necessário
- Evite clichês e termos vagos: "apaixonado", "proativo", "dinâmico", "busco desafios", "jogador de equipe", "rápido aprendizado", "multitarefas", "perfeccionista"
- Use apenas texto plano, sem caracteres especiais ou decorativos (★, •, →, ■, |)
- Máximo de 500 caracteres
- Texto em parágrafo único e contínuo
- Responda APENAS com o texto do resumo, sem aspas, comentários ou explicações

Resumo atual:
${context.summary || "(vazio)"}${
    context.workExperience?.length
      ? `

Experiências profissionais do candidato (use como base para extrair competências, ferramentas, resultados e contexto profissional):
${context.workExperience.map((exp) => `- ${exp.role} na ${exp.company}: ${exp.description}`).join("\n")}` +
        (!context.summary
          ? "\n\nO resumo atual está vazio. Gere um resumo profissional do zero com base nas experiências acima."
          : "")
      : ""
  }`;
}

function buildBulletsPrompt(context: PromptContext, config: AreaConfig): string {
  const typeGuidance: Record<string, string> = {
    fulltime: `- Siga a fórmula: ${config.bulletFormula}
- Comece cada bullet com verbo de ação forte no pretérito (${config.bulletVerbs})
- Inclua métricas concretas sempre que possível: ${config.bulletMetrics}
- Nomeie ferramentas, sistemas e metodologias explicitamente — ATS faz correspondência literal de keywords`,
    freelance: `- Siga a fórmula: Necessidade do cliente → Solução entregue → Resultado/impacto no negócio
- Comece cada bullet com verbo de ação forte (${config.bulletVerbs})
- Destaque autonomia: escopo definido, decisões tomadas, gestão do projeto
- Inclua métricas de impacto para o cliente quando possível
- Nomeie ferramentas e metodologias explicitamente — ATS faz correspondência literal de keywords`,
    sideproject: `- Siga a fórmula: Problema/motivação → Solução implementada → Resultado/alcance
- Comece cada bullet com verbo de ação forte (Criei, Desenvolvi, Projetei, Publiquei, Lancei)
- Destaque decisões e justificativa das ferramentas/abordagens escolhidas
- Inclua métricas de alcance quando possível (usuários, downloads, impacto)
- Nomeie ferramentas e metodologias explicitamente — ATS faz correspondência literal de keywords`,
    internship: `- Siga a fórmula: Contexto da equipe/projeto → Sua contribuição específica → Resultado concreto
- Comece cada bullet com verbo de ação (Contribuí, Participei, Implementei, Apoiei)
- Destaque entregas reais e contribuições tangíveis para a equipe (não apenas "ajudei" ou "aprendi")
- Nomeie ferramentas e metodologias que utilizou — ATS faz correspondência literal de keywords
- Mostre progressão: responsabilidades que assumiu ao longo do período`,
  };

  const type = context.type ?? "fulltime";
  const rules = typeGuidance[type] ?? typeGuidance.fulltime;

  return `Você é um redator especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutadores de ${config.label}.

Reescreva os bullet points da experiência abaixo para maximizar a pontuação ATS e o impacto com recrutadores.

Cargo: ${context.role}
Empresa: ${context.company}

Regras específicas para este tipo de experiência:
${rules}

Métricas típicas da área (${config.label}): ${config.bulletMetrics}

Regras gerais:
- NÃO adicione ferramentas, tecnologias ou metodologias que não foram mencionadas no original
- Se os bullets não mencionam métricas, você pode sugerir métricas realistas e conservadoras para dar impacto (ex: "redução de 20%", "atendimento de 50+ clientes"), mas sem exageros
- Melhore a redação, estrutura e clareza do que já existe, adicionando o mínimo necessário
- Mantenha EXATAMENTE a mesma quantidade de bullets da entrada
- Cada bullet deve ter idealmente até 200 caracteres (recrutadores escaneiam rapidamente e ATS pode truncar linhas longas)
- Use nomes oficiais e completos de ferramentas e metodologias mencionadas
- Use apenas texto plano, sem caracteres especiais ou decorativos (★, •, →, ■, |)
- Um bullet por linha, sem marcadores, prefixos ou numeração
- Responda APENAS com os bullets reescritos, um por linha, sem explicações ou comentários

Bullets atuais:
${context.description}`;
}

function buildSkillsPrompt(context: PromptContext, config: AreaConfig): string {
  return `Você é um especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutamento em ${config.label}.

Analise as habilidades atuais do candidato, considerando que é um profissional de ${config.label}, e sugira habilidades complementares que aumentariam a pontuação ATS deste perfil.

Foco da área (${config.label}):
- Priorize: ${config.skillsFocus}
- Exemplos de skills relevantes: ${config.skillsExamples}

Regras:
- Sugira entre 5 e 8 habilidades no total
- Priorize HARD SKILLS (ferramentas, sistemas, metodologias, certificações) — sistemas ATS fazem correspondência direta dessas keywords com vagas
- Inclua no máximo 2 soft skills, apenas se forem altamente relevantes e específicas para ${config.label}
- Use o nome oficial e mais reconhecido de cada ferramenta/metodologia
- Sugira skills no mesmo nível de especificidade das existentes
- As sugestões devem ser coerentes com a área de ${config.label} — não sugira competências desconexas
- Não repita nenhuma skill já listada (verifique variações como "JS"/"JavaScript", "TS"/"TypeScript")
- Sugira apenas skills que façam sentido com o perfil do candidato baseado nas skills existentes — não sugira skills aleatórias ou genéricas
- Responda APENAS com a lista de skills, uma por linha, sem explicações, numeração, categorização ou prefixos

Skills atuais: ${context.currentSkills?.join(", ") || "nenhuma"}`;
}

function buildParseCvPrompt(context: PromptContext): string {
  return `Você é um parser de currículos. Extraia as informações do texto abaixo e retorne um JSON válido no formato especificado.

Texto do currículo:
${context.cvText}

Retorne APENAS um JSON válido (sem markdown, sem comentários, sem explicações) com esta estrutura exata:
{
  "contactInfo": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "portfolio": "",
    "photoUrl": ""
  },
  "professionalSummary": {
    "summary": ""
  },
  "workExperience": {
    "items": [
      {
        "type": "fulltime",
        "role": "",
        "company": "",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM",
        "current": false,
        "description": "bullet 1\\nbullet 2"
      }
    ]
  },
  "education": {
    "items": [
      {
        "course": "",
        "institution": "",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM",
        "current": false
      }
    ]
  },
  "skills": {
    "items": ["skill1", "skill2"]
  },
  "certifications": {
    "items": [
      {
        "name": "",
        "issuer": "",
        "date": "YYYY-MM",
        "url": ""
      }
    ]
  },
  "languages": {
    "items": [
      {
        "language": "",
        "level": "Básico|Intermediário|Avançado|Fluente|Nativo"
      }
    ]
  }
}

Regras:
- Preencha apenas os campos que conseguir extrair do texto
- Datas no formato YYYY-MM (ex: 2024-01)
- Se o candidato está no cargo atual, use current: true e endDate vazio
- type pode ser: fulltime, freelance, sideproject, internship
- Para sideproject, startDate e endDate podem ser vazios (projetos pessoais não precisam de datas)
- level de idioma deve ser exatamente um de: Básico, Intermediário, Avançado, Fluente, Nativo
- Não invente informações que não existem no texto
- Retorne APENAS o JSON, sem nenhum texto adicional`;
}

function buildTranslateCvPrompt(context: PromptContext): string {
  return `Você é um tradutor profissional especializado em currículos e documentos corporativos.

Traduza o currículo abaixo para ${context.targetLanguage || "inglês"}, mantendo a mesma estrutura JSON.

JSON do currículo:
${context.cvJson}

Regras:
- Traduza TODOS os campos de texto (nome de cargos, descrições, habilidades, nomes de cursos, etc.)
- NÃO traduza: nomes próprios de pessoas, nomes de empresas, nomes de ferramentas/tecnologias, URLs, emails, telefones
- Mantenha a mesma estrutura JSON exata
- Adapte títulos de cargos para equivalentes reconhecidos no mercado internacional (ex: "Desenvolvedor Sênior" -> "Senior Developer")
- Mantenha datas no formato original
- Traduza os níveis de idioma para o equivalente (Básico->Basic, Intermediário->Intermediate, Avançado->Advanced, Fluente->Fluent, Nativo->Native) se traduzir para inglês, ou equivalentes na língua alvo
- Retorne APENAS o JSON traduzido, sem explicações`;
}

function buildAnalyzeCvPrompt(context: PromptContext, config: AreaConfig): string {
  return `Você é um recrutador sênior experiente em ${config.label} no mercado brasileiro, com mais de 10 anos contratando profissionais.

Analise o currículo abaixo como se fosse avaliar o candidato para uma vaga. Dê feedback honesto e construtivo.

JSON do currículo:
${context.cvJson}

Forneça sua análise nos seguintes tópicos, usando esta estrutura EXATA (com os headers em ##):

## Primeira Impressão
Como recrutador, qual sua primeira impressão ao abrir este currículo? (2-3 frases)

## Pontos Fortes
Liste os 3-5 pontos mais fortes deste currículo, explicando por que cada um se destaca.

## Pontos de Melhoria
Liste os 3-5 pontos que precisam de melhoria, com sugestões concretas de como melhorar cada um.

## Compatibilidade ATS
Avalie de 1 a 10 a compatibilidade deste currículo com sistemas ATS. Explique o que está bom e o que pode melhorar para passar pelos filtros automáticos.

## Adequação para ${config.label}
O currículo está bem posicionado para vagas em ${config.label}? O que poderia ser ajustado para melhor aderência ao mercado?

## Nota Geral
Dê uma nota de 1 a 10 para o currículo como um todo e um resumo final em 2-3 frases.

Regras:
- Seja direto e prático, sem rodeios
- Dê exemplos concretos quando sugerir melhorias
- Considere o mercado brasileiro
- Responda em português`;
}
