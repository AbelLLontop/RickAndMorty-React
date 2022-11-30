import Skeleton from './SkeletonCard'

const SkletonCardList = () => {
  return (
    <div className="listCharacters">  
    {Array(10).fill(0).map((_,i)=><Skeleton key={i}/>)}
    </div>
  )
}

export default SkletonCardList