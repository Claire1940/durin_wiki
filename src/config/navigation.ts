import {
	BookOpen,
	Wrench,
	Package,
	Users,
	Sword,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string
	path: string
	icon: LucideIcon
	isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'build', path: '/build', icon: Wrench, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'materials', path: '/materials', icon: Package, isContentType: true },
	{ key: 'teams', path: '/teams', icon: Users, isContentType: true },
	{ key: 'weapons', path: '/weapons', icon: Sword, isContentType: true },
]

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
