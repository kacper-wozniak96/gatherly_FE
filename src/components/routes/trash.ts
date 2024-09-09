// import * as React from 'react';

// import { cn } from '@/lib/utils';

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
// 	errorMessage?: string;
// 	inputClassName?: string;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
// 	({ className, type, errorMessage, inputClassName, ...props }, ref) => {
// 		const isError = React.useMemo(() => !!errorMessage, [errorMessage]);

// 		return (
// 			<div className={cn('relative', className)}>
// 				<input
// 					type={type}
// 					className={cn(
// 						'block w-full text-xl placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5',
// 						'text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40',
// 						isError && 'border-red-400 dark:border-red-500',
// 						inputClassName
// 					)}
// 					ref={ref}
// 					{...props}
// 				/>
// 				{isError && <p className="mt-3 text-xl text-red-400 absolute top-3/4">{errorMessage}</p>}
// 			</div>
// 		);
// 	}
// );
// Input.displayName = 'Input';

// export { Input };

// --------------------------

// import { Slot } from '@radix-ui/react-slot';
// import { cva, type VariantProps } from 'class-variance-authority';
// import * as React from 'react';

// import { cn } from '@/lib/utils';

// const buttonVariants = cva(
// 	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
// 	{
// 		variants: {
// 			variant: {
// 				default: 'text-primary-foreground bg-emerald-500 hover:bg-emerald-500',
// 				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
// 				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
// 				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
// 				ghost: 'hover:bg-accent hover:text-accent-foreground',
// 				link: 'text-primary underline-offset-4 hover:underline',
// 			},
// 			size: {
// 				default: 'h-10 px-4 py-2',
// 				sm: 'h-9 rounded-md px-3',
// 				lg: 'h-11 rounded-md px-8',
// 				icon: 'h-10 w-10',
// 			},
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default',
// 		},
// 	}
// );

// export interface ButtonProps
// 	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
// 		VariantProps<typeof buttonVariants> {
// 	asChild?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
// 	({ className, variant, size, asChild = false, ...props }, ref) => {
// 		const Comp = asChild ? Slot : 'button';
// 		return <Comp className={cn(buttonVariants({ variant, size, className }), className)} ref={ref} {...props} />;
// 	}
// );
// Button.displayName = 'Button';

// export { Button, buttonVariants };
