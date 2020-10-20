package pl.mkowsky.npl_demo;

import pl.mkowsky.npl_demo.model.User;
import pl.mkowsky.npl_demo.repository.UserRepository;

import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/test")
public class ExamplePath {

    private UserRepository userRepository;

    public ExamplePath(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String examplePath() {
        return "Hello from the other side";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User findAll() {
        System.out.println("inside find all");
        return userRepository.findUserByUsername("user03");
    }
}
