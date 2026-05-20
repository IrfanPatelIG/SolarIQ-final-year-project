import { Sun, Zap, Leaf, BatteryCharging, Gauge, CloudSun } from 'lucide-react';

export const AVATAR_OPTIONS = [
  {
    id: 'solar-blue',
    label: 'Solar Blue',
    className: 'from-blue-600 to-cyan-500',
    Icon: Sun,
  },
  {
    id: 'sunrise-gold',
    label: 'Sunrise Gold',
    className: 'from-yellow-500 to-orange-500',
    Icon: Zap,
  },
  {
    id: 'eco-green',
    label: 'Eco Green',
    className: 'from-emerald-600 to-lime-500',
    Icon: Leaf,
  },
  {
    id: 'grid-violet',
    label: 'Grid Violet',
    className: 'from-violet-600 to-fuchsia-500',
    Icon: BatteryCharging,
  },
  {
    id: 'power-red',
    label: 'Power Red',
    className: 'from-rose-600 to-red-500',
    Icon: Gauge,
  },
  {
    id: 'sky-slate',
    label: 'Sky Slate',
    className: 'from-slate-700 to-sky-500',
    Icon: CloudSun,
  },
];

export const getAvatarOption = (avatarId) => (
  AVATAR_OPTIONS.find((option) => option.id === avatarId) || AVATAR_OPTIONS[0]
);

const UserAvatar = ({ user, size = 'md', className = '' }) => {
  const avatar = getAvatarOption(user?.avatarId);
  const Icon = avatar.Icon;
  const sizeClass = size === 'lg' ? 'w-32 h-32 rounded-xl' : 'w-8 h-8 rounded-full';
  const iconSize = size === 'lg' ? 52 : 18;

  return (
    <div className={`${sizeClass} bg-gradient-to-br ${avatar.className} flex items-center justify-center text-white shadow-sm ${className}`}>
      <Icon size={iconSize} />
    </div>
  );
};

export default UserAvatar;
