import { useEffect, useState } from "react"

const getItems = async () => {
  const response = await fetch('/api/items')
  return response.json()
}

export const useItems = () => {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('IDLE')
  useEffect(() => {
    setStatus('LOADING')
    const fetchItems = async () => {
      try {
        const itemResponse = await getItems()
        setItems(itemResponse)
        setStatus('SUCCESS')
      } catch (e) {
        setStatus('ERROR')
      }
    }
    fetchItems()
  }, [])

  return {
    error: status === 'ERROR',
    loading: status === 'LOADING',
    items: items
  }
}

export default getItems