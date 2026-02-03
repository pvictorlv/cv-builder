import type { ProfessionalArea } from "@/types/cv";

export type AIAction = "improve-summary" | "improve-bullets" | "suggest-skills";

interface PromptContext {
  summary?: string;
  role?: string;
  company?: string;
  description?: string;
  currentSkills?: string[];
  type?: string;
  workExperience?: { role: string; company: string; description: string }[];
  professionalArea?: ProfessionalArea;
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
- Mantenha EXATAMENTE a mesma quantidade de bullets da entrada
- Cada bullet deve ter idealmente até 200 caracteres (recrutadores escaneiam rapidamente e ATS pode truncar linhas longas)
- Use nomes oficiais e completos de ferramentas e metodologias
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
- Não repita nenhuma skill já listada
- Responda APENAS com a lista de skills, uma por linha, sem explicações, numeração, categorização ou prefixos

Skills atuais: ${context.currentSkills?.join(", ") || "nenhuma"}`;
}
