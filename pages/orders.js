import React from 'react'
import Orders from '/components/Layouts/Orders/'
import axios from 'axios'

const orders = ({orderData, clientData}) => {
  return (
    <div className="order-styles">
      <Orders orderData={orderData} clientData={clientData} />
    </div>
  )
}

export default orders

export async function getServerSideProps({req,res}) {

  //const cookies = new Cookies(req, res);
  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DELIVERY_APP_SHOW_ORDERS_GET,{
      // headers:{
      //     "x-access-token":`${cookies.get('token')}`
      // }
    }).then((x)=>x.data);
  
    const requestTwo = await axios.get(process.env.NEXT_PUBLIC_DELIVERY_APP_SHOW_CLIENTS_GET,{
      // headers:{
      //     "x-access-token":`${cookies.get('token')}`
      // }
    }).then((x)=>x.data);
    
    // const dataone = await requestOne
    // const config = {
    //     method: 'get', headers: { 'Content-Type': 'application/json' }, url: `${process.env.NEXT_PUBLIC_TI_GET_CUSTOMERS}`,
    //     data : {  }
    // };
    // const requestTwo = await axios(config);

  return{
      props: { orderData: requestOne, clientData:requestTwo }
  }
}