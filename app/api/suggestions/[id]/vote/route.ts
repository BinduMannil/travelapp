import { NextResponse } from "next/server";
import { voteForSuggestion } from "@/lib/suggestions/store";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await voteForSuggestion(id);

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json(result);
}
