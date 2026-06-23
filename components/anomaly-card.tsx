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
        <TouchableOpacity
            onPress={() => router.push(`/edit-anomaly?id=${encodeURIComponent(data.id)}`)}>
            <Card className="w-80 gap-4 overflow-hidden rounded-lg pb-4 pt-0">
                <View className="aspect-video w-full">
                    <Image
                        source={data.image.source}
                        alt={data.image.alt}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="cover"
                    />
                </View>
                <CardHeader className="flex-row px-4">
                    <View className="flex w-full flex-col gap-1">
                        <View className="flex h-fit flex-row items-center justify-between gap-1.5">
                            <CardTitle className="text-lg leading-none">
                                {data.title} #{data.id}
                            </CardTitle>
                            <Badge variant="outline" className="pl-1">
                                <MapPin className="text-primary" size={10} />
                                <Text className="text-primary">{data.location}</Text>
                            </Badge>
                        </View>
                        <CardDescription className="truncate">{data.description}</CardDescription>
                    </View>
                </CardHeader>
            </Card>
        </TouchableOpacity>
    )
}
