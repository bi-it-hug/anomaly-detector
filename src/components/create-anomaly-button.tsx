import { useAnomaly } from "@/context/anomaly-context"
import { ANOMALY_DEFAULTS } from "@/data/anomaly-defaults"
import { Button } from "@/components/ui/button"
import { AnomalyProps } from "@/types/anomaly"
import { SymbolView } from "expo-symbols"
import { useRouter } from "expo-router"

export function CreateAnomalyButton() {
    const { anomalies, addAnomaly } = useAnomaly()
    const router = useRouter()

    function handlePress() {
        const anomaly: AnomalyProps = { ...ANOMALY_DEFAULTS, id: anomalies.length + 1 }
        addAnomaly(anomaly)
        router.push(`/create-anomaly?id=${encodeURIComponent(anomaly.id)}`)
    }

    return (
        <Button
            onPress={handlePress}
            size="icon"
            variant="ghost"
            className="ios:size-9 rounded-full web:mx-4">
            <SymbolView name="plus" />
        </Button>
    )
}
