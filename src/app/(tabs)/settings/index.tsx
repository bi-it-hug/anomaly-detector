import { View } from "react-native"
import { Stack } from "expo-router"

export default function SettingsScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Settings", headerTransparent: true }} />
            <View className="flex-1 items-center justify-center gap-8 p-4"></View>
        </>
    )
}
