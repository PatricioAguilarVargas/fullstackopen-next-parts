import React, { useState, useEffect } from 'react'
import peopleSvc from './services/people'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [ message, setMessage] = useState(null)
  const [ option, setOption] = useState("success")

  useEffect(
    () => {
      peopleSvc
          .getAll()
          .then(response => {
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

  const savePerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const person = persons.find(person => person.name === newName)
    //console.log(person)
    if(person){
      const res = window.confirm(`${person.name} is already added to phonenumber, replace the old number with a new one`)
      if(res){
        const personObject = {...person, number: newNumber }
        peopleSvc
          .update(personObject.id, personObject)
          .then(() => {
            const newPeople = persons.map(item => item.id === personObject.id ? personObject : item)
            console.log(newPeople)
            setPersons(newPeople)
            setOption("success")
            setMessage(`Saved '${personObject.name}'`)
          })
          .catch(error => alert(error))
      }
    }else{
      const personObject = { name: newName, number: newNumber }
      peopleSvc
          .create(personObject)
          .then(response => {
              const {data} = response;
              setPersons(persons.concat(data))
              setNewName('')
              setNewNumber(0)
              setOption("success")
              setMessage(`Saved '${personObject.name}'`)
          })
      
    }
    
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const res = window.confirm(`Delete to ${person.name}`)
    if(res){
      peopleSvc
        .remove(id)
        .then(() => {
          const newPeople = persons.filter(item => item.id !== person.id)
          setPersons(newPeople)
        })
        .catch(error => {
          setOption("error")
          setMessage(`Information of '${person.name}' has already been removed from server`)
        })
    }
    
    
  }

  const filterPerson = (filter === "") ? persons : persons.filter(x => x.name.toLowerCase().includes(filter));
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} option={option} />
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add New</h2>
      <PersonForm 
        savePerson={savePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filterPerson={filterPerson} deletePerson={deletePerson} />
    </div>
  )
}

export default App