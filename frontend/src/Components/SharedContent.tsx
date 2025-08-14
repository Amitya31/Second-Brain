import { useParams } from 'react-router-dom'

export default function SharedContent() {
    const {sharedContent} = useParams()
  return (
    <div>{sharedContent}</div>
  )
}
