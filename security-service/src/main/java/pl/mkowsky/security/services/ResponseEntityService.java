package pl.mkowsky.security.services;

import org.jose4j.jwt.JwtClaims;
import pl.mkowsky.security.ResponseEntity;
import pl.mkowsky.security.model.User;
import pl.mkowsky.security.model.VerificationToken;
import pl.mkowsky.security.payload.LoginRequest;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class ResponseEntityService {

    public  ResponseEntity checkUser(JwtClaims jwtClaims) {
        User existingUser = User.find("email", jwtClaims.getClaimsMap().get("sub")).firstResult();
        if (existingUser != null) {
            if (TokenService.checkIfTokenExpired(jwtClaims)) {
                return new ResponseEntity(false, "Token has expired.");
            } else {
                return new ResponseEntity(true, "Everything is ok.");
            }
        } else {
            return new ResponseEntity(false, "Something went wrong.");
        }
    }

    public ResponseEntity checkForToken(String pin){
        //        Calendar calendar = Calendar.getInstance();
//        if ((verificationToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
//            System.out.println(verificationToken.getExpiryDate().getTime());
//            System.out.println(calendar.getTime().getTime());
//            return Response.status(500).entity("Token expired.").build();
//        }

        VerificationToken verificationToken = VerificationToken.find("token", pin).firstResult();
        if(verificationToken == null){
            return new ResponseEntity(false, "Something went wrong...");
        }
        if(!(verificationToken.getToken().equals(pin))){
            return new ResponseEntity(false, "Token is invalid.");
        } else {
            return new ResponseEntity(true, "Registration successful.");
        }
    }


    public ResponseEntity checkForUser(LoginRequest loginRequest){
        User existingUser = User.find("email", loginRequest.getLogin()).firstResult();
        if(existingUser == null){
            return new ResponseEntity(false, "Account with this emails is not registered.");
        } else {
            if(existingUser.getPassword().equals(loginRequest.getPassword())) {
                if (!(existingUser.active)){
                    return new ResponseEntity(false, "Account is not activated.");
                } else {
                    return new ResponseEntity(true, "Everything is ok.");
                }
            } else {
                return new ResponseEntity(false, "Bad password.");
            }
        }
    }

}
