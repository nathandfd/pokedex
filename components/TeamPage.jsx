import {View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import StorageManage from "../utils/storage";
import {useEffect, useState} from "react";

export const TeamPage = ({navigation}) => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.addListener('focus', ()=>{
            setLoading(true);
            StorageManage.getItem('myTeam').then(team => {
                if (team) {
                    setTeam(JSON.parse(team));
                    setLoading(false);
                }
            });
        })
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
          loading?
              <View>
                  <Text style={styles.h1}>Chargement en cours...</Text>
              </View>
              :
              team.length?
              <FlatList
                  style={styles.list}
                  data={team}
                  renderItem={(item)=>{return itemList(item, navigation)}}
                  keyExtractor={item => item.name}
                  numColumns={2}
              />
              :
              <View>
                  <Text style={styles.h1}>Malheureusement ton équipe est vide :(</Text>
                  <Text style={styles.h2}>Mais reviens dès que auras ajouté des Pokémons</Text>
              </View>
      }
    </SafeAreaView>
  );
};

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
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    item:{
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
    },
    pokeImage:{
        height: 250,
        width: 250,
        marginBottom: 30
    },
    h1:{
        marginTop:20,
        fontSize: 30,
        fontWeight:"bold",
        textTransform:"uppercase",
        textAlign: "center"
    },
    h2:{
        marginTop:20,
        fontSize: 20,
        fontWeight:"bold",
        textTransform:"uppercase",
        textAlign: "center"
    }
})