import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'

interface TabsProps {
    children: ReactNode;
}

function Tabs({children}:TabsProps) {
  return (
    <div>
      {children}
    </div>
  )
}

type TabListsprops = React.ComponentProps<typeof TabsPrimitive.List>

function TabsList({children,...props}:TabListsprops) {
  return (
    <TabsPrimitive.List
     {...props}
    >
      {children}  
    </TabsPrimitive.List>
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>

function TabsTrigger({children,value,...props}:TabsTriggerProps){

    return (
        <TabsPrimitive.Trigger {...props} value={value}>
            {children}
        </TabsPrimitive.Trigger>
    )
}

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

function TabsContent({children,value,...props}:TabsContentProps){
    return (
        <TabsPrimitive.Content value={value} {...props}>
            {children}
        </TabsPrimitive.Content>
    )
}


export {Tabs,TabsTrigger,TabsContent,TabsList}