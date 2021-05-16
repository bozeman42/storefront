import { useEffect, useState } from "react"

const getCategories = async () => {
  const response = await fetch('/api/categories')
  return response.json()
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('all')
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await getCategories()
      setCategories(categoryResponse)
    }
    fetchCategories()
  }, [])

  return {
    category,
    categories,
    setCategory
  }
}

export default getCategories
