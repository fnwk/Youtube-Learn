import {Stack} from "expo-router";

export default function MainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="(main)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="video/[videoId]"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
