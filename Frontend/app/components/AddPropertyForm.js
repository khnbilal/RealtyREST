import { useState } from "react";

const AddPropertyForm = () => {
    const [propertyData, setPropertyData] = useState({
        address: "",
        listingDate: "",
        propertyType: "",
        bedrooms: 0,
        bathrooms: 0,
        homeSize: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data to Submit:", propertyData); // Log form data

        try {
            const response = await fetch("http://localhost:8080/api/Realty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(propertyData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Property added successfully:", result);
                alert("Property added successfully!");
            } else {
                console.error("Error adding property");
                alert("Failed to add property. Please try again.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Error adding property. Please try again.");
        }
    };

    return (
        <form className="add-property-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={propertyData.address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="listingDate"
                placeholder="Listing Date (DD-MM-YYYY)"
                value={propertyData.listingDate}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="propertyType"
                placeholder="Property Type"
                value={propertyData.propertyType}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="bedrooms"
                placeholder="Number of Bedrooms"
                value={propertyData.bedrooms}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="bathrooms"
                placeholder="Number of Bathrooms"
                value={propertyData.bathrooms}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="homeSize"
                placeholder="Home Size (sqft)"
                value={propertyData.homeSize}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Property</button>
        </form>
    );
};

export default AddPropertyForm;
