import { useState } from 'react'

/**
 * Tracks dismissed poll IDs for the current session only.
 * State is lost on page refresh — dismissed polls reappear.
 */
export function useDismissed() {
    const [dismissed, setDismissed] = useState(new Set())

    const dismiss = (id) => {
        setDismissed(prev => new Set([...prev, id]))
    }

    const isVisible = (id) => !dismissed.has(id)

    return { dismiss, isVisible }
}