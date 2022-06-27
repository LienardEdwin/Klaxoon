import React from "react";

export default function Card (data:any){

    const bookMark= data.data

    return(
        <div key={bookMark.title}>
            <h3>{bookMark.title}</h3>
            <a href={bookMark.url}>{bookMark.url}</a>
            <div style={{backgroundImage: `url(${bookMark.thumbnail_url})`, width: 100, height: 100, backgroundRepeat: "no-repeat", backgroundSize: 'cover'}}/>
            <p>{bookMark.author_name}</p>
            <p>{bookMark.upload_date}</p>
            {
                bookMark.provider_name && bookMark.provider_name === 'Flickr' && (
                    <p>{bookMark.width} x {bookMark.height}</p>
                )
            }
        </div>
    )
}