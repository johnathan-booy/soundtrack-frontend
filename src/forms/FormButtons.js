import {
	faCheck,
	faTrash,
	faPencil,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./FormButtons.scss";

function FormButtons({ editMode, toggleEditMode, onDeleteClick }) {
	return (
		<div className="form-buttons">
			{editMode ? (
				<>
					<button type="submit" className="save">
						<FontAwesomeIcon icon={faCheck} />
					</button>
					<button className="cancel" onClick={toggleEditMode}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
					{onDeleteClick && (
						<button className="delete" onClick={onDeleteClick}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					)}{" "}
				</>
			) : (
				<button className="edit" onClick={toggleEditMode}>
					<FontAwesomeIcon icon={faPencil} />
				</button>
			)}
		</div>
	);
}

export default FormButtons;
