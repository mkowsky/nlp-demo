package pl.mkowsky.security.client;

import com.google.gson.Gson;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;


import javax.inject.Singleton;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Singleton
@RegisterRestClient
public interface FlaskLinear {


    @GET
    @Path("/hello")
    String helloWorld();

    @POST
    @Path("/getReviewsAndKeywords")
    @Produces({MediaType.APPLICATION_JSON})
    JsonArray getReview(JsonObject review);

    @POST
    @Path("/getReviews")
    @Produces({MediaType.APPLICATION_JSON})
    JsonArray getMultipleReviews(JsonObject reviews);

    @POST
    @Path("/getReviewsAndAverage")
    @Produces({MediaType.APPLICATION_JSON})
    double getMovieRating(JsonObject reviews);

    @POST
    @Path("/getLinearClassification")
    @Produces({MediaType.APPLICATION_JSON})
    JsonArray multipleReviewsLinearRating(JsonObject multipleReviews);

}
