package com.ex.entity;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "profile")
public class Profile {
    @Transient
    private final int MAX_LENGTH = 65536;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idProfile")
    private Integer idProfile;

    @Basic
    @NonNull
    @Column(name = "nameProfile", length = MAX_LENGTH)
    private String nameProfile;

    @Basic
    @Column(name = "description" , length = MAX_LENGTH)
    private  String description ;

    @OneToMany(mappedBy = "profile",  fetch = FetchType.EAGER)
    private List<Question> questionList;

    @ManyToOne
    @JoinColumn(name = "idGroupProfile")
    private GroupOfProfiles groupOfProfiles;

    public Profile(){}

    public Profile(Integer id, String nameProfile, String description,GroupOfProfiles groupOfProfiles){
        this.idProfile = id;
        this.nameProfile = nameProfile;
        this.description = description;
        this.groupOfProfiles = groupOfProfiles;
    }

    public GroupOfProfiles getGroupOfProfiles() {
        return groupOfProfiles;
    }

    public void setGroupOfProfiles(GroupOfProfiles groupOfProfiles) {
        this.groupOfProfiles = groupOfProfiles;
    }

    public List<Question> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Question> questionList) {
        this.questionList = questionList;
    }

    public Integer getIdProfile() {
        return idProfile;
    }

    public void setIdProfile(Integer idProfile) {
        this.idProfile = idProfile;
    }

    public String getNameProfile() {
        return nameProfile;
    }

    public void setNameProfile(String nameProfile) {
        this.nameProfile = nameProfile;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Profile profile = (Profile) o;
        return Objects.equals(idProfile, profile.idProfile);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProfile);
    }

    @Override
    public String toString() {
        return "Profile{" +
                "idProfile=" + idProfile +
                ", nameProfile='" + nameProfile + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
