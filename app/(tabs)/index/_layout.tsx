import { ThemeToggle } from "@/components/theme-toggle"
import { Stack } from "expo-router"

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerRight: () => <ThemeToggle />,
            }}
        />
    )
}