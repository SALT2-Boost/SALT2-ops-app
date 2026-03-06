import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ProjectsClient from "./projects-client";

export default async function ProjectsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const projectsRaw = await prisma.project.findMany({
    where: { deletedAt: null },
    include: {
      assignments: {
        include: {
          member: { select: { id: true, name: true } },
          position: { select: { positionName: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const initialProjects = projectsRaw.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    status: p.status,
    company: p.company,
    startDate: p.startDate instanceof Date ? p.startDate.toISOString() : String(p.startDate ?? ""),
    endDate: p.endDate instanceof Date ? p.endDate.toISOString() : (p.endDate ? String(p.endDate) : null),
    clientName: p.clientName,
    contractType: p.contractType,
    monthlyContractAmount: Number(p.monthlyContractAmount),
    assignments: p.assignments.map((a) => ({
      id: a.id,
      memberId: a.memberId,
      memberName: a.member.name,
      positionName: a.position.positionName,
      workloadHours: a.workloadHours,
    })),
  }));

  return <ProjectsClient initialProjects={initialProjects} role={user.role} />;
}
