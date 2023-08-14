SELECT * FROM elev
INNER JOIN hold ON hold.hold = elev.hold
INNER JOIN person ON person.personId = elev.person
INNER JOIN kontaktinfo ON kontaktinfo.person = elev.person
WHERE hold.holdlokale = "B109"



SELECT elev.*, hold.*, person.*,
       GROUP_CONCAT(kontaktinfo.contactType, kontaktinfo.value) AS all_contact_values
FROM elev
INNER JOIN hold ON hold.hold = elev.hold
INNER JOIN person ON person.personId = elev.person
INNER JOIN kontaktinfo ON kontaktinfo.person = elev.person
WHERE hold.holdlokale = "B109"
GROUP BY elev.elevNr;