export const fetchStuff = async (nextUrl, setNextUrl = null) => {
    let pokemonInfos = []

    let pokemons = await fetch(nextUrl)
        .then(res => {
            console.log(res)
            if (res.ok){
                return res.json()
            }
            return null
        })
        .then(data=>{
            if(data){
                setNextUrl && setNextUrl(data.next)
                return data.results
            }
            })

    if (pokemons?.length){
        for await (const pokemon of pokemons) {
            await fetch(pokemon.url)
                .then(res => res.json())
                .then(data => {
                    pokemonInfos[pokemonInfos.length] = {
                        name: pokemon.name,
                        data: data
                    }
                })
        }
    }

    return pokemonInfos
}

export const retrieveOnePokemon = async (url) => {
    let pokemonInfos = []

    let pokemons = await fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return null
        })
        .then(data => {
            if (data) {
                pokemonInfos = [data]
            }
        })

    return pokemonInfos
}