import Part from './Part'
const Content  = (props) => {  
    //console.log(props.parts)
    return (
      <>
        {props.parts.map(part => {
            return <Part key={part.id} part={part.name} exercises={part.exercises} />
        })}
      </>
    );
  }
  export default Content