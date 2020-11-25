package pl.mkowsky.security.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;


import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Singleton
@RegisterRestClient
public interface FlaskService {


    @GET
    @Path("/hello")
    String helloWorld();

    @POST
    @Path("/getReview")
    @Produces({MediaType.APPLICATION_JSON})
    String getReview(String review);

    @POST
    @Path("/getReviews")
    @Produces({MediaType.APPLICATION_JSON})
    String getMultipleReviews(String reviews);

}
