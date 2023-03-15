import React from "react";
import "./DeleteDialog.scss";

function DeleteDialog({ onConfirm, onCancel }) {
	return (
		<div className="delete-dialog">
			<p>Are you sure you want to delete this?</p>
			<div className="buttons">
				<button onClick={onConfirm} className="yes">
					Yes
				</button>
				<button onClick={onCancel} className="no">
					No
				</button>
			</div>
		</div>
	);
}

export default DeleteDialog;
