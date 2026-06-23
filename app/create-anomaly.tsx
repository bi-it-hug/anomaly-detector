import { Alert, PlatformColor, TouchableOpacity, View } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { AnomalyProps, LOCATIONS, Location } from "@/types/anomaly"
import { useAnomaly } from "@/context/anomaly-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SymbolView } from "expo-symbols"
import { ANOMALY_DEFAULTS } from "@/anomaly-defaults"
import { LabelWrapper } from "@/components/label-wrapper"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
import { Text } from "@/components/ui/text"
import { Image, ImageProps } from "expo-image"
import * as ImagePicker from "expo-image-picker"

export default function CreateAnomaly() {
    const { anomalies, addAnomaly } = useAnomaly()
    const router = useRouter()

    const { id } = useLocalSearchParams<{ id?: string }>()
    const [title, setTitle] = useState(ANOMALY_DEFAULTS.title)
    const [description, setDescription] = useState(ANOMALY_DEFAULTS.description)
    const [location, setLocation] = useState<Location>(ANOMALY_DEFAULTS.location)
    const [imageSource, setImageSource] = useState<ImageProps["source"]>(
        ANOMALY_DEFAULTS.image.source
    )

    // const emptyAnomaly = anomalies.find((anomaly) => anomaly.id === Number(id))

    const isEditing =
        title !== ANOMALY_DEFAULTS.title ||
        description !== ANOMALY_DEFAULTS.description ||
        location !== ANOMALY_DEFAULTS.location ||
        imageSource !== ANOMALY_DEFAULTS.image.source

    function handleSave(anomaly: AnomalyProps) {
        addAnomaly(anomaly)
        router.back()
    }

    function handleReset() {
        setTitle(ANOMALY_DEFAULTS.title)
        setDescription(ANOMALY_DEFAULTS.description)
        setLocation(ANOMALY_DEFAULTS.location)
        setImageSource(ANOMALY_DEFAULTS.image.source)
    }

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission required",
                "Permission to access the media library is required."
            )
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: "images" })
        if (!result.canceled && result.assets[0]?.uri) setImageSource(result.assets[0].uri)
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: "New Anomaly",
                    headerRight: () =>
                        isEditing ? (
                            <Button
                                className="ios:size-9 rounded-full web:mx-4"
                                size="icon"
                                variant="ghost"
                                onPress={() => handleReset()}>
                                <SymbolView name="arrow.clockwise" />
                            </Button>
                        ) : (
                            <Button
                                className="ios:size-9 rounded-full web:mx-4"
                                size="icon"
                                variant="ghost"
                                onPress={() => router.back()}>
                                <SymbolView name="xmark" />
                            </Button>
                        ),
                }}
            />
            <View className="flex items-start justify-center gap-3 p-4">
                {imageSource !== ANOMALY_DEFAULTS.image.source && (
                    <Button variant="secondary" onPress={pickImage}>
                        <Text className="text-primary">Change Image</Text>
                    </Button>
                )}

                {imageSource !== ANOMALY_DEFAULTS.image.source ? (
                    <Image
                        source={imageSource}
                        style={{ width: "100%", height: 200, borderRadius: 10 }}
                        contentFit="cover"
                    />
                ) : (
                    <View
                        className="flex h-40 w-full flex-row items-center justify-center gap-2 rounded-lg bg-muted-foreground"
                        style={{
                            height: 200,
                        }}>
                        <TouchableOpacity className="h-full flex-1 items-center justify-center rounded-lg bg-muted">
                            <SymbolView name="photo" size={50} tintColor={PlatformColor("label")} />
                            <Text>Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-full flex-1 items-center justify-center rounded-lg bg-muted">
                            <SymbolView
                                name="camera"
                                size={50}
                                tintColor={PlatformColor("label")}
                            />
                            <Text>Camera</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <LabelWrapper label="Title">
                    <Input placeholder="Title" value={title} onChangeText={setTitle} />
                </LabelWrapper>

                <LabelWrapper label="Description">
                    <Input
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                </LabelWrapper>

                <LabelWrapper label="Location">
                    <Select
                        value={{ value: location, label: location }}
                        onValueChange={(option) => option && setLocation(option.value as Location)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="w-[180px]">
                            <SelectGroup>
                                <SelectLabel>Location</SelectLabel>
                                {LOCATIONS.map((loc) => (
                                    <SelectItem key={loc} label={loc} value={loc}>
                                        {loc}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </LabelWrapper>
            </View>
        </>
    )
}
