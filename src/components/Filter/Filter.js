import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Label, Input } from "./Filter.styled";
import * as actions from "../../redux/contacts/contacts-actions";
import { getFilterValue } from "../../redux/contacts/contacts-selectors";

const Filter = () => {
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  return (
    <>
      <Label htmlFor={`id-${nanoid(3)}`}>Find contacts by name</Label>
      <Input
        id={`id-${nanoid(3)}`}
        type="text"
        name="name"
        value={filter}
        onChange={(event) =>
          dispatch(actions.getFilterValue(event.target.value))
        }
        placeholder="Search"
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
};

export default Filter;