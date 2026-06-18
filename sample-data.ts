import { AnomalyProps } from "@/types/anomaly"

const sampleAnomalies: AnomalyProps[] = [
    {
        id: 1,
        title: "Nein",
        description: "Furz",
        location: "Nirgendwo",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Schiss",
        },
    },
    {
        id: 2,
        title: "Fliegender Käseschiss",
        description: "Ein Käseschiss wurde dabei beobachtet, wie er durch die Luft segelte.",
        location: "Kühlschrankdimension",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Käseschiss",
        },
    },
    {
        id: 3,
        title: "Pferdeschiss-Monolith",
        description: "Ein mysteriöser Monolith aus reinem Pferdeschiss erschien über Nacht.",
        location: "Wald von Schissingen",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Pferdeschiss",
        },
    },
    {
        id: 4,
        title: "Eierschiss-Resonanz",
        description: "Mehrere Eierschiss-Wellen wurden von Sensoren aufgezeichnet.",
        location: "Labor 7",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Eierschiss",
        },
    },
    {
        id: 5,
        title: "Der große Wurstschiss",
        description: "Ein ungewöhnlich langer Wurstschiss blockiert den Hauptkorridor.",
        location: "Sektor B",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Wurstschiss",
        },
    },
    {
        id: 6,
        title: "Conspumpipotter",
        description: "Ein unbekanntes Wesen murmelt nur 'Conspumpipotter'.",
        location: "Serverraum",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Conspumpipotter",
        },
    },
    {
        id: 7,
        title: "Schwebende Tastatur",
        description: "Eine Tastatur ignoriert sämtliche Gesetze der Physik.",
        location: "Büro 404",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Schwebende Tastatur",
        },
    },
    {
        id: 8,
        title: "Bytefresser",
        description: "Dateien verschwinden und werden durch Schiss ersetzt.",
        location: "Datenzentrum",
        image: {
            src: require("@/assets/images/anomaly.jpg"),
            alt: "Bytefresser",
        },
    },
]

export { sampleAnomalies }
