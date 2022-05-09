import axios from 'axios';


const api = axios.create( {baseURL: 'http://reqres.in'})

export async function userLogin (formData) {

    try {
       const response = await axios.post(`https://reqres.in/api/login` , formData)
        return response.data
            
      
    
    } catch (error) {
        return (error.response.data)
    }

}

