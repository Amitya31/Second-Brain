import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { cn } from '../../lib/utils';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogClose = AlertDialogPrimitive.Cancel;

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({className,...props},ref)=>(
   
    <AlertDialogOverlay
        ref={ref}
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
        className
      )}
      {...props}
    />
))
AlertDialogOverlay.displayName=AlertDialogPrimitive.Overlay.displayName;



export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogClose,
}