import { useState, useEffect } from "react";

/**
 * useLocalStorage is a custom hook that allows you to store and retrieve values from local storage in a React component.
 *
 * @param {string} key - The key used to store and retrieve the value in local storage.
 * @param {any} initialValue - The initial value to be used if no value is found in local storage for the given key.
 *
 * @returns {Array} An array containing the current value and a setter function to update it.
 *
 * @example
 * const [token, setToken] = useLocalStorage('authToken', '');
 */

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item !== null ? JSON.parse(item) : initialValue;
		} catch (e) {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
