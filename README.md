# Proiect Cloud Computing - knowCC (Claudia Preda, Mihai-Virgil Predoiu)

Aplicatia knowCC reprezinta o platforma prin intermediul careia utilizatorii
isi pot testa cunostintele in materie de cultura generala, si pot, de asemenea,
sa isi provoace prietenii pentru a-si compara rezultatele.

## FUNCTIONALITATI

Primul pas pe care un utilizator trebuie sa il faca este a-si crea un cont nou.
Datele necesare pentru crearea acestuia sunt: adresa de e-mail, numele de
utilizator si parola. Dupa realizarea acestui pas, utilizatorul se poate
autentifica in aplicatie, ramanand autentificat inclusiv dupa repornirea
browser-ului.
Aplicatia este formata din trei ecrane principale, anume:

- Home: este pagina de unde utilizatorul poate configura testul pe care
  urmeaza sa il lanseze. Parametrii unui test includ: categoriie din care sa faca
  parte intrebariile, numarul de intrebari, precum si utlizatorul care sa fie
  provocat la un challenge, cel din urma fiind optional. Dupa completarea tuturor
  raspunsurilor testului, utilizatorul este redirectat catre o pagina in care
  poate vizualiza rezultatul testului, alaturi de o recapitulare a raspunsurilor
  in care poate vizualiza greselile realizate.
- History: in aceasta pagina utilizatorului ii este afisat un istoric
  al testelor pe care le-a completat. La apasarea fiecarui test este redirectat
  catre o pagina identica cu cea pe care este redirectat la completarea unui test.
- Challenges: este pagina in care este afisat un istoric al provocarilor.
  De asemenea, din aceasta pagina utilizatorul poate accepta provocarile de la alti
  utilizatori.
  In momentul in care este lansata o noua provocare, utilizatorul provocat primeste
  o notificare pe adresa sa de email.

## ARHITECTURA

Aplicatia este formata din urmatoarele microservicii: - FontendMicroservice - reprezinta serviciul ce se ocupa de interfata cu
utilizatorul.

- QuizzesMicroservice - reprezinta serviciul in care este scrisa partea
  de business logic a aplicatiei. Acesta comunica in mod direct cu serviciile:
  IOMicroservice pentru a realiza scrierile sau citirile din baza de date, precum
  si AuthMicroservice pentru autentificarea si autorizarea utilizatorilor.
- IOMicroservice - reprezinta serviciul ce primeste requesturi de la
  serviciul QuizzesMicroservice si realizeaza interogarile bazei de date.
- EmailMicroservice - reprezinta serviciul ce primeste requesturi de la
  serviciul QuizzesMicroservice si ce se ocupa de trimiterea de notificari prin
  email la lansarea unei noi provocari.
- AuthMicroservice - este serviciul in care este realizata autentificarea
  si autorizatea utilizatorilor. Acesta comunica in mod direct cu baza de date.
  Actiunile pe care le realizeaza sunt urmatoarele: - register: primeste adresa de e-mail, numele de utilizator si
  parola unui nou utilizator și adauga aceste date in baza de date, criptand parola. - login: primeste numele de utilizator si parola, apoi verifica
  faptul ca numele de utilizator este prezent in baza de date si ca valoarea criptata
  a parolei este corespunzatoare cu intrarea aflata in baza de date. Intoarce la
  frontend un JSON Web Tokens prin care ii vor fi autorizate urmatoarele requesturi
  realizate. - verify: primeste JWT-ul oferit de catre utilizator, il decodeaza
  si intoarce id-ul utilizatorului. Daca JWT-ul este invalid, este intors codul de
  eroare 404.
- Baza de date - este formata dintr-un numar de cinci tabele, dupa cum urmeaza: - users: sunt retinute datele despre utilizatori (nume de utilizator,
  adresa de email, parola criptata). - questions: cuprinde date despre intrebarile ce pot fi intoarse la
  lansarea unui test. Contine textul efectiv al intrabarii, raspunsul corect, patru
  variante de raspuns (printre care se regaseste si cel corect), categoria din care face
  parte si statistici precum numarul total de raspunsuri date la intrebarea respectiva si
  numarul de rapsunsuri corecte. - tests: sunt retinute datele despre momentul crearii unui test, precum
  si utilizatorul care l-a sustinut. - answers: pentru fiecare raspuns pe care utilizatorul in da la o
  intrebare, in baza de date este retinuta o intrare care descrie rapsunsul prin:
  momentul de timp la care a fost creat, stringul efectiv al raspunsului, id-ul intrebarii
  si id-ul testului din care face parte raspunsul. - challenges: contine date despre provocarile dintre utilizatori
  si retine date, precum: momentul de timp la care a fost creata, id-ul testului pornind
  de la care a fost creata, utilizatorul provocat si id-ul testului corespunzator
  utilizatorului provocat.

## TEHNOLOGII

Modulele aplicatiei sunt scrise in limbajul de programare JavaScript, cu anumite
variatiuni - TypeScript, NodeJS

Pentru serviciul FrontendMicroservice am utilizat limbajul TypeScript, folosind
biblioteca ReactJS. In plus, au fost utile biblioteci precum: 'axios', pentru
realizarea de requesturi,
'node-sass', pentru folosirea extensiei Sass peste CSS, 'sweetalert2', pentru
componente dedialog cu utilizatorul etc.

In cadrul serviciului EmailMicroservice am utilizat modulul de NodeJS 'nodemailer'
care face posibila trimiterea de email-uri prin intermediul Gmail.

In serviciul IOMicroservice este folosit pachetul 'node-postgres', care este un
client pentru NodeJs cu ajutorul caruia se pot trimite interogari catre o baza de
date PostgreSQL.

## MOD DE RULARE

Mediu de rulare: 1 manager + 2 workeri. <br/>
`docker-machine create --driver virtualbox noccmanager`<br/>
`docker-machine create --driver virtualbox noccworker1`<br/>
`docker-machine create --driver virtualbox noccworker2`

- ne conectam pe fiecare masina cu urmatoarea comanda: <br/>
  `docker-machine ssh <name>`
- ne conectam pe manager: <br/>
  `docker swarm init` <br/>
  `docker swarm init --advertise-addr <ip>`
- ne conectam pe workeri si rulam comanda de join
- de pe host rulam scriptul _docker-machine-setup.sh_
- pe manager rulam: <br/>
  `docker stack deploy -c stack-api.yml nocc-cluster`
- pe local rulam: <br/>
  `docker-compose -f docker-compose-image.yml up -d`
