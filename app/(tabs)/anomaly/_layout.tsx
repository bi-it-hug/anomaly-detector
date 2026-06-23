import { ThemeToggle } from "@/components/theme-toggle"
import { Stack } from "expo-router"

export default function AnomalyLayout() {
    return (
        <Stack
            screenOptions={{
                headerLeft: () => <ThemeToggle />,
            }}
        />
    )
}
