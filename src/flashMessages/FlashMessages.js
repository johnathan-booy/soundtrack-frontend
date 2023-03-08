import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import FlashContext from "../contexts/FlashContext";
import "./FlashMessages.scss";

function FlashMessages() {
	const { flashMessages } = useContext(FlashContext);
	return (
		<div className="flash-messages">
			{flashMessages.map((flash) => (
				<div className={`flash-message ${flash.type}`} key={uuid()}>
					{flash.message}
				</div>
			))}
		</div>
	);
}

export default FlashMessages;
