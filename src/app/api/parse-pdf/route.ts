import { NextResponse, type NextRequest } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 },
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Apenas arquivos PDF são aceitos." },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const pdf = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await pdf.getText();
    const text = result.text;

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Não foi possível extrair texto do PDF. Verifique se o PDF contém texto selecionável." },
        { status: 422 },
      );
    }

    await pdf.destroy();

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro ao processar PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
