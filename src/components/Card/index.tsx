import React from "react";
import {convertDateTime, convertDate} from "../../helpers/convertDateTime";
import './style.css'

type Props = {
    removeBookMark: (id: string) => void
    bookMark: BookMark
}

export default function Card ({removeBookMark, bookMark}:Props){

    return(
        <div key={bookMark.title} className={'cardContainer'}>
            <h3>Title: {bookMark.title}</h3>
            <p className={'reduceUrl'}>Url: <a href={bookMark.url}>{bookMark.url}</a></p>
            <div className={'poster'} style={{backgroundImage: `url(${bookMark.thumbnail_url})`}}/>
            <p>Author: {bookMark.author_name}</p>
            {
                bookMark.upload_date && (
                    <p>{`Upload Date: ${convertDate(bookMark.upload_date)}`}</p>
                )
            }
            {
                bookMark.duration && (
                    <p>Duration : {convertDateTime(bookMark.duration)}</p>
                )
            }
            {
                bookMark.provider_name && bookMark.provider_name === 'Flickr' && (
                    <>
                        <p>{bookMark.width} x {bookMark.height}</p>
                    </>
                )
            }
            <button className={'buttonSubmit'} onClick={()=>removeBookMark(bookMark.url)}>Remove</button>
        </div>
    )
}