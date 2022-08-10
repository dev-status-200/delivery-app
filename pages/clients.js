import React from 'react'
import Clients from '/components/Layouts/Clients/'
import axios from 'axios'

const clients = ({clientData}) => {
  return (
    <div className="order-styles">
        <Clients clientData={clientData} />
    </div>
  )
}

export default clients

export async function getServerSideProps({req,res}) {

  //const cookies = new Cookies(req, res);
  const requestOne = await axios.get(process.env.NEXT_PUBLIC_DELIVERY_APP_SHOW_CLIENTS_GET,{
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
      props: { clientData: requestOne }
  }
}