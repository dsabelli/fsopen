import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood, Customer } from "../features/customerSlice";

const CustomerCard = ({ id, name, food }: Customer) => {
  const dispatch = useDispatch();
  const [customerFood, setCustomerFood] = useState("");
  return (
    <div key={id} className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((food) => (
            <p>{food}</p>
          ))}
        </div>
        <div className="customer-food-input-container">
          <input
            value={customerFood}
            onChange={(e) => setCustomerFood(e.target.value)}
          />
          <button
            onClick={() => {
              if (!customerFood) return;
              dispatch(addFood({ id, food: customerFood })),
                setCustomerFood("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
