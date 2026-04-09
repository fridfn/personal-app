import React, { Children } from "react"

const EachUtils = ({ of, render }) => {
 try {
   return Children?.toArray(of?.map((items, index) => render(items, index)))
 } catch (error) {
   return of
 }
}

export default EachUtils