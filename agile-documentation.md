# Agile Documentation — Core Gym Club – Bokningssystem

> **Projekt:** Core Gym Club – Bokningssystem
> **Metodik:** SCRUM
> **Projektverktyg:** Jira
> **Utvecklare:** Yazan Alali

---

## Innehållsförteckning

1. Projektöversikt
2. Teknikstack
3. Jira-projektets upplägg
4. User stories
5.Aktivitetsdiagram — Bokningsflöde
6. Sekvensdiagram
7. Sprintplanering
   - Sprint 1 (25/5–29/5)
   - Sprint 2 (1/6–5/6)
8. Bevis från Jira-boarden
9. Produktbacklog
10. Veckovis MVP-utveckling
11. Daglig loggbok
12. Planerat arbete jämfört med genomfört arbete
13. Feature branches
14. Sammanfattning av agila krav

---

## 1. Projektöversikt

**Core Gym Club – Bokningssystem** är en fullstack digital bokningsplattform för gymmedlemmar och admin.

### Medlemsfunktioner
- Registrera ett konto
- Logga in och logga ut
- Visa kommande gympass
- Boka träningspass
- Avboka bokningar
- Visa profilinformation

### Adminfunktioner
- Skapa träningspass
- Redigera träningspass
- Ta bort träningspass
- Hantera scheman


---

## 2. Teknikstack

| Lager            | Teknik                |
| :--------------- | :-------------------- |
| Frontend         | React (Vite)          |
| Backend          | ASP.NET Core Web API  |
| Databas          | SQLite                |
| ORM              | Entity Framework Core |
| Autentisering    | JWT (JSON Web Tokens) |
| Versionskontroll | Git + GitHub          |
| Projektverktyg   | Jira                  |
| API-testning     | Swagger               |


---

## 3. Jira-projektets upplägg

Projektet hanterades i Jira med en Scrum-board och två sprintar.

### Jira-boardens kolumner

| Status     | Syfte                                                                          |
| :--------- | :----------------------------------------------------------------------------- |
| Backlog    | Alla identifierade ärenden som ännu inte har lagts in i en sprint            |
| Att göra  | Ärenden som har lagts till i den aktuella sprinten men ännu inte påbörjats |
| Pågående | Ärenden som aktivt utvecklas                                                  |
| Testning   | Ärenden som testas manuellt eller via Swagger                                 |
| Klart      | Ärenden som är genomförda och verifierade                                   |


### Jira-ärendetyper som användes


| Typ      | Beskrivning                                                          |
| :------- | :------------------------------------------------------------------- |
| Epic     | En större funktionsgrupp, till exempel autentisering                |
| Story    | Funktionalitet ur användarens perspektiv                            |
| Task     | Tekniska arbetsuppgifter, till exempel konfiguration och migreringar |
| Sub-task | Mindre delar av en story eller task                                  |
| Bug      | Fel som identifierades under testning                                |


### Epics som skapades i Jira

| Epic-nyckel | Epic-namn      | Stories som ingår  |
| :---------- | :------------- | :------------------ |
| CGCB-E1     | Autentisering  | US-01, US-02, US-03 |
| CGCB-E2     | Passhantering  | US-04               |
| CGCB-E3     | Bokningssystem | US-05, US-06, US-07 |
| CGCB-E4     | Admindashboard | US-08, US-09, US-10 |


---

## 4. User Stories

Alla user stories följer Jira-formatet:
**Som [roll] vill jag [åtgärd] så att [syfte]**
Varje story skapades som ett Jira Story-ärende och kopplades till sin överordnade Epic..

