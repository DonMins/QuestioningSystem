package com.ex.entity;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "answeroptions")
public class AnswerOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idAnswerOptions")
    private Integer idAnswerOptions;

    @Basic
    @NonNull
    @Column(name = "nameAnswerOptions")
    private String nameAnswerOptions;

    @Basic
    @NonNull
    @Column(name = "position")
    private Integer position;

    @ManyToOne
    @JoinColumn()
    private Question question;

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

    public Question getQuestion() {
        return question;
    }

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
        return Objects.equals(idAnswerOptions, that.idAnswerOptions) &&
                Objects.equals(nameAnswerOptions, that.nameAnswerOptions) &&
                Objects.equals(position, that.position);

    }

    @Override
    public int hashCode() {
        return Objects.hash(idAnswerOptions, nameAnswerOptions, position);
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
