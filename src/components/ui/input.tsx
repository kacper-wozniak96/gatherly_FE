import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, errorMessage, ...props }, ref) => {
	const isError = React.useMemo(() => !!errorMessage, [errorMessage]);

	return (
		<div className="relative">
			<input
				type={type}
				className={cn(
					'block mt-2 w-full text-xl placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5',
					'text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300',
					isError && 'border-red-400 dark:border-red-500',
					className
				)}
				ref={ref}
				{...props}
			/>
			{isError && <p className="mt-3 text-xl text-red-400 absolute top-3/4">{errorMessage}</p>}
		</div>
	);
});
Input.displayName = 'Input';

export { Input };
