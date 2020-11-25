package pl.mkowsky.security.resources;


import org.eclipse.microprofile.rest.client.inject.RestClient;

import org.jboss.resteasy.annotations.jaxrs.PathParam;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import pl.mkowsky.security.client.FlaskService;

import pl.mkowsky.security.model.Role;
import pl.mkowsky.security.payload.RegisterRequest;

import pl.mkowsky.security.services.TokenService;
import pl.mkowsky.security.model.User;
import pl.mkowsky.security.payload.LoginRequest;
import pl.mkowsky.security.payload.LoginResponse;


import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.HashSet;

import java.util.Set;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    TokenService service;



    @POST
    @Path("/register")
    @Transactional
    public Response register(RegisterRequest registerRequest) {
        User existingUser = User.find("email", registerRequest.getEmail()).firstResult();

        if (existingUser != null) {
            throw new WebApplicationException(Response.status(404).entity("Email is already taken").build());
        } else {
            User newUser = new User(registerRequest.getEmail(),
                    registerRequest.getPassword());

            Set<Role> roles = new HashSet<>();
            Role role = Role.find("id", Long.valueOf("1")).firstResult();
            roles.add(role);
            newUser.setRoles(roles);
            newUser.persist();
            return Response.ok().entity("User register successful").build();

        }


    }



//    @GET
//    @Path("/login")
//    public String login(@QueryParam("login") String login, @QueryParam("password") String password) {
//        User existingUser = User.find("login", login).firstResult();
//        if (existingUser == null || !existingUser.password.equals(password)) {
//            throw new WebApplicationException(Response.status(404).entity("No user found or password is incorrect").build());
//        }
//        return service.generateUserToken(existingUser.email, password);
//    }


    @POST
    @Path("/login-test")
    public Response login(LoginRequest loginRequest) {
        User existingUser = User.find("email", loginRequest.getLogin()).firstResult();
        if (existingUser == null) {
            throw new WebApplicationException(Response.status(404).entity("Bad username").build());
        } else {
            if (existingUser.getPassword().equals(loginRequest.getPassword())) {
                return Response.ok(new LoginResponse(service.generateUserToken(existingUser.email, existingUser.password),
                        existingUser.email)).build();
            } else {
                throw new WebApplicationException(Response.status(404).entity("Bad password").build());
            }
        }

    }

    @GET
    @Path("/test-response/{loginRequest}")
    public Response testResponse(@PathParam("loginRequest") String login) {
        User existingUser = User.find("login", login).firstResult();
        return Response.ok(new LoginResponse(service.generateUserToken(existingUser.email, existingUser.password),
                existingUser.email)).build();
    }
}
