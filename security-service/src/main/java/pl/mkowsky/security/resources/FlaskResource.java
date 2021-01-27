package pl.mkowsky.security.resources;


import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jose4j.jwt.JwtClaims;

import pl.mkowsky.security.ResponseEntity;
import pl.mkowsky.security.client.FlaskBinary;
import pl.mkowsky.security.client.FlaskLinear;

import pl.mkowsky.security.services.ResponseEntityService;
import pl.mkowsky.security.services.TokenService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
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
    FlaskLinear flaskLinear;

    @Inject
    @RestClient
    FlaskBinary flaskBinary;

    @Inject
    TokenService tokenService;

    @Inject
    ResponseEntityService responseEntityService;

    @POST
    @Path("single-review")
    public Response singleReview(JsonObject singleReviewPayload) {
        JwtClaims jwtClaims = tokenService.decodeToken(singleReviewPayload.getString("jwt"));
        ResponseEntity responseEntity = responseEntityService.checkUser(jwtClaims);
        if (responseEntity.isValid()) {
            //JsonArray jsonResponse = flaskLinear.getReview(singleReviewPayload);
            JsonArray jsonResponse = flaskBinary.rateSignleReview(singleReviewPayload);
            return Response.ok().entity(jsonResponse).build();
        } else {
            return Response.ok().entity(responseEntity.getMessage()).build();
        }
    }

    @POST
    @Path("multiple-reviews")
    public Response multipleReviews(JsonObject multipleReviewsPayload) {
        JwtClaims jwtClaims = tokenService.decodeToken(multipleReviewsPayload.getString("jwt"));
        ResponseEntity responseEntity = responseEntityService.checkUser(jwtClaims);
        if (responseEntity.isValid()) {
            JsonArray responseArray = flaskLinear.getMultipleReviews(multipleReviewsPayload);
            return Response.ok().entity(responseArray).build();
        } else {
            return Response.ok().entity(responseEntity.getMessage()).build();
        }
    }

    @POST
    @Path("linear-rating")
    public Response linearClassification(JsonObject multipleReviews) {
        JwtClaims jwtClaims = tokenService.decodeToken(multipleReviews.getString("jwt"));
        ResponseEntity responseEntity = responseEntityService.checkUser(jwtClaims);
        if (responseEntity.isValid()) {
            JsonArray responseArray = flaskLinear.multipleReviewsLinearRating(multipleReviews);
            return Response.ok().entity(responseArray).build();
        } else {
            return Response.ok().entity(responseEntity.getMessage()).build();
        }
    }

    @POST
    @Path("movie-rating")
    public Response movieRating(JsonObject multipleReviews) {
        JwtClaims jwtClaims = tokenService.decodeToken(multipleReviews.getString("jwt"));
        ResponseEntity responseEntity = responseEntityService.checkUser(jwtClaims);
        if (responseEntity.isValid()) {
            double responseArray = flaskLinear.getMovieRating(multipleReviews);
            return Response.ok().entity(responseArray).build();
        } else {
            return Response.ok().entity(responseEntity.getMessage()).build();
        }
    }



}
