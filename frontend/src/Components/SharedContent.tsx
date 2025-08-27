import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SharedContent() {
    const {sharedContent} = useParams()

    const fetchContent = async ()=>{
      try{
        const token = await localStorage.getItem('token')
        const response = await axios.get(`http://localhost:3000/api/v1/share/${sharedContent}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data;
        console.log(data)
      }catch(e){
        if(e instanceof Error){
          console.log(e.message)
        }
      }
    }

    useEffect(()=>{
      fetchContent()
    })
  return (
    <div>{sharedContent}</div>
  )
}
