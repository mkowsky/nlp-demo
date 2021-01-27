package pl.mkowsky.security.services;


import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import pl.mkowsky.security.model.User;
import pl.mkowsky.security.model.VerificationToken;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.security.SecureRandom;

@RequestScoped
public class VerificationTokenService {

    @Inject
    Mailer mailer;

    @Transactional
    public void createVerificationToken(User user, String token) {
        VerificationToken newUserToken = new VerificationToken(token, user);
        newUserToken.persist();
    }


    @Transactional
    public VerificationToken getVerificationToken(String token) {
        return VerificationToken.find("verificationToken", token).firstResult();
    }

    public void generateConfirmationToken(User user) {
        SecureRandom random = new SecureRandom();
        int num = random.nextInt(100000);
        String formatted = String.format("%05d", num);
        createVerificationToken(user, formatted);
        sendConfirmationEmail(user.getEmail(), "Registration Confirmation", "Your confirmation code is: " + formatted);
    }

    private Response sendConfirmationEmail(String odbiorca, String tytul, String zawartosc) {
        mailer.send(Mail.withText("201816@edu.p.lodz.pl", tytul, zawartosc));
        return Response.accepted().build();
    }
}
