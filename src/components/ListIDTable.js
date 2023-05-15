import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../scss/settings.css";

// settings component for adding list IDs to watch

export const ListIDTable = (props) => {
	const [tableData, setTableData] = useOutletContext();
	const [listIDFormData, setListIDFormData] = useState("");
	const [nameFormData, setNameFormData] = useState("");

	const handle_submit = e => {
		e.preventDefault();

		if (listIDFormData === "" || nameFormData === "") {
			return;
		}
		
		addIDNamePair(nameFormData, listIDFormData);
		setListIDFormData("");
		setNameFormData("");
	}

	const addIDNamePair = (name, listID) => {
		let IDNamePair = {id: listID, name: name};
		setTableData([...tableData, IDNamePair]);
	}

	const delete_pair = listID => {
		let remaining = tableData.filter(pair => pair.id !== listID);
		setTableData(remaining);
	}

	const edit_pair_name = (name, listID) => {
		const edited = tableData.map((pair) => {
			if (pair.id === listID) {
				pair.name = name;
			}
			return pair;
		});
		setTableData(edited);
	}

	let listIDCards = tableData.map(pair => <IDNamePair deletePair={delete_pair} editPair={edit_pair_name} name={pair.name} key={pair.id} id={pair.id}/>)

	return (
		<>
			<div className="list-id-table">
				<form onSubmit={handle_submit} className="submission-form">
					<input 
						type="text" 
						value={listIDFormData} 
						onChange={e => setListIDFormData(e.target.value)}
						placeholder="List ID"
					/>
					<input 
						type="text"
						value={nameFormData}
						onChange={e => setNameFormData(e.target.value)}
						placeholder="Name"
					/>
					<input type="submit" value="Add"/>
				</form>
				<div className="list-id-display">
					{listIDCards}
				</div>
			</div>
		</>
	);
}

export const IDNamePair = (props) => {
	const [editMode, setEditMode] = useState(false);
	const handleEditClick = () => {
		setEditMode(!editMode);
	}

	const editPair = name => {
		props.editPair(name, props.id);
		setEditMode(false);
	}

	return (
		<>
			<div className="id-name-pair">
				{!editMode ? <p>{props.name}</p> : <EditBox editPair={editPair} id={props.id}/>}
				<div className="button-pair">
					<button onClick={handleEditClick} className="button edit-button">Edit</button>
					<button onClick={() => props.deletePair(props.id)} className="button delete-button">Delete</button>
				</div>
			</div>
		</>
	)
}

const EditBox = (props) => {
	const [formData, setFormData] = useState("");
	
	const handle_submit = e => {
		e.preventDefault();
		props.editPair(formData);
		setFormData("");
	}

	return (
		<>
			<form onSubmit={handle_submit} className="submission-form">
				<input 
					type="text"
					value={formData}
					placeholder="New Name"
					onChange={e => setFormData(e.target.value)}
				/>
				<input type="submit" value="Change"/>
			</form>
		</>
	);
}