import axios from 'axios';

export  async function createUser (userData) {

    try {
        const response =   await axios.post('https://reqres.in/api/users',userData)
        return({result: response.data,
                    status:"1"})     
     } catch (error) {
         
         console.log(error.response)
     }
 }

 export  async function getOneUser (userID) {

  try {
      const response =   await axios.get(`https://reqres.in/api/users/${userID}`)
        return response?.data.data
   } catch (error) {
       
       console.log(error.response)
   }
}
export  async function modifyUser (formData) {


          try {
           
               const response =  await axios.patch(`https://reqres.in/api/users/${formData.id}`,{
                 name:formData.name,
                 job:formData.job
               })

               return response.data
           } catch (error) {
               
               console.log(error.response)
           }
               
                    
                  
              
              }

              export  async function deleteUser (userID) {                
                    
                try {
                  await axios.delete(`https://reqres.in/api/users/${userID}`)
                    return {
                      result:"user Deleted Correctly",
                      status:"1"  
                    }
               } catch (error) {
                   
                   console.log(error.response)
               }
              
              }

