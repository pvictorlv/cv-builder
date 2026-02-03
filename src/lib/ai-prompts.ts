export type AIAction = "improve-summary" | "improve-bullets" | "suggest-skills";

interface PromptContext {
  summary?: string;
  role?: string;
  company?: string;
  description?: string;
  currentSkills?: string[];
  type?: string;
  workExperience?: { role: string; company: string; description: string }[];
}

export function buildPrompt(action: AIAction, context: PromptContext): string {
  switch (action) {
    case "improve-summary":
      return `Você é um redator especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutadores técnicos no mercado brasileiro.

Reescreva o resumo profissional abaixo para maximizar a pontuação em sistemas ATS e causar impacto imediato em recrutadores.

Estrutura recomendada (adapte conforme o conteúdo disponível):
1. Abra com título profissional, nível de senioridade e anos de experiência
2. Liste as principais competências técnicas e áreas de atuação
3. Feche com um resultado concreto ou diferencial competitivo

Regras:
- Coloque as keywords mais importantes nas primeiras linhas (ATS e recrutadores escaneiam o início do resumo)
- Nomeie tecnologias, ferramentas e metodologias pelo nome oficial e completo (ex: "JavaScript" em vez de "JS", "Node.js" em vez de "Node", "Kubernetes" em vez de "K8s")
- Priorize: tecnologias dominadas, metodologias, resultados mensuráveis, senioridade
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

Experiências profissionais do candidato (use como base para extrair competências, tecnologias, resultados e contexto profissional):
${context.workExperience.map((exp) => `- ${exp.role} na ${exp.company}: ${exp.description}`).join("\n")}` +
            (!context.summary
              ? "\n\nO resumo atual está vazio. Gere um resumo profissional do zero com base nas experiências acima."
              : "")
          : ""
      }`;

    case "improve-bullets": {
      const typeGuidance: Record<string, string> = {
        fulltime: `- Siga a fórmula CAR: Contexto (situação/escopo) → Ação (o que você fez) → Resultado (impacto mensurável)
- Comece cada bullet com verbo de ação forte no pretérito (Desenvolvi, Implementei, Liderei, Otimizei, Reduzi, Automatizei, Migrei, Arquitetei, Refatorei)
- Inclua métricas concretas sempre que possível: percentuais (aumento de 30%), volumes (500+ usuários diários), valores monetários, tempos (redução de 2h para 15min)
- Nomeie tecnologias, ferramentas e metodologias explicitamente — ATS faz correspondência literal de keywords`,
        freelance: `- Siga a fórmula: Necessidade do cliente → Solução entregue → Resultado/impacto no negócio
- Comece cada bullet com verbo de ação forte (Desenvolvi, Entreguei, Projetei, Implementei, Consultei, Arquitetei)
- Destaque autonomia técnica: escopo definido, decisões de arquitetura, gestão do projeto
- Inclua métricas de impacto para o cliente quando possível (ROI, performance, conversão, tempo de entrega)
- Nomeie tecnologias e ferramentas explicitamente — ATS faz correspondência literal de keywords`,
        sideproject: `- Siga a fórmula: Problema/motivação → Solução técnica implementada → Resultado/alcance
- Comece cada bullet com verbo de ação forte (Criei, Desenvolvi, Projetei, Publiquei, Lancei, Arquitetei)
- Destaque decisões de arquitetura e justificativa do stack tecnológico
- Inclua métricas de alcance quando possível (usuários ativos, downloads, stars no GitHub, contribuidores)
- Nomeie tecnologias e ferramentas explicitamente — ATS faz correspondência literal de keywords`,
        internship: `- Siga a fórmula: Contexto da equipe/projeto → Sua contribuição específica → Resultado concreto
- Comece cada bullet com verbo de ação (Contribuí, Desenvolvi, Participei, Implementei, Apoiei, Automatizei)
- Destaque entregas reais e contribuições tangíveis para a equipe (não apenas "ajudei" ou "aprendi")
- Nomeie tecnologias e ferramentas que utilizou — ATS faz correspondência literal de keywords técnicas
- Mostre progressão: responsabilidades que assumiu ao longo do período`,
      };

      const type = context.type ?? "fulltime";
      const rules = typeGuidance[type] ?? typeGuidance.fulltime;

      return `Você é um redator especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutadores técnicos.

Reescreva os bullet points da experiência abaixo para maximizar a pontuação ATS e o impacto com recrutadores.

Cargo: ${context.role}
Empresa: ${context.company}

Regras específicas para este tipo de experiência:
${rules}

Regras gerais:
- Mantenha EXATAMENTE a mesma quantidade de bullets da entrada
- Cada bullet deve ter idealmente até 200 caracteres (recrutadores escaneiam rapidamente e ATS pode truncar linhas longas)
- Use nomes oficiais e completos de tecnologias (ex: "JavaScript" em vez de "JS", "Node.js" em vez de "Node", "Kubernetes" em vez de "K8s", "PostgreSQL" em vez de "Postgres")
- Use apenas texto plano, sem caracteres especiais ou decorativos (★, •, →, ■, |)
- Um bullet por linha, sem marcadores, prefixos ou numeração
- Responda APENAS com os bullets reescritos, um por linha, sem explicações ou comentários

Bullets atuais:
${context.description}`;
    }

    case "suggest-skills":
      return `Você é um especialista em currículos otimizados para sistemas ATS (Applicant Tracking Systems) e recrutamento técnico.

Analise as habilidades atuais do candidato, infira a área de atuação e o nível de senioridade, e sugira habilidades complementares que aumentariam a pontuação ATS deste perfil.

Regras:
- Sugira entre 5 e 8 habilidades no total
- Priorize HARD SKILLS (tecnologias, ferramentas, frameworks, metodologias, plataformas) — sistemas ATS fazem correspondência direta dessas keywords com vagas
- Inclua no máximo 2 soft skills, apenas se forem altamente relevantes e específicas para a área inferida (ex: "Code Review" ou "Arquitetura de Software", não genéricas como "Trabalho em equipe")
- Use o nome oficial e mais reconhecido de cada tecnologia/ferramenta (ex: "TypeScript" em vez de "TS", "Docker" em vez de "Containers", "PostgreSQL" em vez de "Postgres")
- Sugira skills no mesmo nível de especificidade das existentes (se o perfil lista frameworks específicos, sugira frameworks; se lista categorias amplas, sugira categorias)
- As sugestões devem ser coerentes com a área e senioridade inferidas — não sugira tecnologias desconexas
- Não repita nenhuma skill já listada
- Responda APENAS com a lista de skills, uma por linha, sem explicações, numeração, categorização ou prefixos

Skills atuais: ${context.currentSkills?.join(", ") || "nenhuma"}`;
  }
}
