import ListGroup from "./components/ListGroup/ListGroup";

function App() {
  const items = ["New Work", "Mexico", "Delhi", "Patna", "Mumbai"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

export default App;
