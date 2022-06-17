import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/Home"
import PokemonDetails from "./components/PokemonDetails"
import Ionicons from '@expo/vector-icons/Ionicons';
import {SearchPage} from "./components/SearchPage";
import {TeamPage} from "./components/TeamPage";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const PokemonDetailsStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Details" component={PokemonDetails} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false
            }}>
                <Tab.Screen name="Pokedex" component={PokemonDetailsStack} options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = focused?'ios-book':'list-outline'
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                }}/>
                <Tab.Screen name="Recherche" component={SearchPage} options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={"search-outline"} size={size} color={color} />;
                    }
                }}/>
                <Tab.Screen name="Team" component={TeamPage} options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={"people-outline"} size={size} color={color} />;
                    }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
