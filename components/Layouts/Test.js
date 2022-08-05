import React from 'react'
import { Widget } from "@uploadcare/react-widget";

const Test = () => {
  return (
    <div style={{padding:200}}>
      <Widget publicKey="4dcd601dd6f929283524" onChange={(e)=>console.log(e)} />
    </div>
  )
}

export default Test