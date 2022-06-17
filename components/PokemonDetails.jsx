import {Text, View, Image, StyleSheet, Button} from "react-native";
import {useEffect, useState} from "react";
import StorageManage from "../utils/storage";

export default function PokemonDetails({navigation, route}) {
    const {pokemonData} = route.params;
    const {name} = route.params.pokemonData
    const {height, sprites, stats} = route.params.pokemonData.data

    const [pokeStats, setPokeStats] = useState({})
    const [isPokemonInMyTeam, setIsPokemonInMyTeam] = useState(false)

    useEffect(() => {
        stats.forEach(stat => {
            setPokeStats((prevState) => {
                return {
                    ...prevState,
                    [stat.stat.name]: stat["base_stat"]
                }
            })
        })
    }, [])

    useEffect(() => {
        const myTeam = StorageManage.getItem("myTeam").then(res => {
            return JSON.parse(res)
        })

        myTeam.then(res => {
            if(res.length){
                return res.find(pokemon=>pokemon.name === pokemonData.name)
            }
            return false
        }).then(res => {
            setIsPokemonInMyTeam(!!res)
        })
    }, [isPokemonInMyTeam])

    const addPokemonToMyTeam = async (pokemon)=>{
        let myTeam = await StorageManage.getItem("myTeam")
        let newTeam = myTeam?JSON.parse(myTeam).concat(pokemon):[pokemon]
        StorageManage.setItem("myTeam", JSON.stringify(newTeam))
        setIsPokemonInMyTeam(true)
    }

    const removePokemonFromMyTeam = async (pokemon)=>{
        let myTeam = await StorageManage.getItem("myTeam")
        let newTeam = myTeam?JSON.parse(myTeam).filter(pokemon=>pokemon.name !== pokemon.name):[]
        StorageManage.setItem("myTeam", JSON.stringify(newTeam))
        setIsPokemonInMyTeam(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Image
                style={styles.pokeImage}
                source={{uri: sprites.other["official-artwork"].front_default}}
            />
            <Text>Taille : {(height * 30.48).toFixed(2)}cm</Text>
            <Text>Points de vie : {pokeStats.hp}</Text>
            <Text>Points d'attaque : {pokeStats.attack}</Text>
            <Text>Points de defense : {pokeStats.defense}</Text>
            <Text>Vitesse : {pokeStats.speed}</Text>

            {
                isPokemonInMyTeam?
                    <Button
                        color={'red'}
                        title="Remove from my team"
                        onPress={() => {
                            removePokemonFromMyTeam(pokemonData)
                        }}
                    />
                    :
                    <Button
                        color={'blue'}
                        style={styles.addButton}
                        title="Add to my team"
                        onPress={() => {
                            addPokemonToMyTeam(pokemonData)
                        }}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pokeImage:{
        height: 250,
        width: 250,
        marginBottom: 30
    },
    title:{
        marginTop:20,
        fontSize: 30,
        fontWeight:"bold",
        textTransform:"uppercase"
    },
    addButton:{
        backgroundColor:"blue"
    },
    removeButton:{
        backgroundColor:"red"
    }
})