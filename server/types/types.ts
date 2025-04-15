export interface ConcertOccurence {
    _id: string
    concertId: string
    show?: boolean
    date: Date
    time: string
    city: string
    place: string
    irUrl?: string
    cancel?: boolean
    info?: string
    photosUrl?: string
}

export interface ConcertDefinition {
    _id: string
    type: Type
    name: string
    img?: string
    details: Details
    info?: string
}

export interface Details {
    artists?: Artist[]
    pieces?: Piece[]
}

export interface Artist {
    instrument: string
    name: string
}

export interface Piece {
    composer: string
    title: string
}

export type Type = 'Solo' | 'Musique vocale et spectacles' | 'Composition'
