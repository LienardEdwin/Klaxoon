import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import {getBookMark} from "./API/api";

function App() {
    const [inputSearchValue, setInputSearchValue] = useState<string>('')
    const [booksMarks, setBooksMarks] = useState<BookMark[]>([])
    const [listBookMark, setListBookMark] = useState<string[]>([])

    const handleSearch = useCallback(() => {
        setListBookMark([...listBookMark, inputSearchValue])
        getBookMark(inputSearchValue).then((bookMark:BookMark) => setBooksMarks([...booksMarks, bookMark]))
    }, [listBookMark, inputSearchValue])

    const removeBookMark = useCallback( (urlToRemove: string) => {
        const listBookUpdate = listBookMark.filter( (url:string) => url !== urlToRemove )
        const dataBookUpdate = booksMarks.filter( (bookMark:BookMark) => bookMark.url !== urlToRemove )
        setListBookMark(listBookUpdate)
        setBooksMarks(dataBookUpdate)
    }, [listBookMark, booksMarks])

  return (
    <div className="App">
        <header className="App-header">
            <h1>Bookmarks</h1>
            <input className={'input'} type={'search'} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputSearchValue(e.target.value)}/>
            <button className={'button'} onClick={handleSearch} disabled={inputSearchValue.length === 0}>Send</button>
            <h2>List Url :</h2>
              <ul>
                  {
                      listBookMark.map((url:string, index: number)=>{
                          return(
                              <li key={index}>
                                <a className={'listUrl'} href={url}>{url}</a>
                              </li>
                          )
                      })
                  }
              </ul>
            <h2>Previews : </h2>
          {
              booksMarks && booksMarks.map((bookMark:BookMark, index: number) =>(
                  <Card key={index} bookMark={bookMark} removeBookMark={removeBookMark} />
              ))
          }
      </header>
    </div>
  );
}

export default App;
