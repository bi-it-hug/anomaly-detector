import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TouchableOpacity, View } from "react-native"
import { AnomalyProps } from "@/types/anomaly"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react-native"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import { Image } from "expo-image"

export function AnomalyCard({ data }: { data: AnomalyProps }) {
    const router = useRouter()

    return (
        <TouchableOpacity onPress={() => router.push(`/anomaly?id=${encodeURIComponent(data.id)}`)}>
            <Card className="w-80 overflow-hidden pt-0">
                <Image source={data.image.src} className="aspect-video w-full" contentFit="cover" />
                <CardHeader className="flex-row">
                    <View className="flex h-fit flex-1 flex-col gap-1.5">
                        <CardTitle>
                            {data.title} #{data.id}
                        </CardTitle>
                        <CardDescription className="truncate">{data.description}</CardDescription>
                    </View>
                    <View>
                        <Badge variant="default" className="pl-1">
                            <MapPin className="text-primary-foreground" />
                            <Text>{data.location}</Text>
                        </Badge>
                    </View>
                </CardHeader>
            </Card>
        </TouchableOpacity>
    )
}
