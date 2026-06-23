import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs"
import { PlatformColor } from "react-native"

export default function TabLayout() {
    return (
        <NativeTabs tintColor={PlatformColor("systemRed")} minimizeBehavior="onScrollDown">
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf={{ default: "house", selected: "house.fill" }} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="anomaly">
                <Label>Anomalies</Label>
                <Icon
                    sf={{
                        default: "eye",
                        selected: "eye.fill",
                    }}
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
                {/* role="search" */}
                <Label>Settings</Label>
                <Icon
                    sf={{
                        default: "gear",
                        selected: "gear",
                    }}
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
