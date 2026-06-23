import { AnomalyProps } from "@/types/anomaly"

export type AnomalyContextProps = {
    isLoading: boolean
    anomalies: AnomalyProps[]
    addAnomaly: (anomaly: AnomalyProps) => void
    updateAnomaly: (id: AnomalyProps["id"], updatedAnomaly: AnomalyProps) => void
    removeAnomaly: (id: AnomalyProps["id"]) => void
}
