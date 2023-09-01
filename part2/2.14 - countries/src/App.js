import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(
    () => {
      axios.get('https://restcountries.com/v3.1/all').then(response => {
        const {data} = response;
        setCountries(data)
      })
    }, 
    [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }
  const filterCountries =  (filter === "") ? countries : countries.filter(x => x.name.common.toLowerCase().includes(filter.trim()));
  
  return (
    <div>
      <h2>Find countries</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      <Country countries={filterCountries} />
    </div>
  )
}

export default App