package pl.mkowsky.security.resources;


import pl.mkowsky.security.ResponseEntity;
import pl.mkowsky.security.model.Role;
import pl.mkowsky.security.model.VerificationToken;
import pl.mkowsky.security.payload.RegisterRequest;

import pl.mkowsky.security.services.ResponseEntityService;
import pl.mkowsky.security.services.TokenService;
import pl.mkowsky.security.model.User;
import pl.mkowsky.security.payload.LoginRequest;
import pl.mkowsky.security.payload.LoginResponse;
import pl.mkowsky.security.services.VerificationTokenService;

import javax.json.JsonObject;
import javax.inject.Inject;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.*;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    TokenService tokenService;

    @Inject
    VerificationTokenService verificationTokenService;

    @Inject
    ResponseEntityService responseEntityService;

    @POST
    @Path("register")
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
            verificationTokenService.generateConfirmationToken(newUser);
            return Response.ok().entity("User register successful").build();
        }
    }

    @POST
    @Path("confirm-registration")
    @Transactional
    public Response confirmRegistration(JsonObject token){
        String pin = token.getString("token");
        VerificationToken verificationToken = VerificationToken.find("token", pin).firstResult();
        ResponseEntity responseEntity = responseEntityService.checkForToken(pin);
        if(responseEntity.isValid()){
            User user = verificationToken.getUser();
            user.setActive(true);
            return Response.ok().entity(responseEntity.getMessage()).build();
        } else {
            throw new WebApplicationException(Response.status(404).entity(responseEntity.getMessage()).build());
        }
    }

    @POST
    @Path("login")
    public Response login(LoginRequest loginRequest) {
        ResponseEntity responseEntity = responseEntityService.checkForUser(loginRequest);
        if(responseEntity.isValid()){
            return Response.ok(new LoginResponse(tokenService.generateUserToken(loginRequest.getLogin(), loginRequest.getPassword()), loginRequest.getLogin())).build();
        } else {
            throw new WebApplicationException(Response.status(404).entity(responseEntity.getMessage()).build());
        }
    }
}
