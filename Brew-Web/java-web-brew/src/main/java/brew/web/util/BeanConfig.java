package brew.web.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@ComponentScan("brew.web")
public class BeanConfig {

  @Bean
  public Gson getGson(){
    GsonBuilder builder = new GsonBuilder();
    builder.setPrettyPrinting();
    return builder.create();
  }

  @Bean
  public RestTemplate getRestTemplate() {return new RestTemplate();}
}
