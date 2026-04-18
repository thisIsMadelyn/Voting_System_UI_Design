import { useState } from 'react'

export function useDismissed() {
    const [dismissed, setDismissed] = useState([])
    const dismiss = (id) => setDismissed(d => [...d, id])
    const isVisible = (id) => !dismissed.includes(id)
    return { dismiss, isVisible }
}