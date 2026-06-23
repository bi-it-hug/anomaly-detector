import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { EditAnomalyProps } from "@/types/edit-anomaly"
import { cn } from "@/lib/utils"
import { AnomalyProps } from "@/types/anomaly"
import { SymbolView } from "expo-symbols"
import { useState } from "react"
import { PlatformColor } from "react-native"
import { useAnomaly } from "@/context/anomaly-context"

export function DestructiveConfirmationDialog({ data }: { data: EditAnomalyProps }) {
    const [open, setOpen] = useState(false)
    const { anomalies } = useAnomaly()

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className="ios:size-9 rounded-full web:mx-4"
                    size="icon"
                    variant="ghost"
                    onPress={() => setOpen(true)}>
                    <SymbolView name="trash" tintColor={PlatformColor("systemRed")} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete {anomalies[data.anomaly.id - 1].title}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onPress={() => setOpen(false)}>
                        <Text>Cancel</Text>
                    </AlertDialogCancel>
                    <AlertDialogAction
                        style={{ backgroundColor: PlatformColor("systemRed") }}
                        onPress={() => {
                            setOpen(false)
                            data.onDelete?.()
                        }}>
                        <Text>Delete</Text>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
