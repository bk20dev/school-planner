import {Text} from "react-native";
import React from "react";

interface Route {
  name: string
}

export default function Placeholder({ route }: { route: Route }) {
  return <Text>🍕 {route.name}</Text>;
}
