
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: 'hsl(217 91% 95%)',
					100: 'hsl(217 91% 90%)',
					200: 'hsl(217 91% 80%)',
					300: 'hsl(217 91% 70%)',
					400: 'hsl(217 91% 60%)',
					500: 'hsl(217 91% 50%)',
					600: 'hsl(217 91% 45%)',
					700: 'hsl(217 91% 40%)',
					800: 'hsl(217 91% 35%)',
					900: 'hsl(217 91% 30%)'
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
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					50: 'hsl(142 71% 95%)',
					100: 'hsl(142 71% 90%)',
					500: 'hsl(var(--success))',
					600: 'hsl(142 71% 40%)',
					700: 'hsl(142 71% 35%)'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					50: 'hsl(38 92% 95%)',
					100: 'hsl(38 92% 90%)',
					500: 'hsl(var(--warning))',
					600: 'hsl(38 92% 45%)',
					700: 'hsl(38 92% 40%)'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					50: 'hsl(0 84% 95%)',
					100: 'hsl(0 84% 90%)',
					500: 'hsl(var(--error))',
					600: 'hsl(0 84% 55%)',
					700: 'hsl(0 84% 50%)'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					50: 'hsl(217 91% 95%)',
					100: 'hsl(217 91% 90%)',
					500: 'hsl(var(--info))',
					600: 'hsl(217 91% 55%)',
					700: 'hsl(217 91% 50%)'
				},
				// 专业图表配色
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
					6: 'hsl(var(--chart-6))',
					7: 'hsl(var(--chart-7))',
					8: 'hsl(var(--chart-8))',
					9: 'hsl(var(--chart-9))',
					10: 'hsl(var(--chart-10))'
				},
				// 文字颜色层次
				text: {
					heading: 'hsl(var(--text-heading))',
					body: 'hsl(var(--text-body))',
					secondary: 'hsl(var(--text-secondary))',
					muted: 'hsl(var(--text-muted))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { 
						transform: 'translateX(100%)' 
					},
					'100%': { 
						transform: 'translateX(0)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
