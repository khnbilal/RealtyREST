package com.realestate.realtyrest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Realty")
public class RealtyController {

    @Autowired
    private RealtyRepository realtyRepository;

    // POST method to add property
    @PostMapping
    public ResponseEntity<Realty> addProperty(@RequestBody Realty realty) {
        Realty savedRealty = realtyRepository.save(realty);
        return new ResponseEntity<>(savedRealty, HttpStatus.CREATED);
    }

    // GET method to retrieve all properties
    @GetMapping
    public ResponseEntity<List<Realty>> getAllProperties() {
        List<Realty> properties = realtyRepository.findAll();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }
}