| Jira-ID | User story                                                                            | Epic    | Prioritet | Story points | Sprint   |
| :------ | :------------------------------------------------------------------------------------ | :------ | :-------- | :----------- | :------- |
| CGCB-1  | Som användare vill jag skapa ett konto så att jag kan komma åt bokningssystemet.   | CGCB-E1 | Hög      | 3            | Sprint 1 |
| CGCB-2  | Som användare vill jag logga in så att jag kan hantera mina bokningar.              | CGCB-E1 | Hög      | 2            | Sprint 1 |
| CGCB-3  | Som användare vill jag logga ut så att jag kan hålla mitt konto säkert.           | CGCB-E1 | Hög      | 1            | Sprint 1 |
| CGCB-4  | Som medlem vill jag se kommande gympass så att jag kan välja ett pass.              | CGCB-E2 | Hög      | 2            | Sprint 1 |
| CGCB-5  | Som medlem vill jag boka ett pass så att jag kan reservera en plats.                 | CGCB-E3 | Hög      | 3            | Sprint 2 |
| CGCB-6  | Som medlem vill jag avboka en bokning så att jag kan frigöra min reserverade plats. | CGCB-E3 | Medel     | 2            | Sprint 2 |
| CGCB-7  | Som medlem vill jag se mina kommande bokningar så att jag kan hantera mitt schema.   | CGCB-E3 | Medel     | 2            | Sprint 2 |
| CGCB-8  | Som admin vill jag skapa träningspass så att medlemmar kan boka dem.                | CGCB-E4 | Hög      | 3            | Sprint 2 |
| CGCB-9  | Som admin vill jag redigera träningspass så att jag kan uppdatera passdetaljer.     | CGCB-E4 | Medel     | 2            | Sprint 2 |
| CGCB-10 | Som admin vill jag ta bort träningspass så att jag kan ta bort inställda pass.     | CGCB-E4 | Medel     | 2            | Sprint 2 |


### Acceptanskriterier

**CGCB-1 — Registrera konto**
- Användaren kan fylla i registreringsformulär med namn, e-post och lösenord
- Systemet validerar informationen och skapar ett konto
- Användaren skickas vidare till inloggningssidan när registreringen lyckas

**CGCB-5 — Boka ett pass**
- Medlemmen kan se tillgängliga platser på ett pass
- Medlemmen kan klicka på "Boka" och få en bekräftelse
- Bokningen sparas i databasen och visas i profilen

**CGCB-8 — Admin skapar pass**
- Admin kan fylla i passnamn, datum, tid och kapacitet
- Passet visas direkt i det offentliga schemat
- Validering förhindrar dubbla pass vid samma tidpunkt


---

## 5. Aktivitetsdiagram — Bokningsflöde

```
Start
│
Användaren loggar in
│
▼
Öppnar passchema
│
▼
Väljer träningspass
│
▼
Systemet kontrollerar tillgängliga platser
│
▼
┌─────────────────────────┐
│  Finns lediga platser?  │
└─────────────────────────┘
    │                    │
    JA                   NEJ
    │                    │
    ▼                    ▼
Användaren          Visa "Inga platser
bekräftar            tillgängliga"
bokningen                 │
    │                    Slut
    ▼
Systemet sparar
bokningen
│
▼
Bekräftelse visas
│
Slut
```

---

## 6. Sekvensdiagram

### 6.1 Bokningsflöde

```
Användare    Frontend    Backend    Databas
   │            │            │            │
   │— Logga in —►│            │            │
   │            │— POST /auth/login ———————►│
   │            │◄— JWT-token ——————————————│
   │◄— Auth OK —│            │            │
   │            │            │            │
   │— Visa pass —►│            │            │
   │            │— GET /sessions ——————————►│
   │            │◄— Passlista —————————————│
   │◄— Visa ————│            │            │
   │            │            │            │
   │— Boka pass —►│            │            │
   │            │— POST /bookings —————————►│
   │            │            │— Spara bokning —►│
   │            │            │◄— Sparad ———│
   │            │◄— 200 OK ———————————————│
   │◄— Bekräftat │            │            │
```

### 6.2 Autentiseringsflöde

```
Användare    Frontend    Auth-tjänst    Databas
   │            │            │            │
   │— Registrera —►│            │            │
   │            │— POST /register —————————►│
   │            │            │— Skapa användare —►│
   │            │            │◄— Användar-ID —│
   │            │◄— 201 Created ——————————│
   │◄— Klart ———│            │            │
   │            │            │            │
   │— Logga in —►│            │            │
   │            │— POST /login ————————————►│
   │            │            │— Hämta användare —►│
   │            │            │◄— Användardata —│
   │            │◄— JWT-token —————————————│
   │◄— Inloggad —│            │            │
```

### 6.3 Admin passhantering

