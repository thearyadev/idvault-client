import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <View>
        <Button title="Go to homepage!" onPress={() => router.navigate("/home/home")}/>
      </View>
    </View>
  );
}
