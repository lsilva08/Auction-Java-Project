package com.spring.test.demo.security;

import com.spring.test.demo.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

//Spring Security class to authentication and check the user permissions/roles
public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = -995399891697239946L;

    public CustomUserDetails(Users user) {
        this.setId(String.valueOf(user.getId()));
        this.setCustomUsername(user.getEmail());
        this.setCustomPassword(user.getPassword());
        this.setUserEnabled(true);

        List<GrantedAuthority> grantedAuthorities =
                AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_ADMIN");
        this.setCustomAuthorities(grantedAuthorities);

    }

    private String id;
    private String customUsername;
    private String customPassword;
    private Collection<? extends GrantedAuthority> customAuthorities;
    private boolean isUserEnabled;



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomUsername() {
        return customUsername;
    }

    public void setCustomUsername(String customUsername) {
        this.customUsername = customUsername;
    }

    public String getCustomPassword() {
        return customPassword;
    }

    public void setCustomPassword(String customPassword) {
        this.customPassword = customPassword;
    }

    public Collection<? extends GrantedAuthority> getCustomAuthorities() {
        return customAuthorities;
    }

    public void setCustomAuthorities(Collection<? extends GrantedAuthority> customAuthorities) {
        this.customAuthorities = customAuthorities;
    }

    public boolean isUserEnabled() {
        return isUserEnabled;
    }

    public void setUserEnabled(boolean isUserEnabled) {
        this.isUserEnabled = isUserEnabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getCustomAuthorities();
    }

    @Override
    public String getPassword() {
        return this.getCustomPassword();
    }

    @Override
    public String getUsername() {
        return this.getCustomUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isUserEnabled();
    }

}
