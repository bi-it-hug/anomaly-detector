import { ThemeToggle } from "@/components/theme-toggle"
import { Stack } from "expo-router"

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerLeft: () => <ThemeToggle />,
            }}
        />
    )
}