```
Admin        Frontend    Backend    Databas
   │            │            │            │
   │— Skapa ————►│            │            │
   │            │— POST /sessions —————————►│
   │            │            │— Spara ————►│
   │            │            │◄— OK —————│
   │            │◄— 201 Created ——————————│
   │◄— Bekräftat │            │            │
   │            │            │            │
   │— Redigera —►│            │            │
   │            │— PUT /sessions/{id} —————►│
   │            │            │— Uppdatera —►│
   │            │◄— 200 OK ———————————————│
   │◄— Uppdaterat │            │            │
   │            │            │            │
   │— Ta bort ——►│            │            │
   │            │— DELETE /sessions/{id} ——►│
   │            │            │— Ta bort ——►│
   │            │◄— 200 OK ———————————————│
   │◄— Borttaget │            │            │
```

---

## 7. Sprintplanering

Sprintarna skapades och hanterades direkt i Jira under projektboarden. Varje sprint hade ett tydligt mål, startdatum, slutdatum och en uppsättning ärenden som hämtades från backloggen.

### Sprint 1 (25/5 – 29/5)

**Sprintmål:** Leverera en fungerande MVP med användarautentisering och passvisning.
**Sprintlängd:** 5 dagar
**Totalt antal story points:** 11

| Jira-ID | Länkad story | Uppgiftsbeskrivning                              | Story points | Status  |
| :------ | :------------ | :----------------------------------------------- | :----------- | :------ |
| CGCB-11 | CGCB-1        | Konfigurera ASP.NET Core Web API-projekt         | 1            | ✅ Klart |
| CGCB-12 | CGCB-1        | Implementera endpoint för användarregistrering | 2            | ✅ Klart |
| CGCB-13 | CGCB-2        | Implementera inloggning med JWT                  | 2            | ✅ Klart |
| CGCB-14 | CGCB-3        | Implementera utloggning                          | 1            | ✅ Klart |
| CGCB-15 | CGCB-4        | Skapa endpointen GET /sessions                   | 1            | ✅ Klart |
| CGCB-16 | CGCB-4        | Bygga passlista i React                          | 2            | ✅ Klart |
| CGCB-17 | CGCB-2        | Implementera skyddade rutter i frontend          | 1            | ✅ Klart |
| CGCB-18 | —             | Konfigurera SQLite, EF Core och DbContext        | 1            | ✅ Klart |


**Resultat Sprint 1:** 8 ärenden genomfördes av 8 planerade. Sprinten stängdes i Jira.

---

### Sprint 2 (1/6 – 5/6)

**Sprintmål:** Slutföra bokningssystemet, admin dashboard och profilsida.
**Sprintlängd:** 5 dagar
**Totalt antal story points:** 22


| Jira-ID | Länkad story | Uppgiftsbeskrivning                                  | Story points | Status  |
| :------ | :------------ | :--------------------------------------------------- | :----------- | :------ |
| CGCB-19 | CGCB-5        | Implementera endpointen POST /bookings               | 2            | ✅ Klart |
| CGCB-20 | CGCB-5        | Bygga boknings-UI med bokningsknapp och bekräftelse | 2            | ✅ Klart |
| CGCB-21 | CGCB-6        | Implementera endpointen DELETE /bookings/{id}        | 1            | ✅ Klart |
| CGCB-22 | CGCB-6        | Bygga UI för avbokning                              | 2            | ✅ Klart |
| CGCB-23 | CGCB-7        | Bygga profilvyn "Mina bokningar"                     | 2            | ✅ Klart |
| CGCB-24 | CGCB-8        | Admin: skapa formulär och endpoint för pass        | 3            | ✅ Klart |
| CGCB-25 | CGCB-9        | Admin: redigera formulär och endpoint för pass     | 3            | ✅ Klart |
| CGCB-26 | CGCB-10       | Admin: ta bort pass med bekräftelse                 | 2            | ✅ Klart |
| CGCB-27 | —             | Responsiva designförbättringar                     | 2            | ✅ Klart |
| CGCB-28 | —             | Buggfixar och sluttestning                           | 3            | ✅ Klart |


**Resultat Sprint 2:** 10 ärenden genomfördes av 10 planerade. Sprinten stängdes i Jira.


---

## 8. Bevis från Jira-boarden

### Jira backlog / boardöversikt



*Jira-boarden visar alla ärenden i backloggen och båda sprintarna. Ärendena visas med sina ID:n, till exempel CGCB-1 till CGCB-28, epic-länkar, story points och aktuella statuskolumner: Backlog → Att göra → Pågående → Testning → Klart.*

---

###  Sprint 1 pågående


*Jira Scrum-boarden under Sprint 1 (25/5–29/5) visar hur ärenden CGCB-11 till CGCB-18 flyttades genom arbetsflödet. Autentisering och passvisning var klara vid sprintens slut.*

