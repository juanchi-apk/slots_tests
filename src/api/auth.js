import axios from 'axios';



export async function userLogin (formData) {

    try {
       const response = await axios.post(`https://reqres.in/api/login` , formData)
        return response.data
            
      
    
    } catch (error) {
        return (error.response.data)
    }

}

