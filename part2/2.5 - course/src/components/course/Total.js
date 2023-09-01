
const Total = (props) => {
    //const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
    //console.log(props)
    const total = props.parts.reduce((total,val,index, arr) => {
      //console.log(total,val,index, arr)
      return parseInt(total + val.exercises)
    }, 0);
    return (
      <>
      <p><b>Total of {total} exercises</b></p>
      </>
    );
  }
  export default Total