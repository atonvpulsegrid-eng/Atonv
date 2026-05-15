import { NextResponse } from "next/server";

export async function GET() {
  const stats = {
    totalUsers: 1247,
    byRole: {
      admin: 3,
      manager: 12,
      agent: 45,
      investor: 8,
    },
    growth: [
      { month: "Jan", users: 450 },
      { month: "Feb", users: 580 },
      { month: "Mar", users: 720 },
      { month: "Apr", users: 890 },
      { month: "May", users: 1100 },
      { month: "Jun", users: 1247 },
    ],
    activeUsers: 1089,
    newUsersThisMonth: 147,
    churnRate: 2.3,
  };

  return NextResponse.json(stats);
}
