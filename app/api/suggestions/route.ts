import { NextResponse } from "next/server";
import { createSuggestion, readSuggestions } from "@/lib/suggestions/store";

export async function GET() {
  const suggestions = await readSuggestions();
  return NextResponse.json({ suggestions });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createSuggestion(body);

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result, { status: 201 });
}
