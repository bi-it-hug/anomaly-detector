import { DestructiveConfirmationDialog } from "@/components/destructive-dialog"
import { Alert, PlatformColor, TouchableOpacity, View } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { AnomalyProps, LOCATIONS, Location } from "@/types/anomaly"
import { ANOMALY_DEFAULTS } from "@/data/anomaly-defaults"
import { LabelWrapper } from "@/components/label-wrapper"
import { useAnomaly } from "@/context/anomaly-context"
import * as ImagePicker from "expo-image-picker"
import { Button } from "@/components/ui/button"
import { Image, ImageProps } from "expo-image"
import { Input } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { SymbolView } from "expo-symbols"
import { useState } from "react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select"
// import { CameraType, useCameraPermissions } from "expo-camera"

export default function EditAnomaly() {
    const { anomalies, updateAnomaly, removeAnomaly } = useAnomaly()
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const currentAnomaly = anomalies.find((v) => v.id === Number(id))
    if (!currentAnomaly) return null

    const originalAnomaly = currentAnomaly.id

    const [title, setTitle] = useState(currentAnomaly?.title)
    const [description, setDescription] = useState(currentAnomaly.description)
    const [location, setLocation] = useState<Location>(currentAnomaly.location)
    const [imageSource, setImageSource] = useState<ImageProps["source"]>(
        currentAnomaly.image.source
    )

    const isEditing =
        currentAnomaly.title !== title ||
        currentAnomaly.description !== description ||
        currentAnomaly.location !== location ||
        currentAnomaly.image.source !== imageSource

    function handleSave(updatedAnomaly: AnomalyProps) {
        updateAnomaly(originalAnomaly, updatedAnomaly)
        router.back()
    }

    function handleDelete() {
        removeAnomaly(originalAnomaly)
        router.back()
    }

    function handleReset() {
        if (!currentAnomaly) return null
        setTitle(currentAnomaly.title)
        setDescription(currentAnomaly.description)
        setLocation(currentAnomaly.location)
        setImageSource(currentAnomaly.image.source ?? "")
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
                    title: `${currentAnomaly.title}`,
                    headerLeft: () => (
                        <DestructiveConfirmationDialog
                            data={{
                                anomaly: currentAnomaly,
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
                                            ...currentAnomaly,
                                            title,
                                            description,
                                            location,
                                            image: { ...currentAnomaly.image, source: imageSource },
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
                    alt={currentAnomaly.image.alt}
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
