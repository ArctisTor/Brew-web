package brew.web.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

  public JsonArray queryBreweryDB(String query) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity httpEntity = new HttpEntity(headers);
    try {
//       return gson.fromJson(
//         restTemplate.getForObject(
//           (breweryURL +"search?query="+query),  String.class
//         ),
//         (Type) String.class
//       );
//      return restTemplate.getForObject( (breweryURL +"/search?query="+query), JsonArray.class);
      let url = (breweryURL +"/search?query="+query);
      restTemplate.getForObject()
    } catch (Exception e) {
      return null;
    }
  }

}
