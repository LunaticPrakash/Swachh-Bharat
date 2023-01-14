package com.prakash.swachhbharatbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
@Builder
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @Column(name = "role_name", nullable = false, length = 25)
    private String roleName;

    @Column(name = "role_description", nullable = false, length = 255)
    private String roleDescription;

}
