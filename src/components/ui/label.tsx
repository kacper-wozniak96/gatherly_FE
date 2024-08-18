import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { IoStarSharp } from 'react-icons/io5';

import { cn } from '@/lib/utils';

const labelVariants = cva('text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants> & { isRequired?: boolean }
>(({ className, isRequired, ...props }, ref) => (
	<div className="flex items-center">
		<LabelPrimitive.Root
			ref={ref}
			className={cn('block text-xl text-gray-500 dark:text-gray-300 font-medium', className)}
			{...props}
		/>
		{isRequired && <IoStarSharp className="text-red-500 self-start" />}
	</div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

{
	/* <label for="username" class="block text-sm text-gray-500 dark:text-gray-300">
	Username
	</label>; */
}

{
	/* <LabelPrimitive.Root
	ref={ref}
	className={cn('block text-xl text-gray-500 dark:text-gray-300 font-medium', className)}
	{...props}
/> */
}
