package com.realestate.realtyrest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import com.realestate.realtyrest.dto.GeocodingResponse;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/Realty")
public class RealtyController {

    @Autowired
    private RealtyRepository realtyRepository;

    private static final String GOOGLE_GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    private static final String GOOGLE_API_KEY = "YOUR_API_KEY"; // Replace with your API key
    private static final Logger LOGGER = Logger.getLogger(RealtyController.class.getName());

    // POST method to add a property
    @PostMapping("/add")
    public ResponseEntity<Realty> addProperty(
            @RequestParam("location") String location,
            @RequestParam("houseFlatNo") String houseFlatNo,
            @RequestParam("building") String building,
            @RequestParam("locality") String locality,
            @RequestParam("listingDate") String listingDateStr,
            @RequestParam("propertyType") String propertyType,
            @RequestParam("numberOfBedrooms") int numberOfBedrooms,
            @RequestParam("numberOfBathrooms") int numberOfBathrooms,
            @RequestParam("homeSize") float homeSize,
            @RequestParam("price") Double price,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {

        if (numberOfBedrooms < 0 || numberOfBathrooms < 0 || price < 0) {
            LOGGER.warning("Invalid input: Negative values are not allowed.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 status code
        }

        // Parse the listing date
        LocalDate listingDate;
        try {
            listingDate = LocalDate.parse(listingDateStr);
        } catch (Exception e) {
            LOGGER.warning("Invalid date format: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 status code
        }

        Realty realty = new Realty();
        realty.setLocation(location);
        realty.setHouseFlatNo(houseFlatNo);
        realty.setBuilding(building);
        realty.setLocality(locality);
        realty.setListingDate(listingDate);
        realty.setPropertyType(propertyType);
        realty.setNumberOfBedrooms(numberOfBedrooms);
        realty.setNumberOfBathrooms(numberOfBathrooms);
        realty.setHomeSize(homeSize);
        realty.setPrice(price);

        // Handle image file processing
        if (images != null && images.length > 0) {
            MultipartFile firstImage = images[0];
            if (!isValidImage(firstImage)) {
                LOGGER.warning("Invalid image file format or size.");
                return ResponseEntity.badRequest().body(null);
            }
            try {
                byte[] imageData = firstImage.getBytes();
                realty.setPropertyImage(imageData);
            } catch (Exception e) {
                LOGGER.severe("Error processing image file: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        // Fetch and set latitude and longitude using the Google Geocoding API
        double[] coordinates = fetchCoordinatesFromAddress(location);
        if (coordinates != null) {
            realty.setLatitude(coordinates[0]);
            realty.setLongitude(coordinates[1]);
        }

        Realty savedRealty = realtyRepository.save(realty);
        return new ResponseEntity<>(savedRealty, HttpStatus.CREATED);
    }

    // Method to fetch latitude and longitude using Google Geocoding API
    private double[] fetchCoordinatesFromAddress(String address) {
        String url = GOOGLE_GEOCODING_API_URL + "?address=" + address + "&key=" + GOOGLE_API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        try {
            GeocodingResponse response = restTemplate.getForObject(url, GeocodingResponse.class);
            if (response != null && response.getStatus().equals("OK") && !response.getResults().isEmpty()) {
                double lat = response.getResults().get(0).getGeometry().getLocation().getLat();
                double lng = response.getResults().get(0).getGeometry().getLocation().getLng();
                return new double[]{lat, lng};
            }
        } catch (Exception e) {
            LOGGER.severe("Error fetching coordinates: " + e.getMessage());
        }
        return null;
    }

    // Validate image file format and size
    private boolean isValidImage(MultipartFile image) {
        String contentType = image.getContentType();
        long maxFileSize = 5 * 1024 * 1024; // 5 MB size limit

        return contentType != null && contentType.startsWith("image/") && image.getSize() <= maxFileSize;
    }

    // GET method to retrieve all properties
    @GetMapping
    public ResponseEntity<List<Realty>> getAllProperties() {
        List<Realty> properties = realtyRepository.findAll();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    // DELETE method to delete a property by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable("id") long id) {
        Optional<Realty> property = realtyRepository.findById(id);
        if (property.isPresent()) {
            realtyRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // GET method to filter properties by number of bedrooms
    @GetMapping("/FilterProperties")
    public ResponseEntity<List<Realty>> getPropertyByNumBedrooms(@RequestParam("numberOfBedrooms") Long numberOfBedrooms) {
        List<Realty> properties = realtyRepository.findByNumberOfBedrooms(numberOfBedrooms);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    // GET method to search properties based on location and radius
    @GetMapping("/SearchByLocation")
    public ResponseEntity<List<Realty>> searchPropertiesByLocation(
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam("radius") double radius) {

        List<Realty> nearbyProperties = new ArrayList<>();
        List<Realty> allProperties = realtyRepository.findAll();

        for (Realty property : allProperties) {
            double distance = calculateDistance(latitude, longitude, property.getLatitude(), property.getLongitude());
            if (distance <= radius) {
                nearbyProperties.add(property);
            }
        }
        return new ResponseEntity<>(nearbyProperties, HttpStatus.OK);
    }

    // Utility method to calculate distance between two coordinates (Haversine formula)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS = 6371; // Radius of the Earth in kilometers
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
