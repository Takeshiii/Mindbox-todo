import { FC, SyntheticEvent, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectTodoListCards } from "../../redux/ui/todo/setectors";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormGroup from "@mui/material/FormGroup";
import { TodoCard } from "../../types/types";
import { CardComponent } from "../Card/Card";

export const TabsComponent: FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const todos: TodoCard[] = useAppSelector(selectTodoListCards);

  const filteredTodos = todos.filter((todo) => {
    switch (selectedTab) {
      case "all":
        return true;
      case "active":
        return !todo.status;
      case "completed":
        return todo.status;
      default:
        return true;
    }
  });

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab value="all" label="All" />
        <Tab value="active" label="Active" />
        <Tab value="completed" label="Completed" />
      </Tabs>
      <FormGroup>
        {filteredTodos.map((card: TodoCard) => (
          <CardComponent key={card.id} {...card} />
        ))}
      </FormGroup>
    </Box>
  );
};
