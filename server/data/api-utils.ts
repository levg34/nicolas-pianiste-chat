interface BiographieParagraph {
    paragraph: string
}

const API_URL = process.env.API_URL

export async function getBiographie(): Promise<string[]> {
    const response = await fetch(API_URL + '/biographie')
    const data: BiographieParagraph[] = await response.json()
    return data.map((e) => e.paragraph).filter(Boolean)
}
