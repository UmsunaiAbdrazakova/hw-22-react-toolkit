import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  addTask,
  deleteTask,
  toggleTaskCompletionAction,
} from "../redux/slices/taskSlice";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Todos = () => {
  const [newTask, setNewTask] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const tasks = useSelector((state) => state.tasks);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const addNewTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    dispatch(toggleTaskCompletionAction(index));
  };

  const handleDeleteClick = (index) => {
    setSelectedTaskIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTask(selectedTaskIndex));
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setSelectedTaskIndex(null);
    setOpenDeleteDialog(false);
  };

  if (!isAuthenticated) {
    return <div>Вы не вошли в систему.</div>;
  }
  console.log(toggleTaskCompletion);
  
  return (
    <div>
      <h1>Список задач</h1>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={task.title}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
            <Button onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? "Отменить" : "Завершить"}
            </Button>
            <Button onClick={() => handleDeleteClick(index)}>Удалить</Button>
          </ListItem>
        ))}
      </List>

      <TextField
        label="Новая задача"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button onClick={addNewTask}>Добавить</Button>
      <Button onClick={handleLogout}>Выйти</Button>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить эту задачу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Todos;
