import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";

export function TodoContent(props) {
  const todoList = props.todoList;
  if (todoList.length === 0) {
    return <p className="message">You have no todo items here.</p>;
  }
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {todoList.map((value) => {
        const labelId = value.id;
        return (
          <ListItem
            key={labelId}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={(event) => props.handleToggle(value)}
                checked={value.state==="done"}
              />
            }
            disablePadding
          >
            <InputItem
              id={value.id}
              primary={value.content}
              onChange={(event) => props.handleInputChange(event, value)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

function InputItem(props) {
  return (
    <input
      className="input_item"
      value={props.primary}
      onChange={props.onChange}
    />
  );
}
