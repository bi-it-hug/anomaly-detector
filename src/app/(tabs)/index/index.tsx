import { useSensors } from "@/context/sensor-context"
import { Text } from "@/components/ui/text"
import { View } from "react-native"
import { Stack } from "expo-router"

export default function HomeScreen() {
    const { magnetometerData } = useSensors()

    return (
        <>
            <Stack.Screen options={{ title: "Home", headerTransparent: true }} />
            <View className="flex-1 items-center justify-center gap-8 p-4">
                <View>
                    <Text>{magnetometerData?.x.toFixed(2)}</Text>
                    <Text>{magnetometerData?.y.toFixed(2)}</Text>
                    <Text>{magnetometerData?.z.toFixed(2)}</Text>
                </View>
            </View>
        </>
    )
}
