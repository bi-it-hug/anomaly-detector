import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs"

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf={{ default: "house", selected: "house.fill" }} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="anomaly">
                <Label>Anomalies</Label>
                <Icon
                    sf={{
                        default: "suspension.shock",
                        selected: "door.garage.double.bay.closed.trianglebadge.exclamationmark",
                    }}
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
