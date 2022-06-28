import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import {getBookMark} from "./API/api";

type Response = {
    results: []
}

type Data = {
    title: string
    url: string
    thumbnail_url: string
    author_name: string
    upload_date: string
    provider_name: string
    width: string
    height: string
}

function App() {
    const [inputValue, setInputValue] = useState<string>('')
    const [dataBooks, setDataBooks] = useState<any>([])
    const [error, setError] = useState<boolean>(false)
    const [listBookMark, setListBookMark] = useState<string[]>([])

    useEffect(() =>{
        handleLifeCyle()
    }, [])

    useEffect(() => {
        if(inputValue !== ''){
            localStorage.setItem('listBookMark', JSON.stringify(listBookMark))
        }else{
            listBookMark.map((id:string, index) => {
                handleSearch(id)
            })
        }
    }, [listBookMark])

    const handleLifeCyle = () => {
        let localBookMark = localStorage.getItem('listBookMark') || ''
        if(localBookMark.length > 0){
            let result = JSON.parse(localBookMark)
            setListBookMark([...listBookMark, ...result])
        }
    }

    function handleSearch(param?: string) {
        if(inputValue === ''){
            getBookMark(param ? param : inputValue).then((data:Response) => {
                dataBooks.push(data)
                let newDataBooks = [...dataBooks]
                setDataBooks(newDataBooks)
            })
        }
    }

    const handle = () => {
        setListBookMark([...listBookMark, inputValue])
        getBookMark(inputValue).then((data:Response) => setDataBooks([...dataBooks, data]))
    }

    const removeBookMark = (urlToRemove: string) =>{
        const listBookUpdate = listBookMark.filter( (element:any) => element !== urlToRemove )
        localStorage.setItem("listBookMark", JSON.stringify(listBookUpdate))
        //handleLifeCyle()
    }


  return (
    <div className="App">
      <header className="App-header">
          <h1>bookmarks</h1>
        <input type={'search'} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}/>
        <button onClick={handle} disabled={inputValue.length === 0}>Send</button>
          <ul>
              {
                  listBookMark.map((el, index)=>{
                      return(
                          <li key={index}>
                            <a href={el}>{el}</a>
                          </li>
                      )
              })
              }
          </ul>
          {
              dataBooks && dataBooks.map((el:Data, index: number) =>(
                  <Card key={index} data={el} removeBookMark={removeBookMark}/>
              ))
          }
      </header>
    </div>
  );
}

export default App;
