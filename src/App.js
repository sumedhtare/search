import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from "react-router-dom";
import { Hint } from 'react-autocomplete-hint';
import axios from 'axios';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/name/:value">
          <Name />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;


const Home = () => {
  const [search, setSearch] = useState('')
  const [hintData, setHintData] = useState([])

  useEffect(()=>{
axios.get('http://localhost:5000/getnames')
.then(res=>{
  setHintData(res.data)
})
  },[])

  let history = useHistory();
  const handleSearch = () => {
    if (hintData.includes(search)) {
      console.log('hint data found', search)
      history.push(`/name/${search}`)
    }
    else {
      if (window.confirm('Request the name?')) {
        console.log('handleSearch', search)

        axios.post(`http://localhost:5000/name?name=${search}`)
        .then(res=>{
          setHintData(res.data)
        })
      }
    }
  }
  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'20%'}}>
      <Hint options={hintData} allowTabFill>
        <input type='text' placeholder='Enter name' style={{width:'300px',marginRight:5}} onChange={(e) => { setSearch(e.target.value) }} value={search} />
      </Hint>
      <button type='button' onClick={handleSearch}>Search</button>
    </div>
  )
}

const Name = () => {
  let { value } = useParams();
  const [name, setName] = useState('')
  useEffect(()=>{
    axios.get(`http://localhost:5000/name?name=${value}`)
    .then(res=>{
      setName(res.data)
    })
      },[])
  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'20%'}}>
      <h3>{name}</h3>
    </div>
  )
}