---

### Sprint 2 genomförd


*Jira-boarden vid slutet av Sprint 2 (1/6–5/6) visar att ärenden CGCB-19 till CGCB-28 flyttades till Klart. Sprinten stängdes i Jira efter att funktionerna var verifierade.*

---

## 9. Produktbacklog

Den fullständiga produktbackloggen fanns i Jira före sprintplaneringen. Ärendena prioriterades och lades in i sprintarna under planeringsmötena.

| Jira-ID | Titel                          | Typ      | Epic    | Prioritet | Story points | Sprint   |
| :------ | :----------------------------- | :------- | :------ | :-------- | :----------- | :------- |
| CGCB-1  | Användarregistrering          | Story    | CGCB-E1 | Hög      | 3            | Sprint 1 |
| CGCB-2  | Användarinloggning            | Story    | CGCB-E1 | Hög      | 2            | Sprint 1 |
| CGCB-3  | Användarutloggning            | Story    | CGCB-E1 | Hög      | 1            | Sprint 1 |
| CGCB-4  | Visa kommande pass             | Story    | CGCB-E2 | Hög      | 2            | Sprint 1 |
| CGCB-5  | Boka ett pass                  | Story    | CGCB-E3 | Hög      | 3            | Sprint 2 |
| CGCB-6  | Avboka en bokning              | Story    | CGCB-E3 | Medel     | 2            | Sprint 2 |
| CGCB-7  | Visa kommande bokningar        | Story    | CGCB-E3 | Medel     | 2            | Sprint 2 |
| CGCB-8  | Admin: skapa pass              | Story    | CGCB-E4 | Hög      | 3            | Sprint 2 |
| CGCB-9  | Admin: redigera pass           | Story    | CGCB-E4 | Medel     | 2            | Sprint 2 |
| CGCB-10 | Admin: ta bort pass            | Story    | CGCB-E4 | Medel     | 2            | Sprint 2 |
| CGCB-18 | SQLite + EF Core-konfiguration | Task     | —       | Hög      | 1            | Sprint 1 |
| CGCB-17 | JWT-autentiseringsmiddleware   | Task     | CGCB-E1 | Hög      | 1            | Sprint 1 |
| CGCB-27 | Responsiva UI-förbättringar  | Task     | —       | Låg      | 2            | Sprint 2 |
| CGCB-28 | Buggfixar och sluttestning     | Bug/Task | —       | Medel     | 3            | Sprint 2 |

---

## 10. Veckovis MVP-utveckling

### Vecka 1 — Planering (18/5–22/5)

- Definierade projektets omfattning och mål
- Skapade Jira-projekt med Scrum-board och 4 Epics
- Skapade alla 10 user stories i Jira-backloggen
- Definierade story points för varje ärende
- Skapade aktivitetsdiagram för bokningsflödet
- Skapade 3 sekvensdiagram
- Konfigurerade Git-repository och feature branches
**Leverans:** Jira-backlog, planeringsdokument och diagram färdigställdes ✅

---

### Vecka 2 — Sprint 1 MVP (25/5–29/5)

- Sprint 1 startades i Jira och ärenden flyttades från Backlog till Att göra
- ASP.NET Core Web API, SQLite och EF Core konfigurerades
- Registrering, inloggning och utloggning med JWT implementerades
- Endpointen GET /sessions byggdes
- React frontend utvecklades med passlista och skyddade rutter
- Ärenden flyttades till Klart i Jira när de var genomförda
**Leverans:** Fungerande autentisering och passvisning. Sprint 1 stängdes i Jira ✅

---

### Vecka 3 — Sprint 2 MVP (1/6–5/6)

- Sprint 2 startades i Jira och återstående stories hämtades från backloggen
- Ett komplett bokningssystem implementerades med POST och DELETE /bookings
- Profilvyn "Mina bokningar" byggdes
- Admin dashboard byggdes med funktioner för att skapa, redigera och ta bort pass
- Responsiva UI-förbättringar och buggfixar genomfördes
- Alla ärenden flyttades till Klart och Sprint 2 stängdes i Jira

**Leverans:** Komplett bokningssystem och adminfunktioner. Sprint 2 stängdes i Jira ✅

---

### Vecka 4 — Testning och dokumentation (2/6–7/6)

