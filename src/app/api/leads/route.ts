import { NextRequest, NextResponse } from "next/server";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  status: "active" | "pending" | "lost";
  score: number;
  lastContact: string;
}

const leads: Lead[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@acme.com", company: "Acme Corp", status: "active", score: 92, lastContact: "2026-05-14" },
  { id: 2, name: "Mike Chen", email: "mike@techstart.io", company: "TechStart Inc", status: "pending", score: 75, lastContact: "2026-05-12" },
  { id: 3, name: "Emily Davis", email: "emily@global.co", company: "Global Solutions", status: "active", score: 88, lastContact: "2026-05-13" },
  { id: 4, name: "James Wilson", email: "james@dataflow.com", company: "DataFlow Ltd", status: "lost", score: 45, lastContact: "2026-05-01" },
  { id: 5, name: "Lisa Park", email: "lisa@innovate.ai", company: "Innovate AI", status: "active", score: 95, lastContact: "2026-05-15" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search")?.toLowerCase();

  let filtered = [...leads];
  if (status && status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }
  if (search) {
    filtered = filtered.filter(
      (l) => l.name.toLowerCase().includes(search) || l.company.toLowerCase().includes(search) || l.email.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ leads: filtered, total: filtered.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, status, score } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const newLead: Lead = {
      id: Date.now(),
      name,
      email,
      company: company || "",
      status: status || "pending",
      score: score || 50,
      lastContact: new Date().toISOString().split("T")[0],
    };

    leads.push(newLead);
    return NextResponse.json({ lead: newLead, message: "Lead created successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
