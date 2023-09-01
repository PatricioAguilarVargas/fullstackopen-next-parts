import Header from './Header'
import Content from './content/Content'
import Total from './Total'

const Course = (props) => {
    //console.log(props)
   return (
     <>
        {props.courses.map((course,indice) => {
            return(
              <div key={course.id}>
                <Header  name={course.name} />
                <Content parts={course.parts} />
                <Total  parts={course.parts} />
              </div>
            )
            
        })}
      
     </>
   )
 }

 export default Course