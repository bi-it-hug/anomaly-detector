import { SFSymbol, SymbolView } from "expo-symbols"
import { Button } from "@/components/ui/button"
import { useColorScheme } from "nativewind"

const THEME_ICONS: Record<"light" | "dark", SFSymbol> = {
    light: "sun.max",
    dark: "moon",
}

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme()

    return (
        <Button
            onPress={toggleColorScheme}
            size="icon"
            variant="ghost"
            className="ios:size-9 rounded-full web:mx-4">
            <SymbolView name={THEME_ICONS[colorScheme ?? "light"]} />
        </Button>
    )
}
