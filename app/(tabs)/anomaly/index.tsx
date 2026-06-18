import { AnomalyCard } from "@/components/anomaly-card"
import { Text } from "@/components/ui/text"
import { useAnomaly } from "@/context/anomaly-context"
import { Stack, useRouter } from "expo-router"
import { ActivityIndicator, FlatList, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AnomalyScreen() {
    const { anomalies, isLoading } = useAnomaly()

    return (
        <>
            <Stack.Screen options={{ title: "Anomalies", headerTransparent: true }} />
            <SafeAreaView className="size-full items-center justify-center p-4">
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        style={{ flexGrow: 0 }}
                        numColumns={4}
                        columnWrapperClassName="gap-4 w-full"
                        contentContainerClassName="gap-4 w-full"
                        data={anomalies}
                        keyExtractor={(anomaly) => anomaly.id.toString()}
                        renderItem={({ item }) => <AnomalyCard data={item} />}
                    />
                )}
            </SafeAreaView>
        </>
    )
}
