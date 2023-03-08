import { useState } from "react";

/**
 * useFlashMessages is a custom hook that returns the current flash messages and a function to add new flash messages
 * @param {number} [timeout=3000] - The time in milliseconds after which the flash message should be removed
 * @returns {Array} An array containing the current flash messages and a function to add new flash messages
 * @example
 * const [flashMessages, addFlashMessage] = useFlashMessages(3000)
 */
function useFlashMessages(timeout = 3000) {
	const [flashMessages, setFlashMessages] = useState([]);

	/**
	 * addFlashMessage inserts a new flash message into the flashMessage state and removes it after a specified timeout
	 *
	 * @param {string} type - The type of message to flash: 'danger' or 'success'. This relates to the styling of the flash message
	 * @param {string} message - The message that should be displayed
	 *
	 * @example
	 * addFlashMessage("success", "Welcome back testuser!")
	 */
	const addFlashMessage = (type, message) => {
		setFlashMessages((prevFlashMessages) => [
			...prevFlashMessages,
			{ type, message },
		]);

		setTimeout(() => {
			setFlashMessages((prevFlashMessages) =>
				prevFlashMessages.filter(
					(flashMessage) => flashMessage.message !== message
				)
			);
		}, timeout);
	};

	return [flashMessages, addFlashMessage];
}

export default useFlashMessages;
