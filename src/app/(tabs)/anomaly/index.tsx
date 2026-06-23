import { AnomalyCard } from "@/components/anomaly-card"
import { useAnomaly } from "@/context/anomaly-context"
import { useSensors } from "@/context/sensor-context"
import { Stack } from "expo-router"
import { ActivityIndicator, FlatList, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AnomalyScreen() {
    const { anomalies, isLoading } = useAnomaly()

    return (
        <>
            <Stack.Screen options={{ title: "Anomalies", headerTransparent: true }} />
            <View className="m-0 size-full items-center justify-center">
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        style={{
                            flex: 1,
                            width: "100%",
                            display: "flex",
                        }}
                        numColumns={4}
                        columnWrapperClassName="gap-4 w-full flex-wrap py-4"
                        contentContainerClassName="gap-4 w-full"
                        // contentContainerStyle={{ justifyContent: "center" }}
                        columnWrapperStyle={{ justifyContent: "center" }}
                        data={anomalies}
                        keyExtractor={(anomaly) => anomaly.id.toString()}
                        renderItem={({ item }) => <AnomalyCard data={item} />}
                    />
                )}
            </View>
        </>
    )
}
