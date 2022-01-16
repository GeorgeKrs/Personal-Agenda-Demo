//screens
import AddNewPatient from "./AddNewPatient";
import PatientInfo from "./PatientInfo";

interface Props {
  loggedInUser: string;
}

const PatientsScreen = (props: Props) => {
  return (
    <div className="py-3 mb-5">
      <AddNewPatient loggedInUser={props.loggedInUser} />
      <PatientInfo />
    </div>
  );
};

export default PatientsScreen;
