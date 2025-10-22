import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../config/api'

export default function SharedContent() {
    const {sharedContent} = useParams()

    const fetchContent = async ()=>{
      try{
        const token = await localStorage.getItem('token')
        const response = await api.get(`/api/v1/share/${sharedContent}`,{
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
