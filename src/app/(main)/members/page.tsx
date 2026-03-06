import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import MembersClient from "./members-client";

export default async function MembersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const membersRaw = await prisma.member.findMany({
    where: { deletedAt: null },
    include: {
      userAccount: { select: { email: true, role: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const initialMembers = membersRaw.map((m) => ({
    id: m.id,
    name: m.name,
    status: m.status,
    salaryType: m.salaryType,
    salaryAmount: Number(m.salaryAmount),
    joinedAt: m.joinedAt instanceof Date ? m.joinedAt.toISOString() : String(m.joinedAt ?? ""),
    email: m.userAccount?.email ?? "",
    role: m.userAccount?.role ?? "",
  }));

  return <MembersClient initialMembers={initialMembers} role={user.role} />;
}
