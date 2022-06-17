import {Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from "react-native";
import {fetchStuff} from "../utils/api";
import {useState, useEffect} from "react";

export default function Home({navigation}){
    const [test, setTest] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

    const getPokemons = ()=>{
        setIsLoading(true)

        fetchStuff(nextUrl, setNextUrl).then((newPokemons)=>{
            setTest([...test, ...newPokemons])
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getPokemons()
    },[])

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView style={styles.scrollView}>
                <FlatList
                    style={styles.list}
                    data={test}
                    renderItem={(item)=>{return itemList(item, navigation)}}
                    keyExtractor={item => item.name}
                    numColumns={2}
                    onEndReached={()=>{getPokemons()}}
                />
                {
                    isLoading && <Text style={styles.loader}>Loading...</Text>
                }
            </SafeAreaView>
        </View>
    )
}

const itemList = ({item}, navigation)=>{
    return <TouchableOpacity
        key={item.name}
        style={styles.item}
        onPress={()=>navigation.navigate('Details', {pokemonData: item})} >
        <Image
            style={styles.pokeImage}
            source={{uri:item.data.sprites.other["official-artwork"].front_default}}
        />
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
    },
    item:{
        marginTop:30,
        width:"50%",
    },
    title:{
        textAlign:"center",
        textTransform:"uppercase"
    },
    button1:{
        backgroundColor: "blue",
        padding:10,
        borderRadius: 10,
        marginTop:10,
        color:"white"
    },
    button2:{
        backgroundColor: "red",
        padding:10,
        borderRadius: 10,
        marginTop:10,
        color:"yellow"
    },
    pokeImage:{
        marginRight:"auto",
        marginLeft:"auto",
        height:150,
        width:150,
    },
    scrollView:{
        position:"relative",
        width: "100%",
        height:Dimensions.get('window').height,
    },
    loader:{
        position:"absolute",
        width: "100%",
        padding:5,
        bottom:5,
        backgroundColor:"white",
        textAlign:"center",
        fontSize:20
    }
});