import React from "react";
import './style.css'

type Props = {
    removeBookMark: (param: string) => void
    data: {
        title: string
        url: string
        thumbnail_url: string
        author_name: string
        upload_date: string
        provider_name: string
        width: string
        height: string
    }

}

export default function Card ({removeBookMark, data}:Props){

    const bookMark= data

    return(
        <div key={bookMark.title} className={'cardContainer'}>
            <h3>Title: {bookMark.title}</h3>
            <p>Url: <a href={bookMark.url}>{bookMark.url}</a></p>
            <div className={'poster'} style={{backgroundImage: `url(${bookMark.thumbnail_url})`}}/>
            <p>Author: {bookMark.author_name}</p>
            <p>Upload Date: {bookMark.upload_date}</p>
            {
                bookMark.provider_name && bookMark.provider_name === 'Flickr' && (
                    <p>{bookMark.width} x {bookMark.height}</p>
                )
            }
            <button onClick={()=>removeBookMark(bookMark.url)}>Remove</button>
        </div>
    )
}