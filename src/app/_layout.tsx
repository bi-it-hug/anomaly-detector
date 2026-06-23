import { SafeAreaProvider } from "react-native-safe-area-context"
import { AnomalyProvider } from "@/context/anomaly-context"
import { SensorProvider } from "@/context/sensor-context"
import { ThemeProvider } from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "nativewind"
import { NAV_THEME } from "@/lib/theme"
import "@/global.css"

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router"

export default function RootLayout() {
    const { colorScheme } = useColorScheme()
    const router = useRouter()

    return (
        <SensorProvider>
            <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
                <SafeAreaProvider>
                    <AnomalyProvider>
                        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen
                                name="edit-anomaly"
                                options={{ headerShadowVisible: false, presentation: "modal" }}
                            />
                            <Stack.Screen
                                name="create-anomaly"
                                options={{ headerShadowVisible: false, presentation: "modal" }}
                            />
                        </Stack>
                        <PortalHost />
                    </AnomalyProvider>
                </SafeAreaProvider>
            </ThemeProvider>
        </SensorProvider>
    )
}
