import { AnomalyCard } from "@/components/anomaly-card"
import { AnomalyProps } from "@/types/anomaly"
import { Stack } from "expo-router"
import { View } from "react-native"

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Home", headerTransparent: true }} />
            <View className="flex-1 items-center justify-center gap-8 p-4"></View>
        </>
    )
}
