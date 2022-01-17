package brew.web.controller;

import brew.web.service.BrewService;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@AllArgsConstructor
@RestController
public class BrewController {

  private final BrewService brewService;

  @GetMapping("brew/brew/query")
  public Gson query(String query) {
    try {
      JsonArray jsonObject = brewService.queryBreweryDB(query);
      return  null;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to query for Breweries");
    }
  }

}
