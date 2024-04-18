import { ChangeEvent, FC, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addTodo } from "../../redux/ui/todo/todoSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Title } from "../Title/Title";
import { Input } from "../Input/Input";
import { AddButton } from "../Buttons/AddButton";
import { TabsComponent } from "../Tabs/Tabs";
import { StatusBar } from "../StatusBar/StatusBar";

export const MainPage: FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}>
      <Grid item xs={4}>
        <Title />
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" gap={2}>
          <Input value={newTodo} onChange={handleInputChange} />
          <AddButton onClick={handleAddTodo} />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <TabsComponent />
      </Grid>
      <Grid item xs={4}>
        <StatusBar />
      </Grid>
    </Grid>
  );
};
