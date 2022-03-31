# Authentification Node/React/GraphQL

## :warning: utilisation de MongoDB

Si vous n'avez pas Mongo installé localement, vous pouvez le lancer avec Docker :

```
docker run -p 27017:27017 -d mongo:4.4
```

## Back

1. Init repo et appli backend
2. Setup Mongoose + écriture modèles
3. "Seed" pour remplir BDD
4. Setup Apollo Server
5. Écriture resolvers :

    * login utilisateur
    * récupérer liste films
    * ajouter film
    * register utilisateur
6. Gestion CORS

## Front

1. Init app front
2. Récupération liste films sur page accueil
3. React Router

    * page accueil (liste films)
    * page register
    * page login
    * page ajout film
4. Gestion credentials via cookie
5. Protection des routes