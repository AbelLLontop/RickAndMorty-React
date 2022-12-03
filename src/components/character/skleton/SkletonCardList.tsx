import Skeleton from './SkeletonCard'

const SkletonCardList = () => {
  return (
    <div className="listCharacters">  
    {Array(10).fill(0).map((_,i)=>(
    <div key={i} className="card card-shadow rounded">
    <div className="card_container_image">
      <div className="characterCardImage shadow skleton" ></div>
    </div>
    <div className="skleton " style={{width:'100%',height:'3.2rem',marginTop:'1rem',borderRadius:'1rem'}}>
        </div>
   </div>
    ))}
    </div>
  )
}

export default SkletonCardList