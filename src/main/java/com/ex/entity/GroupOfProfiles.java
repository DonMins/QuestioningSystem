package com.ex.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "GroupOfProfiles")
public class GroupOfProfiles  {
    @Transient
    private final int MAX_LENGTH = 65536;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idgroupOfProfiles" )
    private Integer idgroupOfProfiles;

    @Basic
    @Column(name = "title", length =MAX_LENGTH )
    private String title;

    @Transient
    @OneToMany(mappedBy = "groupOfProfiles")
    private List<Profile> profileList = new ArrayList<>();

    public GroupOfProfiles(){}

    public GroupOfProfiles(Integer id , String title) {
        this.idgroupOfProfiles = id;
        this.title = title;
    }

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
