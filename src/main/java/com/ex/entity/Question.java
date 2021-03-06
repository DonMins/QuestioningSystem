package com.ex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "question")

public class Question {
    @Transient
    private final int MAX_LENGTH = 65536;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column( name = "idQuestion" )
    private Integer idQuestion;

    @Basic
    @Column( name = "type" )
    private String type;

    @Basic
    @Column( name = "nameQuestion",length =MAX_LENGTH)
    private String nameQuestion;

    @OneToMany(mappedBy = "question",  fetch = FetchType.EAGER)
    private List<AnswerOptions> answerOptions;

    @ManyToOne
    @JsonIgnore
    @JoinColumn()
    private Profile profile;


    public Question(){}


    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }


    public List<AnswerOptions> getAnswerOptions() {
        return answerOptions;
    }

    public void setAnswerOptions(List<AnswerOptions> answerOptions) {
        this.answerOptions = answerOptions;
    }

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNameQuestion() {
        return nameQuestion;
    }

    public void setNameQuestion(String nameQuestion) {
        this.nameQuestion = nameQuestion;
    }

    @Override
    public boolean equals(Object o) {

         if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(idQuestion, question.idQuestion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idQuestion);
    }

    @Override
    public String toString() {
        return "Question{" +
                "idQuestion=" + idQuestion +
                ", type='" + type + '\'' +
                ", nameQuestion='" + nameQuestion + '\'' +
                '}';
    }
}
