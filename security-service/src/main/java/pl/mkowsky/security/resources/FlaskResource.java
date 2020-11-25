package pl.mkowsky.security.resources;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.json.JSONException;
import pl.mkowsky.security.client.FlaskService;

import javax.inject.Inject;
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
    public Response singleReview(String review) {
        String output = flaskService.getReview(review);
        return Response.ok().entity(output).build();
    }

    @POST
    @Path("multiple-reviews")
    public Response multipleReviews(String reviews) {
        String stringWithReviews = flaskService.getMultipleReviews(reviews);
        return Response.ok().entity(stringWithReviews).build();
    }




}
