package pl.mkowsky.security.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.inject.Singleton;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Singleton
@RegisterRestClient
public interface FlaskBinary {

    @POST
    @Path("/getReviewsAndKeywords")
    @Produces({MediaType.APPLICATION_JSON})
    JsonArray rateSignleReview(JsonObject review);
}
