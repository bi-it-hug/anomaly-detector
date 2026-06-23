import { ImageProps } from "expo-image"

export const LOCATIONS = ["Lagerhalle", "Irgendwo", "Keller", "Unknown"] as const

export type Location = (typeof LOCATIONS)[number]

export type AnomalyProps = {
    id: number
    title: string
    description: string
    location: Location
    image: ImageProps
}
