import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Card from "./components/Card";



function App() {
    const [inputValue, setInputValue] = useState<string>('')
    const [dataBooks, setDataBooks] = useState<any>([])
    const [error, setError] = useState<boolean>(false)
    const [listBookMark, setListBookMark] = useState<string[]>([])

    useEffect(() =>{
        let localBookMark = localStorage.getItem('listBookMark')
        if(localBookMark){
            let result = JSON.parse(localBookMark)
            setListBookMark([...listBookMark, ...result])
        }
    }, [])

    useEffect(() => {
        if(inputValue !== ''){
            localStorage.setItem('listBookMark', JSON.stringify(listBookMark))
        }
        if(listBookMark.length > 1){
            listBookMark.map((el) =>{
                handleSearch(el)
            })
        }
    }, [listBookMark])

    async function handleSearch(param?: string) {
        let url = `http://noembed.com/embed?url=${param ? param : inputValue}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            if(data.length === 0){
                setDataBooks(data)
            }else{
                setDataBooks((book: any) => [...book, data])
            }
        } catch (err) {
            setError(true)
        }
    }

    const handle = () => {
        setListBookMark([...listBookMark, inputValue])
        handleSearch()
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
              dataBooks && dataBooks.map((el:{}) =>(
                  <Card data={el}/>
              ))

          }
      </header>
    </div>
  );
}

export default App;
