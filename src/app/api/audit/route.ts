import { NextResponse } from "next/server";

const auditLogs = [
  { id: 1, event: "User Login", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15T10:23:45Z", ip: "192.168.1.1", details: "Successful login" },
  { id: 2, event: "Lead Created", user: "sarah@atonv.com", role: "agent", timestamp: "2026-05-15T10:18:32Z", ip: "192.168.1.5", details: "Created lead: Acme Corp" },
  { id: 3, event: "Report Exported", user: "mike@atonv.com", role: "manager", timestamp: "2026-05-15T09:55:12Z", ip: "192.168.1.3", details: "Exported Q2 investor report" },
  { id: 4, event: "Connector Enabled", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15T09:42:08Z", ip: "192.168.1.1", details: "Enabled OpenAI connector" },
  { id: 5, event: "Dashboard Viewed", user: "investor@fund.com", role: "investor", timestamp: "2026-05-15T09:30:00Z", ip: "10.0.0.5", details: "Viewed investor dashboard" },
  { id: 6, event: "AI Query Sent", user: "sarah@atonv.com", role: "agent", timestamp: "2026-05-15T09:15:22Z", ip: "192.168.1.5", details: "Query: Market analysis Q4" },
  { id: 7, event: "Settings Updated", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15T08:50:11Z", ip: "192.168.1.1", details: "Updated security settings" },
  { id: 8, event: "User Invited", user: "mike@atonv.com", role: "manager", timestamp: "2026-05-14T17:30:45Z", ip: "192.168.1.3", details: "Invited tom@atonv.com" },
];

export async function GET() {
  return NextResponse.json({ logs: auditLogs, total: auditLogs.length });
}
