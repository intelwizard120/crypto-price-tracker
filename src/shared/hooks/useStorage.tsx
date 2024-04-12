import { useState, useEffect } from 'react';

export function useStorage(key, initialValue) {
  // Retrieve the stored value from local storage or use the initial value
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  // Create state to hold the value
  const [value, setValue] = useState(storedValue);

  // Update local storage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

    if (key == 'theme') {
      document.documentElement.setAttribute('data-theme', value == 'dark' ? 'dark' : 'light');
    }
  }, [key, value]);

  return [value, setValue];
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
