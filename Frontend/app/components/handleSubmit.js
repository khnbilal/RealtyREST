const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Function to convert DD-MM-YYYY to YYYY-MM-DD
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
    };

    const formData = {
        address: addressInput.value,
        listingDate: formatDate(listingDateInput.value), // Convert date format
        propertyType: propertyTypeInput.value,
        numberOfBedrooms: parseInt(bedroomsInput.value),
        numberOfBathrooms: parseInt(bathroomsInput.value),
        homeSize: parseFloat(homeSizeInput.value)
    };

    try {
        const response = await fetch('http://localhost:8080/api/Realty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const newProperty = await response.json();
            console.log('Property added:', newProperty);
            // Optionally, reset form fields or update UI
        } else {
            const errorResponse = await response.json();
            console.error('Error adding property:', errorResponse);
            alert('Failed to add property: ' + errorResponse.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};


