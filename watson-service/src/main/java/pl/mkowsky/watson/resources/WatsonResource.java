package pl.mkowsky.watson.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/watson-service")
public class WatsonResource {

    @Path("hello")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        System.out.println("Inside hello()");
        return "Hello from WatsonResource";
    }
}
