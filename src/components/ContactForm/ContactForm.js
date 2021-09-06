import { nanoid } from "nanoid";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";
import {
  FormWrapper,
  Label,
  Button,
  ValidationMessage,
} from "./ContactsForm.styled.js";
import { useAddContactMutation, contactAPI } from "services/contactAPI";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string().phone("+38", true, "Valid number type +380XXXXXXXXX"),
});

function ContactsForm() {
  const { data } = contactAPI.endpoints.fetchContacts.useQueryState(null, {});
  const [addContact] = useAddContactMutation();

  const handleAddContactOnSubmit = async (newContact) => {
    if (data?.some(({ name }) => name === newContact.name)) {
      toast.error(`Contact ${newContact.name} already exists`);
      return;
    }

    try {
      await addContact(newContact);
      toast.success(`Contact ${newContact.name} created`);
    } catch (error) {
      toast.error(error);
    }
  };

  let nameInputId = nanoid(3);
  let phoneInputId = nanoid(3);

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const { name, number } = values;
        handleAddContactOnSubmit({ name, number });
        resetForm();
      }}
    >
      <FormWrapper>
        <Label htmlFor={`id-${nameInputId}`}>Name</Label>
        <Field
          id={`id-${nameInputId}`}
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        />
        <ErrorMessage name="name" component={ValidationMessage} />

        <Label htmlFor={`id-${phoneInputId}`}>Number</Label>
        <Field
          id={`id-${phoneInputId}`}
          type="tel"
          name="number"
          placeholder="+38 XXX XXX XX XX"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        />
        <ErrorMessage name="number" component={ValidationMessage} />

        <Button type="submit">Add contact</Button>
      </FormWrapper>
    </Formik>
  );
}

export default ContactsForm;