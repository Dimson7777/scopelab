import { useParams, Link, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Copy, Check, Trash2, Clock, DollarSign, Mail, Calendar, Pencil, X, Files, Link2, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_STATUSES } from "@/lib/constants";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import ProposalPreview from "@/components/project/ProposalPreview";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, isLoading, deleteProject, updateProject, duplicateProject } = useProjects();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  const [copied, setCopied] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editScope, setEditScope] = useState("");

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <DashboardNav />
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 rounded-2xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </main>
      </div>
    );
  }

  // Not found state
  if (!project) {
    return (
      <div className="min-h-screen">
        <DashboardNav />
        <main className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Project not found</h1>
          <p className="mt-2 text-muted-foreground">This plan may have been deleted.</p>
          <Button className="mt-6" asChild>
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </main>
      </div>
    );
  }

  const handleCopyPlan = () => {
    const text = `# ${project.title}\n\n## Client Brief\n${project.client_brief}\n\n## Scope\n${project.scope}\n\n## Timeline\n${project.timeline}\n\n## Estimated Price\n${project.price_range}\n\n## Tasks\n${project.tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Plan copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const proposalText = `Hi [Client],\n\nThanks for sharing your project requirements. Here's a high-level overview of what we'd build together.\n\nThe project will take approximately ${project.timeline} with an estimated investment of ${project.price_range}. This covers ${project.tasks.length} key deliverables from design through deployment.\n\nKey deliverables:\n${project.tasks.slice(0, 5).map(t => `• ${t}`).join("\n")}\n\nI follow an iterative process with weekly updates so you always know where things stand.\n\nHappy to discuss further.\n\nBest,\n[Your Name]`;

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalText);
    setCopiedProposal(true);
    toast.success("Proposal copied to clipboard");
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  const handleDuplicate = () => {
    duplicateProject.mutate(project.id, {
      onSuccess: (data) => {
        toast.success("Project duplicated");
        if (data?.id) navigate(`/project/${data.id}`);
      },
      onError: () => toast.error("Failed to duplicate project"),
    });
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/project/${project.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied", {
      description: "Anyone with this link who can sign in to your account can view it.",
    });
  };

  const handleExportPdf = () => {
    toast.info("Opening print dialog…", {
      description: "Choose 'Save as PDF' as the destination.",
    });
    setTimeout(() => window.print(), 200);
  };

  const handleDelete = () => {
    deleteProject.mutate(project.id, {
      onSuccess: () => {
        toast.success("Project deleted");
        navigate("/dashboard");
      },
      onError: () => toast.error("Failed to delete project"),
    });
  };

  const handleStatusChange = (newStatus: string) => {
    updateProject.mutate(
      { id: project.id, status: newStatus },
      {
        onSuccess: () => toast.success(`Status updated to ${PROJECT_STATUSES[newStatus]?.label || newStatus}`),
        onError: () => toast.error("Failed to update status"),
      }
    );
  };

  const status = PROJECT_STATUSES[project.status] || PROJECT_STATUSES.planning;
  const createdDate = format(new Date(project.created_at), "MMM d, yyyy");
  const updatedAgo = formatDistanceToNow(new Date(project.updated_at), { addSuffix: true });

  const startEdit = () => {
    setEditTitle(project.title);
    setEditScope(project.scope);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      toast.error("Title can't be empty");
      return;
    }
    updateProject.mutate(
      { id: project.id, title: editTitle.trim(), scope: editScope.trim() },
      {
        onSuccess: () => {
          toast.success("Changes saved");
          setIsEditing(false);
        },
        onError: () => toast.error("Failed to save changes"),
      }
    );
  };

  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Top bar */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <div className="flex flex-wrap gap-2 print:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleShareLink}>
                  <Link2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy a share link for this project</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleExportPdf}>
                  <FileDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Export PDF</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print or save the proposal as PDF</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDuplicate}
                  disabled={duplicateProject.isPending}
                >
                  <Files className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {duplicateProject.isPending ? "Duplicating…" : "Duplicate"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save a copy as a draft</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleCopyPlan}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy plan"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy full plan to clipboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDelete(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Permanently delete this project</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="space-y-4 print:hidden">
          {/* Header card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-card">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${status.classes}`}>
                  {status.label}
                </span>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {project.tasks.length} tasks
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {createdDate}
                </span>
                <span className="text-xs text-muted-foreground">
                  · Updated {updatedAgo}
                </span>
              </div>
              <Select value={project.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROJECT_STATUSES).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="font-display text-lg font-semibold"
                />
                <p className="text-sm text-muted-foreground">{project.client_brief}</p>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">{project.title}</h1>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">{project.client_brief}</p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={startEdit}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit title & scope</TooltipContent>
                </Tooltip>
              </div>
            )}
          </motion.div>

          {/* Scope */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">Project scope</h2>
            {isEditing ? (
              <>
                <Textarea
                  value={editScope}
                  onChange={(e) => setEditScope(e.target.value)}
                  className="min-h-[140px] text-sm"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={updateProject.isPending}>
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={saveEdit} disabled={updateProject.isPending}>
                    {updateProject.isPending ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line">{project.scope}</p>
            )}
          </motion.div>

          {/* Timeline + Price */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-elevated">
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-border text-primary">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em]">Timeline</p>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">{project.timeline}</p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all duration-300 hover:border-accent/30 hover:shadow-elevated">
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-border text-accent">
                  <DollarSign className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em]">Estimated price</p>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">{project.price_range}</p>
            </div>
          </motion.div>

          {/* Tasks */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Task breakdown</h2>
            <ol className="space-y-3">
              {project.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs sm:text-sm font-semibold text-primary">{i + 1}</span>
                  <span className="text-sm sm:text-base text-foreground pt-0.5">{task}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Client proposal */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }} className="rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 shadow-card">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <h2 className="font-display text-lg font-semibold text-foreground">Client proposal</h2>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyProposal}>
                {copiedProposal ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedProposal ? "Copied" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              A ready-to-send message you can customize and send to your client.
            </p>
            <div className="rounded-xl bg-surface-subtle p-4 sm:p-5 text-sm text-foreground leading-relaxed whitespace-pre-line">
              {proposalText}
            </div>
          </motion.div>

          {/* Polished proposal preview — what the client would see */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Proposal preview
                </h2>
                <p className="text-xs text-muted-foreground">
                  This is what your client sees when you export or share it.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleExportPdf}>
                <FileDown className="h-3.5 w-3.5" />
                Export PDF
              </Button>
            </div>
            <ProposalPreview project={project} />
          </motion.div>
        </div>

        {/* Print-only: clean proposal view */}
        <div className="hidden print:block">
          <ProposalPreview project={project} />
        </div>
      </main>

      <DeleteConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleDelete}
        isPending={deleteProject.isPending}
      />
    </div>
  );
};

export default ProjectDetails;
