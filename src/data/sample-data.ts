import { AnomalyProps } from "@/types/anomaly"

const testImage =
    "https://images.unsplash.com/photo-1765445773906-64a36ecfd20e?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const sampleAnomalies: AnomalyProps[] = [
    {
        id: 1,
        title: "Unbekannte Lichtquelle",
        description: "Mehrere Personen meldeten ein pulsierendes Licht ohne erkennbare Ursache.",
        location: "Irgendwo",
        image: {
            source: testImage,
            alt: "Lichtquelle",
        },
    },
    {
        id: 2,
        title: "Temperaturabweichung",
        description: "Die Umgebungstemperatur fiel innerhalb von drei Minuten um 18°C.",
        location: "Keller",
        image: {
            source: testImage,
            alt: "Temperaturabweichung",
        },
    },
    {
        id: 3,
        title: "Signalstörung",
        description: "Kommunikationsgeräte verloren gleichzeitig die Verbindung.",
        location: "Lagerhalle",
        image: {
            source: testImage,
            alt: "Signalstörung",
        },
    },
    {
        id: 4,
        title: "Bewegung ohne Quelle",
        description: "Sensoren registrierten Bewegung in einem abgesperrten Bereich.",
        location: "Irgendwo",
        image: {
            source: testImage,
            alt: "Bewegung",
        },
    },
    {
        id: 5,
        title: "Zeitliche Inkonsistenz",
        description: "Mehrere Systeme zeigten unterschiedliche Zeitstempel für dasselbe Ereignis.",
        location: "Keller",
        image: {
            source: testImage,
            alt: "Zeitliche Inkonsistenz",
        },
    },
    {
        id: 6,
        title: "Akustisches Phänomen",
        description:
            "Ein periodisches Geräusch wurde aufgezeichnet, konnte jedoch nicht lokalisiert werden.",
        location: "Lagerhalle",
        image: {
            source: testImage,
            alt: "Akustisches Phänomen",
        },
    },
    {
        id: 7,
        title: "Objektverschiebung",
        description: "Ein Inventargegenstand wurde außerhalb seines gesicherten Bereichs gefunden.",
        location: "Irgendwo",
        image: {
            source: testImage,
            alt: "Objektverschiebung",
        },
    },
    {
        id: 8,
        title: "Anomale Netzwerkaktivität",
        description: "Unbekannte Datenpakete wurden über ein isoliertes Netzwerk übertragen.",
        location: "Keller",
        image: {
            source: testImage,
            alt: "Netzwerkaktivität",
        },
    },
]

export { sampleAnomalies }
