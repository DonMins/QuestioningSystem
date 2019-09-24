package com.ex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "answeroptions")
public class AnswerOptions {
    @Transient
    private final int MAX_LENGTH = 65536;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idAnswerOptions")
    private Integer idAnswerOptions;

    @Basic
    @NonNull
    @Column(name = "nameAnswerOptions", length = MAX_LENGTH)
    private String nameAnswerOptions;

    @Basic
    @NonNull
    @Column(name = "position")
    private Integer position;

    @JsonIgnore
    @ManyToOne
    @JoinColumn()
    private Question question;

    @JsonIgnore
    @ManyToMany
    @JoinColumn()
    private List<User> userList;

    public AnswerOptions(){}

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @JsonIgnore
    public Question getQuestion() {
        return question;
    }

    @JsonIgnore
    public void setQuestion(Question question) {
        this.question = question;
    }

    public Integer getIdAnswerOptions() {
        return idAnswerOptions;
    }

    public void setIdAnswerOptions(Integer idAnswerOptions) {
        this.idAnswerOptions = idAnswerOptions;
    }

    public String getNameAnswerOptions() {
        return nameAnswerOptions;
    }

    public void setNameAnswerOptions(String nameAnswerOptions) {
        this.nameAnswerOptions = nameAnswerOptions;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerOptions that = (AnswerOptions) o;
        return Objects.equals(idAnswerOptions, that.idAnswerOptions);

    }

    @Override
    public int hashCode() {
        return Objects.hash(idAnswerOptions);
    }

    @Override
    public String toString() {
        return "AnswerOptions{" +
                "idAnswerOptions=" + idAnswerOptions +
                ", nameAnswerOptions='" + nameAnswerOptions + '\'' +
                ", position=" + position +
                '}';
    }
}
