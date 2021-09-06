import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Contacts, Item, Button } from "./ContactsList.styled";
import { IoPerson } from "react-icons/io5";
import { ImPhone } from "react-icons/im";
import { getFilterValue } from "redux/contacts/contacts-selectors";
import toast from "react-hot-toast";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from "services/contactAPI";

function ContactsList() {
  const filter = useSelector(getFilterValue);

  const filteredContacts = (filterValue, contacts) => {
    const normalizedFilter = filterValue.toLowerCase();
    return contacts
      ?.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(normalizedFilter) ||
          number.includes(normalizedFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const { contacts, isFetching } = useFetchContactsQuery(null, {
    refetchOnReconnect: true,
    selectFromResult: ({ data }) => ({
      contacts: filteredContacts(filter, data),
    }),
  });

  const [deleteContact] = useDeleteContactMutation();

  const handleDeleteContactOnClick = async (id, name) => {
    try {
      await deleteContact(id);
      toast.success(`Contact ${name} deleted`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Contacts>
      {isFetching && <div>Loading...</div>}
      {contacts &&
        contacts.map(({ id, name, number }) => {
          return (
            <Item key={id}>
              <div>
                <span>
                <IoPerson size={14} color="steelblue" />
                {name}:
              </span>

              <span>
                <ImPhone size={14} color="steelblue" />
                {number}
              </span>
              </div>
              <Button
                type="button"
                onClick={() => handleDeleteContactOnClick(id, name)}
              >
                Delete
              </Button>
            </Item>
          );
        })}
    </Contacts>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default ContactsList;