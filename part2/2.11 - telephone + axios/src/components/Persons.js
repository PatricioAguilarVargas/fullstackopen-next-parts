const Persons = (props) => {
    return (
        <>
        <ul>
            {props.filterPerson.map((person,i) => 
            <li key={person.name}>  {person.name} {person.number} </li>
            )}
        </ul>
        </>
    )
}

export default Persons;