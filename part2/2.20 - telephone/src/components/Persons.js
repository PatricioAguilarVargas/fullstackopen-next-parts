const Persons = (props) => {
    return (
        <>
        <ul>
            {props.filterPerson.map((person,i) => 
            <li key={person.name}>  
                {person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button>
            </li>
            )}
        </ul>
        </>
    )
}

export default Persons;