package pl.mkowsky.npl_demo.repository;

import org.springframework.data.repository.CrudRepository;
import pl.mkowsky.npl_demo.model.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByUsername(String username);
}
