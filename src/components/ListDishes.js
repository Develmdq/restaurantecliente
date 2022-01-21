const ListDishes = ({ dishesDb }) => {
  console.log(dishesDb);
  return (
    <div>
      {dishesDb.map((dish) => 
        <p key={dish.id}>{dish.nameDish}</p>
      )}
      
    </div>
  );
};

export default ListDishes;
