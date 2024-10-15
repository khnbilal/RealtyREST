import { addProperty } from './apiService'; // Ensure correct import path

const handleSubmit = async (event, property) => {
    event.preventDefault(); // Prevent the default form submission

    // Function to convert DD-MM-YYYY to YYYY-MM-DD
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
    };

    // Validate property data
    if (
        !property.location ||
        !property.building ||
        !property.locality ||
        !property.listingDate ||
        !property.propertyType ||
        property.numberOfBedrooms === undefined ||
        property.numberOfBathrooms === undefined ||
        property.homeSize === undefined ||
        property.price === undefined ||
        !property.images || property.images.length === 0
    ) {
        alert('Please fill all fields correctly.');
        return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('location', property.location);
    formData.append('building', property.building);
    formData.append('locality', property.locality);
    formData.append('listingDate', formatDate(property.listingDate));
    formData.append('propertyType', property.propertyType);
    formData.append('numberOfBedrooms', parseInt(property.numberOfBedrooms));
    formData.append('numberOfBathrooms', parseInt(property.numberOfBathrooms));
    formData.append('homeSize', parseFloat(property.homeSize));
    formData.append('price', parseFloat(property.price));

    // Append images to FormData
    for (let i = 0; i < property.images.length; i++) {
        formData.append('images', property.images[i]);
    }

    try {
        const newProperty = await addProperty(formData); // Use the addProperty method with FormData
        console.log('Property added:', newProperty);
        // Optionally, reset form fields or update UI here
    } catch (error) {
        console.error('Error adding property:', error);
        alert('Failed to add property: ' + error.message);
    }
};

export default handleSubmit;
