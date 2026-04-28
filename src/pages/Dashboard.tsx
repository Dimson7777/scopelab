import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, BarChart3, DollarSign, TrendingUp, Sparkles, AlertCircle, Search, CalendarDays } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { PROJECT_STATUSES } from "@/lib/constants";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { projects, isLoading, isError, deleteProject, duplicateProject } = useProjects();
  const { user } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.client_brief.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteProject.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Project deleted");
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete project");
      },
    });
  };

  const handleDuplicate = (id: string) => {
    duplicateProject.mutate(id, {
      onSuccess: () => toast.success("Saved as draft"),
      onError: () => toast.error("Failed to duplicate"),
    });
  };

  const totalProjects = projects.length;
  const totalRevenue = projects.reduce((sum, p) => {
    const matches = [...p.price_range.matchAll(/\$([\d,]+)/g)];
    if (matches.length >= 2) {
      const low = parseInt(matches[0][1].replace(/,/g, ""));
      const high = parseInt(matches[1][1].replace(/,/g, ""));
      return sum + Math.round((low + high) / 2);
    }
    const match = p.price_range.match(/\$([\d,]+)/);
    return sum + (match ? parseInt(match[1].replace(/,/g, "")) : 0);
  }, 0);
  const avgPrice = totalProjects ? Math.round(totalRevenue / totalProjects) : 0;

  const completedCount = projects.filter((p) => p.status === "completed").length;
  const inProgressCount = projects.filter((p) => p.status === "in_progress").length;

  const now = new Date();
  const thisMonthCount = projects.filter((p) => {
    const d = new Date(p.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { label: "This month", value: thisMonthCount.toString(), icon: CalendarDays, sub: `${totalProjects} all-time` },
    { label: "Active", value: inProgressCount.toString(), icon: BarChart3, sub: `${completedCount} completed` },
    { label: "Avg. estimate", value: avgPrice ? `$${avgPrice.toLocaleString()}` : "—", icon: DollarSign, sub: "per project" },
    { label: "Pipeline value", value: totalRevenue ? `$${totalRevenue.toLocaleString()}` : "—", icon: TrendingUp, sub: "total estimated" },
  ];

  const firstName = user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Welcome back, <span className="text-gradient">{firstName}</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {totalProjects > 0
                ? `You have ${totalProjects} project${totalProjects !== 1 ? "s" : ""} in your pipeline.`
                : "Get started by generating your first project plan."}
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/generate">
              <Plus className="h-4 w-4" />
              New plan
            </Link>
          </Button>
        </div>

        {/* Stats */}
        {!isLoading && totalProjects > 0 && (
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-5 shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-elevated"
              >
                <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border ${
                    i === 1 ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em]">
                      {stat.label}
                    </p>
                    <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 py-16 px-6">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Failed to load projects
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Check your connection and try refreshing the page.
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-gradient-card py-20 sm:py-24 px-6"
          >
            <div className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-5 shadow-glow">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h3 className="relative font-display text-2xl font-bold text-foreground">
              No projects yet
            </h3>
            <p className="relative mt-2 max-w-sm text-center text-sm text-muted-foreground leading-relaxed">
              Paste a client brief to get a scoped plan with pricing, timeline,
              and a proposal draft. Your projects will show up here.
            </p>
            <Button className="relative mt-7" variant="hero" asChild>
              <Link to="/generate">
                <Plus className="h-4 w-4" />
                Create your first plan
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Project grid with search & filter */}
        {!isLoading && !isError && projects.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Your projects
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Showing {filteredProjects.length} of {totalProjects}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-56 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search projects…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {Object.entries(PROJECT_STATUSES).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card py-12 px-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No projects match your search.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, i) => {
                  // Highlight the most recently updated project (first in list, only when not filtering)
                  const isFeatured =
                    i === 0 && !search.trim() && statusFilter === "all" && filteredProjects.length > 1;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""}
                    >
                      <ProjectCard
                        project={project}
                        onDelete={(id) => setDeleteId(id)}
                        onDuplicate={handleDuplicate}
                        featured={isFeatured}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        isPending={deleteProject.isPending}
      />
    </div>
  );
};

export default Dashboard;
