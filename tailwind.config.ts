import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Grid system
			gridTemplateColumns: {
				'12': 'repeat(12, minmax(0, 1fr))',
			},
			// Font family - using system fonts as fallback, can be replaced with Inter
			fontFamily: {
				sans: [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
				],
			},
			// Typography scale
			fontSize: {
				'h1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 32px
				'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }], // 24px
				'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 20px
				'h4': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }], // 18px
				'body': ['1rem', { lineHeight: '1.5rem' }], // 16px
				'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
				'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: {
					DEFAULT: 'hsl(240, 10%, 20%)', // Darker charcoal
					muted: 'hsl(240, 5%, 45%)', // Muted text color
				},
				// Standard color palette
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8', // Primary color
					800: '#1E40AF',
					900: '#1E3A8A',
					950: '#172554',
				},
				success: {
					DEFAULT: '#22C55E', // Success color
					50: '#F0FDF4',
					100: '#DCFCE7',
					200: '#BBF7D0',
					300: '#86EFAC',
					400: '#4ADE80',
					500: '#22C55E',
					600: '#16A34A',
					700: '#15803D',
					800: '#166534',
					900: '#14532D',
					950: '#052E16',
				},
				warning: {
					DEFAULT: '#FACC15', // Warning color
					50: '#FEFCE8',
					100: '#FEF9C3',
					200: '#FEF08A',
					300: '#FDE047',
					400: '#FACC15',
					500: '#EAB308',
					600: '#CA8A04',
					700: '#A16207',
					800: '#854D0E',
					900: '#713F12',
					950: '#422006',
				},
				error: {
					DEFAULT: '#EF4444', // Error color
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#EF4444',
					600: '#DC2626',
					700: '#B91C1C',
					800: '#991B1B',
					900: '#7F1D1D',
					950: '#450A0A',
				},
				// Neutral colors
				neutral: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
					950: '#030712',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'button': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			},
			spacing: {
				'grid-gutter': '1.5rem', // 24px standard gutter
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
