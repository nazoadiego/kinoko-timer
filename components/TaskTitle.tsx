import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiEdit } from "react-icons/fi";

interface TaskTitleProps {}

const TaskTitle: FC<TaskTitleProps> = () => {
	const [editTaskTitle, setEditTaskTitle] = useState(false);
	const [taskTitle, setTaskTitle] = useState("Reading Japanese");

	// Handle Save Changes

	// On Enter save and hide the form
	const handleSaveChanges = (
		e: KeyboardEvent,
		displayEdit: Dispatch<SetStateAction<boolean>>
	) => {
		if (e.key === "Enter") {
			displayEdit(false);
		}
	};

	if (editTaskTitle) {
		return (
			<input
				type="text"
				autoFocus
				placeholder="Task Title"
				value={taskTitle}
				// We are triggering twice here? change and keypress
				onChange={(e) => setTaskTitle(e.target.value)}
				onKeyPress={(e) => handleSaveChanges(e, setEditTaskTitle)}
			/>
		);
	} else {
		return (
			<>
				<h2>Task</h2>
				<div className="flex items-center gap-2">
					<h3 className="text-kinoko-purple">{taskTitle}</h3>
					<FiEdit
						className="cursor-pointer"
						onClick={() => setEditTaskTitle(true)}
					/>
				</div>
			</>
		);
	}
};

export default TaskTitle;
