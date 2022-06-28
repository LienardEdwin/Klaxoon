export function getBookMark (id: string) {
    const url = `http://noembed.com/embed?url=${id}`
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}