import { useId } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../features/customerSlice";
import { removeReservation } from "../features/reservationSlice";

interface ReservationCardTypes {
  name: string;
  index: number;
}

const ReservationCard = ({ name, index }: ReservationCardTypes) => {
  const dispatch = useDispatch();
  const id = useId();
  return (
    <div
      onClick={() => (
        dispatch(addCustomer({ id, name, food: [] })),
        dispatch(removeReservation(index))
      )}
      className="reservation-card-container"
    >
      {name}
    </div>
  );
};

export default ReservationCard;