- Swagger API testades end-to-end mot alla endpoints
- Manuell testning genomfördes mot alla 10 user stories
- Den agila dokumentationen färdigställdes
**Leverans:** Testat, dokumenterat och inlämnat projekt ✅


---

## 11.Daglig loggbok

### Vecka 1 (18/5–22/5) — Planering

| Datum | Genomfört arbete                                                 | Jira-aktivitet                              |
| :---- | :---------------------------------------------------------------- | :------------------------------------------ |
| 18/5  | Projektstart, definierade omfattning och valde SCRUM med Jira     | Jira-projekt skapat och board konfigurerad  |
| 19/5  | Skapade 4 Epics i Jira och definierade arbetsflödeskolumner      | Epics CGCB-E1 till CGCB-E4 skapades         |
| 20/5  | Skrev alla 10 user stories och uppskattade story points           | CGCB-1 till CGCB-10 lades till i backloggen |
| 21/5  | Skapade aktivitetsdiagram för bokningsflödet                    | Uppgifter lades till som sub-tasks i Jira   |
| 22/5  | Skapade 3 sekvensdiagram och konfigurerade GitHub-repo + branches | Branches kopplades till Jira-ärenden       |

### Vecka 2 (25/5–29/5) — Sprint 1

| Datum | Genomfört arbete                                               | Jira-aktivitet                               |
| :---- | :-------------------------------------------------------------- | :------------------------------------------- |
| 25/5  | ASP.NET Core-projekt, SQLite och EF Core konfigurerades         | Sprint 1 startades, CGCB-18 → Pågående     |
| 26/5  | User- och Role-modeller, EF-migreringar och seed-data           | CGCB-18 → Klart                              |
| 27/5  | Registrering, inloggningsendpoints och JWT-token-tjänst        | CGCB-12, CGCB-13 → Klart                     |
| 28/5  | Utloggning, GET /sessions endpoint och React Vite-konfiguration | CGCB-14, CGCB-15 → Klart                     |
| 29/5  | Passlista i UI, skyddade rutter och Sprint 1-granskning         | CGCB-16, CGCB-17 → Klart. Sprint 1 stängdes |

### Vecka 3 (1/6–5/6) — Sprint 2

| Datum | Genomfört arbete                                                        | Jira-aktivitet                             |
| :---- | :----------------------------------------------------------------------- | :----------------------------------------- |
| 1/6   | POST /bookings endpoint och logik för kapacitetskontroll                | Sprint 2 startades, CGCB-19 → Pågående   |
| 2/6   | Boknings-UI med bokning och bekräftelse samt endpoint för avbokning    | CGCB-19, CGCB-20, CGCB-21 → Klart          |
| 3/6   | UI för avbokning och profilvyn "Mina bokningar"                         | CGCB-22, CGCB-23 → Klart                   |
| 4/6   | Admin dashboard med skapa/redigera/ta bort pass och rollbaserad åtkomst | CGCB-24, CGCB-25, CGCB-26 → Klart          |
| 5/6   | Responsiva förbättringar och Sprint 2-granskning                       | CGCB-27 → Klart. Sprint 2 stängdes i Jira |

### Vecka 4 (6/6–7/6) — Slutfas

| Datum | Genomfört arbete                                           | Jira-aktivitet                            |
| :---- | :---------------------------------------------------------- | :---------------------------------------- |
| 6/6   | Fullständig Swagger API-testning och buggfixar             | CGCB-28 → Klart                           |
| 7/6   | Dokumentationen färdigställdes och projektet lämnades in | Alla ärenden i Klart. Projektet färdigt |

---

## 12. Planerat arbete jämfört med genomfört arbete

| Sprint     | Planerade ärenden | Genomförda ärenden | Planerade story points | Levererade story points | Velocity |
| :--------- | :----------------- | :------------------- | :--------------------- | :---------------------- | :------- |
| Sprint 1   | 8                  | 8                    | 11                     | 11                      | 100%     |
| Sprint 2   | 10                 | 10                   | 22                     | 22                      | 100%     |
| **Totalt** | **18**             | **18**               | **33**                 | **33**                  | **100%** |


### User stories — planerat jämfört med levererat

