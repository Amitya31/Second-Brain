import * as React from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from '../../lib/utils';
import { XIcon } from 'lucide-react';


const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Layout
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg",
        // "data-[state=open]:animate-in data-[state=closed]:animate-out",
        // "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        // "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        // "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        // Responsive
        "sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
      <XIcon />
      <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>{
  return (
    <div
      className={cn('flex flex-col gap-y-2 text-center sm:text-left', 
        className
      )}
      {...props}
    />
  )
}
DialogHeader.displayname = DialogHeader;

const DialogTitle = React.forwardRef<
React.ComponentRef<typeof DialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({className,...props},ref)=>(
    <DialogPrimitive.Title
     ref={ref}
     className={cn('text-lg font-semibold leading-none tracking-tight'
      ,className)}
     {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogFooter = ({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>{
  return (
    <div 
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className)}
      {...props}
    />
  )
}
DialogFooter.displayName= DialogFooter;

const DialogDescription = React.forwardRef<
React.ComponentRef<typeof DialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({className,...props},ref)=>(
  <DialogPrimitive.Description
   ref={ref}
   className={cn('text-sm',className)}
   {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName;


export {
  Dialog,
  DialogClose,
  DialogPortal,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle
}


