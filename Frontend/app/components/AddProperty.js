import AddPropertyForm from '../components/AddPropertyForm';
import { addProperty } from '../components/apiService.js'; 
import '../../styles/globals.css';

const AddProperty = () => {
  return (
    <div>
      <h1>Add New Property</h1>
      <AddPropertyForm addProperty={addProperty} /> {/* Pass it as a prop */}
    </div>
  );
};

export default AddProperty;
