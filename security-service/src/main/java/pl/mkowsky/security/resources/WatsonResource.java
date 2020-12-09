package pl.mkowsky.security.resources;


import org.eclipse.microprofile.rest.client.inject.RestClient;
import pl.mkowsky.security.client.WatsonClient;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/watson")
@Produces(MediaType.APPLICATION_JSON)
public class WatsonResource {

    @Inject
    @RestClient
    WatsonClient watsonClient;

    @POST
    @Path("hello")
    public Response multipleReviews() {
        System.out.println(watsonClient.hello());
        return Response.ok().entity(watsonClient.hello()).build();
    }
}
