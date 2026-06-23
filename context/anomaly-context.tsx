import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AnomalyContextProps } from "@/types/anomaly-context"
import { sampleAnomalies } from "@/sample-data"
import { AnomalyProps } from "@/types/anomaly"

const AnomalyContext = createContext<AnomalyContextProps | undefined>(undefined)

function AnomalyProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [anomalies, setAnomalies] = useState<AnomalyProps[]>(sampleAnomalies)

    function addAnomaly(newAnomaly: AnomalyProps) {
        setAnomalies((prev) => [...prev, newAnomaly])
    }

    function updateAnomaly(id: AnomalyProps["id"], updatedAnomaly: AnomalyProps) {
        setAnomalies((prev) => {
            // const oldAnomaly = prev.find((a) => a.id === id)
            return prev.map((anomaly) => (anomaly.id === id ? updatedAnomaly : anomaly))
        })
    }

    function removeAnomaly(id: AnomalyProps["id"]) {
        setAnomalies((prev) => {
            // const oldAnomaly = prev.find((a) => a.id === id)
            return prev.filter((anomaly) => anomaly.id !== id)
        })
    }

    useEffect(() => {
        async function saveAnomalies() {
            try {
                await AsyncStorage.setItem("anomalies", JSON.stringify(anomalies))

                console.info("Successfully saved Anomalies")
            } catch (error) {
                console.error(`Error while saving Anomalies: ${error}`)
            } finally {
                setIsLoading(false)
            }
        }
        saveAnomalies()
    }, [anomalies])

    useEffect(() => {
        async function loadAnomalies() {
            try {
                const storedAnomalies = await AsyncStorage.getItem("anomalies")
                const parsed: AnomalyProps[] = JSON.parse(storedAnomalies ?? "[]")
                const anomalies = parsed.length > 0 ? parsed : sampleAnomalies

                setAnomalies(anomalies)

                console.info("Successfully loaded Anomalies!", anomalies)
            } catch (error) {
                console.error(`Error while loading Anomalies: ${error}`)
            } finally {
                setIsLoading(false)
            }
        }
        loadAnomalies()
    }, [])

    return (
        <AnomalyContext.Provider
            value={{
                isLoading,
                anomalies,
                addAnomaly,
                updateAnomaly,
                removeAnomaly,
            }}>
            {children}
        </AnomalyContext.Provider>
    )
}

function useAnomaly() {
    const context = useContext(AnomalyContext)
    if (!context) throw new Error("useAnomaly must be used within AnomalyProvider")
    return context
}

export { AnomalyProvider, useAnomaly }
