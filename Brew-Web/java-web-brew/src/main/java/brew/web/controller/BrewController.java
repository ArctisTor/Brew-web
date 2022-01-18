package brew.web.controller;

import brew.web.model.Brewery;
import brew.web.service.BrewService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@AllArgsConstructor
@RestController
public class BrewController {

  private final BrewService brewService;

  @GetMapping("brew/brew/query")
  public ResponseEntity<?> query(String query) {
    try {
      HashMap<String, Brewery[]> responseBody = brewService.queryBreweryDB(query);
      return ResponseEntity.ok(responseBody);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to query for Breweries");
    }
  }

}
