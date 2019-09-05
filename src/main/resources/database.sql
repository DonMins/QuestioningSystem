-- Table: users
CREATE TABLE users (
                       id       LONG          NOT NULL AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL
);

---- Table: Profile
CREATE TABLE profile (
                         idProfile       LONG          NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         nameProfile VARCHAR(255) NOT NULL,
                         description VARCHAR(255) NOT NULL
);

---- Table: question
CREATE TABLE question (
                          idQuestion       LONG         NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          idProfile       LONG,
                          type VARCHAR(255) NOT NULL,
                          nameQuestion VARCHAR(255) NOT NULL,
                          CONSTRAINT UNQ_QUESTION_IDQUESTION UNIQUE ( IDQUESTION, IDPROFILE )

);
ALTER TABLE QUESTION ADD CONSTRAINT FK_QUESTION_ANSWEROPTION FOREIGN KEY ( IDQUESTION, IDPROFILE )
    REFERENCES ANSWEROPTIONS( IDQUESTION, IDPROFILE ) ON DELETE NO ACTION ON UPDATE NO ACTION;


---- Table: answerOptions
CREATE TABLE answerOptions (
                               idAnswerOptions      LONG          NOT NULL AUTO_INCREMENT PRIMARY KEY,
                               idQuestion LONG,
                               idProfile       LONG,
                               nameAnswerOptions VARCHAR(255) NOT NULL,
                               position VARCHAR(255) NOT NULL,

);
CREATE INDEX UNQ_ANSWEROPTION_IDQUESTION ON ANSWEROPTIONS ( IDQUESTION, IDPROFILE );

---- Table: Group of profile
CREATE TABLE groupOfProfiles (
                                 idgroupOfProfiles      LONG          NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                 titleGroupOfProfiles VARCHAR(255) NOT NULL,

);

-- CREATE TABLE linkProfileOnQuestion (
--     idProfile LONG  NOT NULL,
--     idQuestion LONG  NOT NULL,
--     FOREIGN KEY (idProfile) REFERENCES profile(idProfile),
--     FOREIGN KEY (idQuestion) REFERENCES question(idQuestion),
--     UNIQUE (idProfile, idQuestion))