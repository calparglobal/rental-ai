import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-5 w-5',
      text: 'text-lg font-bold'
    },
    md: {
      icon: 'h-6 w-6',
      text: 'text-xl font-bold'
    },
    lg: {
      icon: 'h-8 w-8',
      text: 'text-3xl font-bold'
    }
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="relative">
        <Building2 
          className={cn(
            sizeClasses[size].icon,
            'text-blue-600 dark:text-blue-400'
          )} 
        />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
      </div>
      <span className={cn(
        sizeClasses[size].text,
        'text-gray-900 dark:text-gray-100 tracking-tight font-semibold'
      )}>
        Rental
        <span className="text-blue-600 dark:text-blue-400 ml-1">AI</span>
      </span>
    </div>
  )
}