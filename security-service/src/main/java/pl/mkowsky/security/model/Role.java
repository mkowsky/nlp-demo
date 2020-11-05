package pl.mkowsky.security.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;

@Cacheable
@Entity
public class Role extends PanacheEntity {


    @Enumerated(EnumType.STRING)
    private ERole name;

    public Role(){

    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
