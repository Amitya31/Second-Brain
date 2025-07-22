import * as TabsPrimitive from '@radix-ui/react-tabs'

type Tabsprops = React.ComponentProps<typeof TabsPrimitive.Root>

function Tabs({children,className,...props}:Tabsprops) {
  return (
    <TabsPrimitive.Root {...props} className={className}>
        {children}
    </TabsPrimitive.Root>
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