import { Link } from "react-router-dom";

import {
  Home,
  Users,
  Settings,
  BarChart,
  FileText,
  User,
  Building,
  Calendar,
  Mail,
  Bell,
  BookOpen,
  HelpCircle,
  ToiletIcon,
  SquareLibraryIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-3.5 h-3.5" />,
  users: <Users className="w-3.5 h-3.5" />,
  settings: <Settings className="w-3.5 h-3.5" />,
  analytics: <BarChart className="w-3.5 h-3.5" />,
  analyticsToilet: <ToiletIcon className="w-3.5 h-3.5" />,
  analyticsLection: <SquareLibraryIcon className="w-3.5 h-3.5" />,
  documents: <FileText className="w-3.5 h-3.5" />,
  profile: <User className="w-3.5 h-3.5" />,
  building: <Building className="w-3.5 h-3.5" />,
  calendar: <Calendar className="w-3.5 h-3.5" />,
  mail: <Mail className="w-3.5 h-3.5" />,
  notifications: <Bell className="w-3.5 h-3.5" />,
  learning: <BookOpen className="w-3.5 h-3.5" />,
  help: <HelpCircle className="w-3.5 h-3.5" />,
};

interface QuickLink {
  name: string;
  href: string;
  icon?: keyof typeof iconMap | React.ReactNode;
}

interface QuickLinksProps {
  title?: string;
  links: QuickLink[];
  className?: string;
}

export const QuickLinks = ({
  title = "Быстрое перемещение",
  links,
  className,
}: QuickLinksProps) => {
  const getIcon = (icon?: keyof typeof iconMap | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === "string" && icon in iconMap) {
      return iconMap[icon];
    }
    return icon;
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {title && (
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}

      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-md transition-all duration-200 border border-transparent hover:border-border/50"
          >
            {getIcon(link.icon) && (
              <span className="flex-shrink-0">{getIcon(link.icon)}</span>
            )}
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
