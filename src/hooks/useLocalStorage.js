import { useState } from 'react';

export default function useLocalStorage(initialState) {
    const [state, setState] = useState(initialState)

    return [state, setState];
}


