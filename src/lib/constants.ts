// Shared constants used across the app

export const APP_NAME = "ProjectPilot";

export const PROJECT_STATUSES: Record<string, { label: string; classes: string; dot: string }> = {
  planning: {
    label: "Draft",
    classes: "bg-muted text-muted-foreground border border-border",
    dot: "bg-muted-foreground",
  },
  in_progress: {
    label: "In Review",
    classes: "bg-warning/10 text-warning border border-warning/20",
    dot: "bg-warning",
  },
  approved: {
    label: "Approved",
    classes: "bg-info/10 text-info border border-info/20",
    dot: "bg-info",
  },
  completed: {
    label: "Completed",
    classes: "bg-success/10 text-success border border-success/20",
    dot: "bg-success",
  },
};

export const FREE_GENERATION_LIMIT = 10;
