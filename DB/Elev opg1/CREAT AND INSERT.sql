CREATE TABLE "navne" (
	"Id"	INTEGER,
	"navn"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE hold (
	Id INTEGER,
	hold TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE lokale (
	Id INTEGER,
	lokaler TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE vaerg (
	Id INTEGER,
	navnId INTEGER NOT NULL UNIQUE,
	FOREIGN KEY (navnId)
	REFERENCES navne (Id)
	PRIMARY KEY("Id" AUTOINCREMENT)
);


CREATE TABLE kontaktLaerer (
	Id INTEGER,
	navnId INTEGER NOT NULL UNIQUE,
	FOREIGN KEY (navnId)
	REFERENCES navne (Id)
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE "navne" (
	"Id"	INTEGER,
	"navn"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE hold (
	Id INTEGER,
	hold TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);


CREATE TABLE lokale (
	Id INTEGER,
	lokaler TEXT NOT NULL UNIQUE,
	PRIMARY KEY("Id" AUTOINCREMENT)
);


CREATE TABLE adresse (
	Id INTEGER,
	vej TEXT NOT NULL,
	husnr TEXT NOT NULL,
	by TEXT NOT NULL,
	postnr TEXT NOT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE TABLE alder (
	Id INTEGER,
	alder INTEGER NOT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT)
);


CREATE TABLE elever (
    Id INTEGER,
    navnId INTEGER NOT NULL,
    kontakInfoId INTEGER NOT NULL,
    holdId INTEGER NOT NULL,
    lokaleId INTEGER,
    vaergId INTEGER,
    kontaktLaererId INTEGER,
    adresseId INTEGER NOT NULL,
    alderId INTEGER NOT NULL,
    FOREIGN KEY (navnId) REFERENCES navne (Id),
    FOREIGN KEY (kontakInfoId) REFERENCES kontakInfo (Id),
    FOREIGN KEY (holdId) REFERENCES hold (Id),
    FOREIGN KEY (lokaleId) REFERENCES lokale (Id),
    FOREIGN KEY (vaergId) REFERENCES navne (Id),
    FOREIGN KEY (kontaktLaererId) REFERENCES navne (Id),
    FOREIGN KEY (adresseId) REFERENCES adresse (Id),
    FOREIGN KEY (alderId) REFERENCES alder (Id)
	PRIMARY KEY("Id" AUTOINCREMENT)
);

INSERT INTO hold (hold)
VALUES ('h2pd11111');

INSERT INTO lokale (lokaler)
VALUES ('B109');

INSERT INTO navne (navn)
VALUES ('Kurt Urtekram'), ('Maj Seel'), ('Randi Urtekram'), ('Preben Firben'), ('Ninna Hare');

INSERT INTO adresse (vej, husnr, by, postnr)
VALUES ('Bagerbakke', '4', 'Aalborg', '9000'), ('Kødsvinget', '8', 'Bjerget', '8080');

INSERT INTO alder (alder)
VALUES (17), (21);

INSERT INTO kontakInfo (email, mobil, arbejde)
VALUES ('kurt@urt.dk', '12345678', '87654321'), ('maj@seel', '12345678', '9');

INSERT INTO elever (navnId, kontakInfoId, holdId, lokaleId, vaergId, kontaktLaererId, adresseId, alderId)
VALUES (2, 2, 1, 1, null, 5, 2, 2);

SELECT * FROM elever
