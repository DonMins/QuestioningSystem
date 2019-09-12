package com.ex.entity;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "GroupOfProfiles")
public class GroupOfProfiles  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idgroupOfProfiles" )
    private Integer idgroupOfProfiles;

    @Basic
    @Nullable
    @Column(name = "title" )
    private String title;

    @Transient
    @JsonIgnore
    @OneToMany(mappedBy = "groupOfProfiles")
    private List<Profile> profileList = new ArrayList<>();

    public GroupOfProfiles(){}

    public List<Profile> getProfileList() {
        return profileList;
    }

    public void setProfileList(List<Profile> profileList) {
        this.profileList = profileList;
    }

    public Integer getIdgroupOfProfiles() {
        return idgroupOfProfiles;
    }

    public void setIdgroupOfProfiles(Integer idgroupOfProfiles) {
        this.idgroupOfProfiles = idgroupOfProfiles;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GroupOfProfiles that = (GroupOfProfiles) o;
        return Objects.equals(idgroupOfProfiles, that.idgroupOfProfiles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idgroupOfProfiles);
    }

    @Override
    public String toString() {
        return "GroupOfProfiles{" +
                "idgroupOfProfiles=" + idgroupOfProfiles +
                ", title='" + title + '\'' +
                '}';
    }


}
