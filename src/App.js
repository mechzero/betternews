import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import {format} from "date-fns"

function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("Programming")
  const [text, setText] = useState("")
  const [largeTitle, setLargeTitle] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
      const fetchArticles = async() => {
        const res = await fetch (`https://hn.algolia.com/api/v1/search?query=${query}`)
        const data = await res.json()
        setItems(data.hits)
        setLargeTitle(data.hits[0])
      }

      fetchArticles()
      setIsLoading(false)
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text){
      // do something
    } else {
      setQuery(text)
      setText("")
    }
  }

  return (
    <section className="section">
      <form autoComplete="off" onSubmit={handleSubmit}> 
        <input 
        type="text" 
        name="search" 
        id="search"
        value={text} 
        onChange = {(e) => setText(e.target.value)}
        placeholder="Search For Something" />

        <button id="search-btn">Search</button>
        
      </form>
     {isLoading ? <div className="spinner"></div> : <>
     <article className='title'>
          <h1> {largeTitle.title}</h1>
          <a href= {largeTitle.url} target="_blank" rel="noreferrer">Read Full Article </a>
        </article>

        <p className="category"> 
        Category: <span>{query}</span>
        </p>
       
        <article className="cards"> 
         
          {items.map(({author, created_at, title, url, objectId}) => (
            <div key = {objectId}>
              <h2>{title}</h2>
              <ul>
                <li> By {author}</li>
                <li> <a href= {url} target="_blank" rel="noreferrer">Read Full Article </a></li>
             
              </ul>
              <p>{format(new Date(created_at),"dd MMMM yyyy")}</p>
              </div>
          ))}
        </article>
     </> }
      </section>
  );
}

export default App;
