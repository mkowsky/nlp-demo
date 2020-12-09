package pl.mkowsky.security.resources;

import com.google.gson.Gson;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.json.JSONException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import pl.mkowsky.security.client.FlaskService;
import pl.mkowsky.security.model.User;
import pl.mkowsky.security.payload.ReviewRequest;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.json.JsonString;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/flask")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FlaskResource {

    @Inject
    @RestClient
    FlaskService flaskService;

    @POST
    @Path("single-review")
    public Response singleReview(ReviewRequest reviewRequest) throws ParseException {
        System.out.println(reviewRequest.getReview());
        System.out.println(reviewRequest.getJwt());
        String review = reviewRequest.getReview();
        String jwt = reviewRequest.getJwt();

        JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                .setSkipAllValidators()
                .setDisableRequireSignature()
                .setSkipSignatureVerification()
                .build();
        try {
            JwtClaims jwtClaims = jwtConsumer.processToClaims(jwt);
            //User existingUser = User.find("email", jwtClaims.getClaimsMap().get("sub")).firstResult();
            User existingUser = User.find("email", "test").firstResult();
            if (existingUser != null) {
                Gson g = new Gson();
                String output = flaskService.getReview(g.toJson(review));
                return Response.ok().entity(output).build();
            } else {
                return Response.ok().entity("Not authenticated").build();

            }
        } catch (InvalidJwtException e) {
            e.printStackTrace();
        }
        return  Response.ok().entity("OK").build();
    }

    @POST
    @Path("multiple-reviews")
    public Response multipleReviews(String reviews) {
        String stringWithReviews = flaskService.getMultipleReviews(reviews);
        return Response.ok().entity(stringWithReviews).build();
    }


}
