interface Paragraph {
    paragraph: string
}

const API_URL = process.env.API_URL

export async function getBiographie(): Promise<string[]> {
    const response = await fetch(API_URL + '/biographie')
    const data: Paragraph[] = await response.json()
    return data.map((e) => e.paragraph).filter(Boolean)
}

export async function getStudies(): Promise<{ paragraphs: string[]; awards: string[] }> {
    const response = await fetch(API_URL + '/studies')
    const data: (Paragraph | { award: string })[] = await response.json()
    return {
        paragraphs: data.map((e) => e.paragraph).filter(Boolean),
        awards: data.map((e) => e.award).filter(Boolean)
    }
}

export async function getRepertory() {
    const response = await fetch(API_URL + '/repertory').then((res) => res.json())
    return response
}

export async function getConcerts() {
    const response = await fetch(API_URL + '/concerts').then((res) => res.json())
    return response
}
