import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  Calendar,
  Check,
  Circle,
  LogOut,
  MapPin,
  Minus,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash,
  User,
  Users,
  X,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type IconName =
  | 'user'
  | 'calendar'
  | 'map-pin'
  | 'users'
  | 'circle'
  | 'plus'
  | 'minus'
  | 'check'
  | 'x'
  | 'trash'
  | 'pencil'
  | 'search'
  | 'bell'
  | 'settings'
  | 'log-out';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

export const Icon = ({ name, className, size = 20, color, ...props }: IconProps) => {
  const iconMap: Record<IconName, LucideIcon> = {
    user: User,
    calendar: Calendar,
    'map-pin': MapPin,
    users: Users,
    circle: Circle,
    plus: Plus,
    minus: Minus,
    check: Check,
    x: X,
    trash: Trash,
    pencil: Pencil,
    search: Search,
    bell: Bell,
    settings: Settings,
    'log-out': LogOut,
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent className={twMerge('w-5 h-5', className)} size={size} color={color} {...props} />
  );
};
