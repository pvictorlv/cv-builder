export type AIAction = "improve-summary" | "improve-bullets" | "suggest-skills";

interface PromptContext {
  summary?: string;
  role?: string;
  company?: string;
  description?: string;
  currentSkills?: string[];
}

export function buildPrompt(action: AIAction, context: PromptContext): string {
  switch (action) {
    case "improve-summary":
      return `Você é um especialista em currículos para vagas de tecnologia no Brasil.

Reescreva o resumo profissional abaixo para que seja mais impactante e otimizado para sistemas ATS (Gupy, Kenoby).

Regras:
- Use verbos de ação no início das frases
- Inclua keywords relevantes para a área de tecnologia
- Mantenha em primeira pessoa implícita (sem "eu")
- Máximo 500 caracteres
- Responda APENAS com o texto do resumo, sem explicações

Resumo atual:
${context.summary}`;

    case "improve-bullets":
      return `Você é um especialista em currículos para vagas de tecnologia no Brasil.

Reescreva os bullet points da experiência abaixo para que sejam mais impactantes e otimizados para ATS.

Cargo: ${context.role}
Empresa: ${context.company}

Regras:
- Comece cada bullet com verbo de ação forte (Desenvolvi, Implementei, Liderei, Otimizei, etc.)
- Inclua métricas e resultados quando possível (%, números, impacto)
- Use keywords técnicas relevantes
- Um bullet por linha, sem marcadores
- Responda APENAS com os bullets, um por linha, sem explicações

Bullets atuais:
${context.description}`;

    case "suggest-skills":
      return `Você é um especialista em currículos para vagas de tecnologia no Brasil.

Com base nas habilidades atuais, sugira mais 5-8 habilidades técnicas e soft skills relevantes que complementariam este perfil.

Regras:
- Priorize tecnologias e ferramentas populares no mercado brasileiro
- Inclua mix de hard skills e soft skills
- Não repita as skills existentes
- Responda APENAS com a lista de skills, uma por linha, sem explicações ou numeração

Skills atuais: ${context.currentSkills?.join(", ") || "nenhuma"}`;
  }
}