| Jira-ID | Beskrivning          | Sprint   | Planerat | Levererat |
| :------ | :------------------- | :------- | :------- | :-------- |
| CGCB-1  | Registrera konto     | Sprint 1 | ✅        | ✅         |
| CGCB-2  | Logga in             | Sprint 1 | ✅        | ✅         |
| CGCB-3  | Logga ut             | Sprint 1 | ✅        | ✅         |
| CGCB-4  | Visa pass            | Sprint 1 | ✅        | ✅         |
| CGCB-5  | Boka pass            | Sprint 2 | ✅        | ✅         |
| CGCB-6  | Avboka bokning       | Sprint 2 | ✅        | ✅         |
| CGCB-7  | Visa bokningar       | Sprint 2 | ✅        | ✅         |
| CGCB-8  | Admin: skapa pass    | Sprint 2 | ✅        | ✅         |
| CGCB-9  | Admin: redigera pass | Sprint 2 | ✅        | ✅         |
| CGCB-10 | Admin: ta bort pass  | Sprint 2 | ✅        | ✅         |


**Alla 10 user stories levererades enligt plan. Inga större ärenden flyttades vidare mellan sprintarna.**

---

## 13. Feature branches

Feature branches skapades i GitHub och kopplades till motsvarande Jira-ärenden genom att använda Jira-nyckeln i branch-namnet där det var möjligt.
| Branch                  | Länkade Jira-ärenden  | Syfte                                                      | Status   |
| :---------------------- | :---------------------- | :--------------------------------------------------------- | :------- |
| main                    | —                       | Stabil produktionsklar kod                                 | ✓ Aktiv  |
| feature/login           | CGCB-1, CGCB-2, CGCB-3  | Registrering, inloggning, utloggning och JWT-autentisering | ✓ Mergad |
| feature/booking-system  | CGCB-5, CGCB-6, CGCB-7  | Boka pass, avboka bokning och visa bokningar               | ✓ Mergad |
| feature/admin-dashboard | CGCB-8, CGCB-9, CGCB-10 | Skapa, redigera och ta bort pass som admin                 | ✓ Mergad |
| feature/profile-page    | CGCB-7                  | Användarprofil och vy för kommande bokningar             | ✓ Mergad |

---

## 14. Sammanfattning av agila krav

Självbedömning mot lärarens krav med Jira som projektverktyg.

| #  | Krav                                            | Status     | Bevis                                                                       |
| :- | :---------------------------------------------- | :--------- | :-------------------------------------------------------------------------- |
| 1  | Agil planering                                  | ✅ Uppfyllt | Jira-projekt med backlog, epics, sprintar och story points                  |
| 2  | Användning av Jira / Trello / Azure DevOps     | ✅ Uppfyllt | Jira användes under projektet och skärmdumpar finns i avsnitt 8           |
| 3  | Veckovisa leveranser                            | ✅ Uppfyllt | Vecka 1–4 dokumenterades och en MVP levererades i varje sprint              |
| 4  | User stories, minst 10 stycken                  | ✅ Uppfyllt | CGCB-1 till CGCB-10 skapades i Jira med story points och acceptanskriterier |
| 5  | Aktivitetsdiagram                               | ✅ Uppfyllt | Bokningsflödet visas i avsnitt 5                                           |
| 6  | Sprintbaserat arbete                            | ✅ Uppfyllt | Två Jira-sprintar användes med ärenden, story points och datum           |
| 7  | Två sprintleveranser                           | ✅ Uppfyllt | Sprint 1 genomfördes 25/5–29/5 och Sprint 2 genomfördes 1/6–5/6           |
| 8  | Planerat arbete jämfört med genomfört arbete | ✅ Uppfyllt | Avsnitt 12 visar planerade och genomförda story points                     |
| 9  | Daglig loggbok / progression                    | ✅ Uppfyllt | Avsnitt 11 innehåller daglig logg med Jira-aktiviteter                     |
| 10 | Bevis på agilt arbetssätt                     | ✅ Uppfyllt | Jira-skärmdumpar, epics, sprintar, feature branches och backlog            |

**Sammanfattning**
Den agila dokumentationen visar hur Jira användes som det huvudsakliga projektverktyget under projektet. Arbetet delades upp i SCRUM-sprintar och user stories kopplades till bokningssystemets viktigaste funktioner.
Dokumentationen innehåller skärmdumpar från Jira, epics, sprintplanering, feature branches, backlogstruktur och en daglig loggbok. Projektet innehåller även manuell testning och API-testning med Swagger.

---

*Core Gym Club – Bokningssystem*
