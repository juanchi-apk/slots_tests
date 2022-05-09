import axios from 'axios';



export  async function getUserList (page) {
let url = 'https://reqres.in/api/users'
  if( page>1 )
  {
    url = `${url}?page=${page}` 
  }
  try {
      const response =   await axios.get(url)
      return response.data

   } catch (error) {
       
       console.log(error.response)
   }

   
          }