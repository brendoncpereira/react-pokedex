export interface Pokemon {
    name: string
    abilities: Abilities[]
    types: Types[]
    sprites: Sprites
}

export interface Abilities {
    ability: {
        name: string
    }
}

export interface Types {
    type: {
        name: string
    }
}

export interface Sprites {
    other: {
        "official-artwork": {
            front_default: string
        }
    }
}
