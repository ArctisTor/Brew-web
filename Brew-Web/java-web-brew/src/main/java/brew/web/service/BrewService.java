package brew.web.service;

import brew.web.model.Brewery;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@Service
public class BrewService {

  private String breweryURL;
  private RestTemplate restTemplate;
  private Gson gson;

  public BrewService(@Value("${brewery.path}") String breweryURL, RestTemplate restTemplate, Gson g){
    this.breweryURL = breweryURL;
    this.restTemplate = restTemplate;
    this.gson = g;
  }

  public HashMap queryBreweryDB(String query) {
    HttpHeaders headers = new HttpHeaders();
    HttpEntity httpEntity = new HttpEntity(headers);
    try {
      String url = (breweryURL +"/search?query="+query);
      String responseBody =
        restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class).getBody();
      Brewery response[] = gson.fromJson(responseBody, Brewery[].class);
      HashMap<String, Brewery[]> breweries = new HashMap<>();
      breweries.put("breweryList", response);
      return breweries;
    } catch (Exception e) {
      return null;
    }
  }

}
