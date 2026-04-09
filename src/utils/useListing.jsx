import React, { useState, useEffect } from "react"
import EachUtils from "@/utils/EachUtils"
import Progress from "@/component/ui/progress"
import Language from "@/component/ui/language"
import CardsUsers from "@/component/ui/cards/cardsUsers"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "@/component/ui/loader"
import IonIcon from "@/component/ui/common/ionicon"

const ComponentList = {
 users: CardsUsers,
}

const UseListing = ({ 
    data = [],
    count = 4,
    scroll,
    type,
    handler,
    effect=false,
    animate="zoom-in-down"
  }) => {
  const slices = data?.slice(0, count);
  const ComponentRender = ComponentList?.[type]
  const [hasMore, setHasMore] = useState(true)
  const [visibleItems, setVisibleItems] = useState(slices)
  
  useEffect(() => {
    setVisibleItems(data.slice(0, count))
  }, [data])
  
  useEffect(() => {
   setHasMore(data?.length !== visibleItems?.length ? true : false)
  }, [visibleItems, data])
  
  const fetchMoreData = () => {
   const nextItems = data?.slice(visibleItems?.length, visibleItems?.length + count)
   
   setVisibleItems(prevItems => [...prevItems, ...nextItems])
  }
  
  if (data?.length === 0) return <Loader />
  return (
   <InfiniteScroll
     hasMore={hasMore}
     next={scroll ? fetchMoreData : null}
     dataLength={visibleItems.length}
    endMessage={
     <p className="cards-info description">
     </p>
    }>
    <EachUtils
     of={visibleItems}
     render={(value, index) => {
      
      return (
      <div 
       key={index}
       style={{ width: "100%" }}
       {...(effect && index >= count
          ? {
              "data-aos-delay": index * 150,
              "data-aos-duration": 600,
              "data-aos": animate,
            }
          : {}
        )}
       >
        <ComponentRender
          key={index} 
          data={value} 
          index={index} 
          handler={handler} 
        />
      </div>
     )}}/>
    {hasMore && (
     <button
      className="button"
      onClick={fetchMoreData}>
       <IonIcon name='caret-down' className="icon" />
       More
     </button>
     )}
    </InfiniteScroll>
  )
}

export default UseListing;