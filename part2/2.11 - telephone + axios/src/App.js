import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)

  useEffect(
    () => {
      axios.get('http://localhost:3001/persons').then(response => {
        const {data} = response;
        setPersons(data)
      })
    }, 
    [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    if(persons.findIndex( x => x.name === newName) >= 0 ){
        alert(`${newName} is already added to phonebook`)
        return;
    }
    const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber(0)
  }

  const filterPerson = (filter === "") ? persons : persons.filter(x => x.name.toLowerCase().includes(filter));
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add New</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filterPerson={filterPerson} />
    </div>
  )
}

export default App