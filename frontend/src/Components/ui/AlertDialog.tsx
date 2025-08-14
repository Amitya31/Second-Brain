import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

const AlertDialogRoot = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>
>({...props},ref)=>{
    return(
        <AlertDialogRoot></AlertDialogRoot>
    )
}