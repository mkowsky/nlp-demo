package pl.mkowsky.security.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.awt.*;
import javax.ws.rs.core.MediaType;

@Singleton
@RegisterRestClient
@Path("/watson-service")
public interface WatsonClient {

    @GET
    @Path("/hello")
    @Produces(MediaType.TEXT_PLAIN)
    String hello();
}
