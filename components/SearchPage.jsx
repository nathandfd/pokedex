import {SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image} from "react-native";
import {useState} from "react";
import {retrieveOnePokemon} from "../utils/api";

export const SearchPage = ({navigation})=>{
    const [searchResults, setSearchResults] = useState([]);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Recherche</Text>
            <SearchInput placeholder={"Rechercher un Pokémon"} setSearchResults={setSearchResults}/>
            <SearchResult searchResults={searchResults} navigation={navigation} />
        </SafeAreaView>
    )
}

const SearchInput = ({placeholder, setSearchResults})=>{
    const [value, setValue] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const debounce = (callback, wait) => {
        return (...args) => {
            clearTimeout(timeoutId);

            setTimeoutId(
                setTimeout(() => {
                    callback.apply(null, args);
                }, wait)
            )
        };
    }

    const getPokemons = (pokemonName)=>{
        if (pokemonName){
            retrieveOnePokemon('https://pokeapi.co/api/v2/pokemon/'+pokemonName.toLowerCase()).then((newPokemons)=>{
                setSearchResults(newPokemons)
            })
        }
    }

    const handleSearchTextChange = (text) => {
        setValue(text)
        debounce(() => {
            getPokemons(text)
        }, 1000)();
    }

    return(
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={(text) => handleSearchTextChange(text)}
            value={value}
        />
    )
}

const SearchResult = ({searchResults, navigation})=>{
    return(
        <View>
            {
                (searchResults?.length)?
                    <FlatList
                        style={styles.list}
                        data={searchResults}
                        renderItem={(item)=>{return itemList(item, navigation)}}
                        keyExtractor={item => item.name}
                        numColumns={2}
                    />
                    :
                    <Text>Aucun résultat</Text>
            }
        </View>
    )
}

const itemList = ({item}, navigation)=>{
    return <TouchableOpacity
        key={item.name}
        style={styles.item}
        onPress={()=>navigation.navigate('Details', {pokemonData: {name: item.name, data: item}})} >
        <Image
            style={styles.pokeImage}
            source={{uri:item.sprites.other["official-artwork"].front_default}}
        />
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        fontSize:20,
        fontWeight: "bold",
    },
    input:{
        width:300,
        height:40,
        borderColor: "gray",
        borderBottomWidth: 1,
        marginTop:40,
        paddingLeft:10,
    },
    pokeImage:{
        height: 250,
        width: 250,
        marginBottom: 30
    }
})