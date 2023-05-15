import "../scss/task-display.css";

export const TaskDisplay = (props) => {
	
	return (
		<div className="tasks-section">
			{props.data?.map(obj => <TrelloList key={obj.id} name={obj.name} tasks={obj.content}></TrelloList>)}
		</div>
	);
};

export const TrelloList = (props) => {
	return (
		<div className="trello-list">
			<h3>{props.name}</h3>
			{props.tasks?.map(content => <p>{content}</p>)}
		</div>
	);
};
