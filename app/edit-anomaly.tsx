import DestructiveConfirmationDialog from "@/components/destructive-dialog"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useAnomaly } from "@/context/anomaly-context"
import { AnomalyProps, LOCATIONS, Location } from "@/types/anomaly"
import { useState } from "react"
import { View, Alert } from "react-native"
import { Image, ImageProps } from "expo-image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SymbolView } from "expo-symbols"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Text } from "@/components/ui/text"
import * as ImagePicker from "expo-image-picker"
import { LabelWrapper } from "@/components/label-wrapper"
import { CameraType, useCameraPermissions } from "expo-camera"
import { ANOMALY_DEFAULTS } from "@/anomaly-defaults"

export default function EditAnomaly() {
    const { anomalies, updateAnomaly, removeAnomaly } = useAnomaly()
    const { id } = useLocalSearchParams<{ id: string }>()

    const anomaly = anomalies.find((v) => v.id === Number(id))
    if (!anomaly) return null

    const originalAnomaly = anomaly.id

    const router = useRouter()
    const [title, setTitle] = useState(anomaly?.title)
    const [description, setDescription] = useState(anomaly.description)
    const [location, setLocation] = useState<Location>(anomaly.location)
    const [imageSource, setImageSource] = useState<ImageProps["source"]>(anomaly.image.source)

    const isEditing =
        anomaly.title !== title ||
        anomaly.description !== description ||
        anomaly.location !== location ||
        anomaly.image.source !== imageSource

    function handleSave(updatedAnomaly: AnomalyProps) {
        updateAnomaly(originalAnomaly, updatedAnomaly)
        router.back()
    }

    function handleDelete() {
        removeAnomaly(originalAnomaly)
        router.back()
    }

    function handleReset() {
        if (!anomaly) return null
        setTitle(anomaly.title)
        setDescription(anomaly.description)
        setLocation(anomaly.location)
        setImageSource(anomaly.image.source ?? "")
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

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
        })

        if (!result.canceled && result.assets[0]?.uri) {
            setImageSource(result.assets[0].uri)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: `${anomaly.title}`,
                    headerLeft: () => (
                        <DestructiveConfirmationDialog
                            data={{
                                anomaly: anomaly,
                                onSave: handleSave,
                                onDelete: handleDelete,
                            }}
                        />
                    ),
                    headerRight: () =>
                        isEditing ? (
                            <>
                                <Button
                                    className="ios:size-9 rounded-full web:mx-4"
                                    size="icon"
                                    variant="ghost"
                                    onPress={() => handleReset()}>
                                    <SymbolView name="arrow.clockwise" />
                                </Button>
                                <Button
                                    // style={{ backgroundColor: PlatformColor("systemBlue") }}
                                    className="ios:size-9 rounded-full web:mx-4"
                                    size="icon"
                                    variant="ghost"
                                    onPress={() =>
                                        handleSave({
                                            ...anomaly,
                                            title,
                                            description,
                                            location,
                                            image: { ...anomaly.image, source: imageSource },
                                        })
                                    }>
                                    <SymbolView name="checkmark" />
                                </Button>
                            </>
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
                <Button variant="secondary" onPress={pickImage}>
                    <Text className="text-primary">Change Image</Text>
                </Button>
                <Image
                    source={imageSource}
                    alt={anomaly.image.alt}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                    contentFit="cover"
                />

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
