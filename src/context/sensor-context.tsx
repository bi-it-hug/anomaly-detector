import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { SensorContextProps } from "@/types/sensor-context"
import { MagnetometerProps } from "@/types/magnetometer"
import { Magnetometer } from "expo-sensors"

const SensorContext = createContext<SensorContextProps | undefined>(undefined)

function SensorProvider({ children }: { children: ReactNode }) {
    const [magnetometerData, setMagnetometerData] = useState<MagnetometerProps | null>(null)

    useEffect(() => {
        Magnetometer.setUpdateInterval(50)
        const subscription = Magnetometer.addListener((data) => setMagnetometerData(data))
        return () => subscription.remove()
    }, [])

    return <SensorContext.Provider value={{ magnetometerData }}>{children}</SensorContext.Provider>
}

function useSensors() {
    const context = useContext(SensorContext)
    if (!context) throw new Error("useSensors must be used within a SensorProvider")
    return context
}

export { SensorProvider, useSensors }
