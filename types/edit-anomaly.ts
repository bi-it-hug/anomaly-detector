import { AnomalyProps } from "@/types/anomaly"

export type EditAnomalyProps = {
    anomaly: AnomalyProps
    onSave: (anomaly: AnomalyProps) => void
    // onCancel?: () => void
    onDelete?: () => void
}
