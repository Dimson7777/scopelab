import { Link } from "react-router-dom";
import { Clock, DollarSign, ArrowRight, Trash2, Calendar, Files } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PROJECT_STATUSES } from "@/lib/constants";
import type { Project } from "@/hooks/useProjects";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
  featured?: boolean;
}

const ProjectCard = ({ project, onDelete, onDuplicate, featured = false }: ProjectCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(project.created_at), { addSuffix: true });
  const taskCount = project.tasks?.length || 0;
  const status = PROJECT_STATUSES[project.status] || PROJECT_STATUSES.planning;

  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-primary/40 bg-gradient-to-br from-primary/[0.08] via-card to-card shadow-elevated hover:shadow-glow"
          : "border-border bg-gradient-card shadow-card hover:border-primary/20 hover:shadow-elevated"
      }`}
    >
      {/* Decorative glow on hover */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
          Most recent
        </span>
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.classes}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {taskCount} tasks
              </span>
            </div>
            <h3 className={`font-display font-semibold text-foreground line-clamp-1 ${featured ? "text-xl" : "text-lg"}`}>
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.client_brief}
            </p>
          </div>
          {!featured && (
            <div className="flex shrink-0 items-center gap-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
              {onDuplicate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={(e) => { e.preventDefault(); onDuplicate(project.id); }}
                    >
                      <Files className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Duplicate as draft</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => { e.preventDefault(); onDelete(project.id); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete project</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {project.timeline}
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-accent" />
            {project.price_range}
          </div>
          <span className="flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <Link
            to={`/project/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2 transition-all duration-200"
          >
            View plan
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {featured && (
            <div className="flex items-center gap-0.5">
              {onDuplicate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={(e) => { e.preventDefault(); onDuplicate(project.id); }}
                    >
                      <Files className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Duplicate as draft</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => { e.preventDefault(); onDelete(project.id); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete project</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
