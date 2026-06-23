import { Text } from "@/components/ui/text"
import { View } from "react-native"

export function LabelWrapper({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <View className="flex h-fit w-full flex-col gap-1">
            <Text>{label}</Text>
            {children}
        </View>
    )
}
