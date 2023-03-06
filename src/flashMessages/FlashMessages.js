import React from "react";
import { v4 as uuid } from "uuid";
import "./FlashMessages.scss";

function FlashMessages({ flashMessages }) {
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
