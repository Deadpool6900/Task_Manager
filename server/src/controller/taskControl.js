import AsyncHandler from "express-async-handler";
import Task from "../model/taskModel.js";
import { validationResult } from "express-validator";

export const get_allTasks = AsyncHandler(async (req, res) => {
	const id = req.user._id;
	if (!id) {
		return res.status(404).send("user not found !");
	}
	// console.log(id);
	const allTasks = await Task.find({ user: id });
	if (!allTasks) {
		return res.status(200).send("no tasks found ");
	}
	res.status(200).send(allTasks);
});

export const get_task = AsyncHandler(async (req, res) => {
	const userId = req.user._id;
	const taskId = req.params.id;
	try {
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).send("task not found !");
		}
		if (!task.user.equals(userId)) {
			return res.status(401).send("not authorized !");
		}
		res.status(200).send(task);
	} catch (err) {
		const { name, message } = err;
		res.status(500).json({
			name: name,
			message: message,
		});
	}
});

export const addtask = AsyncHandler(async (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).send(result.array());
	}
	const { title, description, dueDate, status, priority } = req.body;

	// console.log(req.body);
	const newTask = new Task({
		title: title,
		description: description,
		dueDate: dueDate,
		status: status,
		priority: priority,
		user: req.user._id,
	});
	await newTask.save();
	res.status(200).send("task added successfully !");
});

export const remove = AsyncHandler(async (req, res) => {
	const taskId = req.params.id;
	const userId = req.user._id;

	try {
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).send("task not found");
		}
		if (!task.user.equals(userId)) {
			return res.status(401).send("not authorized");
		}
		await Task.findByIdAndDelete(taskId);
		res.status(200).send("task deleted successfully !");
	} catch (err) {
		const { name, message } = err;
		res.status(500).json({
			name: name,
			message: message,
		});
	}
});

export const update = AsyncHandler(async (req, res) => {
	const { title, description, dueDate, status, priority } = req.body;
	const userId = req.user._id;
	const taskId = req.params.id;

	try {
		const task = await Task.findById(taskId);
		if(!task){
			return res.status(404).send("task not found !");
		};

		if(!task.user.equals(userId)){
			return res.status(401).send("not authorized");
		};
		// update the task with new data otherwise if not provided keep tthe og data as it is:

		task.title = title || task.title;
		task.description = description || task.description;
		task.dueDate = dueDate || task.dueDate;
		task.status = status || task.status;
		task.priority = priority || task.priority;

		await task.save();
		res.status(200).send("task updated !")
	} catch (err) {
		const { name, message } = err;
		res.status(500).json({
			name: name,
			message: message,
		});
	}
});
