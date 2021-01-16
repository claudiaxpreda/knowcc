CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    email varchar NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS questions (
    id serial PRIMARY KEY,
    text varchar NOT NULL,
    correct_answer varchar NOT NULL,
    answer1 varchar NOT NULL,
    answer2 varchar NOT NULL,
    answer3 varchar NOT NULL,
    answer4 varchar NOT NULL,
    category varchar NOT NULL,
    answers_count bigint DEFAULT 0,
    correct_answers_count bigint DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tests (
    id serial PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id integer REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS answers (
    id serial PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    test_id integer REFERENCES tests (id),
    question_id integer REFERENCES questions (id),
    answer varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS challenges (
    id serial PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    original_test_id integer REFERENCES tests (id),
    opponent_user_id integer REFERENCES users (id),
    accepted_test_id integer REFERENCES tests (id)
);

INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('In what country would you find Lake Bled?', 'Slovenia', 'Czech Republic', 'Slovenia', 'Austria', 'Hungary', 'Geography');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('What is the capital of Poland?', 'Warsaw', 'Krakow', 'Warsaw', 'Lubljana', 'Gdansk', 'Geography');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('What country is Beirut the capital of?', 'Lebanon', 'Sudan', 'Lebanon', 'Syria', 'Iran', 'Geography');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('In which city would you find La Sagrada Familia?', 'Barcelona', 'Barcelona', 'Rome', 'Lisbon', 'Lima', 'Geography');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('What is the longest river in the UK?', 'Severn', 'Thames', 'Trent', 'Clyde', 'Severn', 'Geography');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('What is the most recent state to be added to the USA?', 'Hawaii', 'Alaska', 'Hawaii', 'Texas', 'Delaware', 'Geography');

INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Whose death sparked World War I?', 'Archduke Franz Ferdinand', 'Queen Victoria', 'Archbishop Ussher', 'Archduke Franz Ferdinand', 'Kaiser Wilhelm', 'History');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Which of these nations was neutral in World War I?', 'Norway', 'Germany', 'Italy', 'England', 'Norway', 'History');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('How many republics made up the former Soviet Union?', '15', '12', '20', '15', '10', 'History');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Of what country was Simón Bolívar president?', 'Peru', 'Peru', 'Bolivia', 'Argentina', 'Chile', 'History');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Which of these was not an Egyptian pharaoh?', 'Shah Jahan', 'Ramses', 'Shah Jahan', 'Amenhotep', 'Tutankhamen', 'History');

INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Who has won the most league titles English football?', 'Manchester United', 'Liverpool', 'Chelsea', 'Manchester United', 'Arsenal', 'Sports');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('How many World Cups have Italy won?', '4', '2', '4', '3', '5', 'Sports');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Who has won the most UEFA Champions League trophies?', 'Real Madrid', 'Manchester United', 'Barcelona', 'Bayern Munich', 'Real Madrid', 'Sports');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('What does it mean a blue flag at the racecircuit?', 'You have to let a faster car pass', 'There is danger on the track', 'You have to let a faster car pass', 'It is not permitted to overtake a car', 'There is a very slow car on the track', 'Sports');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Which country will host the 2024 Summer Olympics?', 'Paris', 'Tokyo', 'Los Angeles', 'Paris', 'Madrid', 'Sports');
INSERT INTO questions (text, correct_answer, answer1, answer2, answer3, answer4, category) VALUES ('Which country will host the 2022 FIFA World Cup?', 'Qatar', 'USA', 'Japan', 'Switzerland', 'Qatar', 'Sports');