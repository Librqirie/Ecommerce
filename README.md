# Installation et Configuration du Projet E-Commerce

Bienvenue dans ce projet de gestion e-commerce développé avec **Node.js**, **Express** et **MongoDB**. Ce guide vous expliquera comment installer et configurer le projet après avoir cloné le dépôt.

Par Alexis SELY & Léa SELLIER

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js** (vérifiez l'installation avec `node -v` et `npm -v`)
- **MongoDB Community Edition** (assurez-vous qu'il est démarré via la commande `mongod` ou en tant que service)
- **MongoDB Compass** (recommandé pour une gestion visuelle des données)

## 📥 Clonage du dépôt

Pour récupérer le projet, exécutez la commande suivante dans votre terminal :

```bash
git clone https://github.com/SellierL/Ecommerce.git
cd Ecommerce
```

## ⚙️ Installation des dépendances

Installez les dépendances du projet en exécutant la commande suivante :

```bash
npm install express mongoose dotenv jsonwebtoken
```

Et si npm et node n'ont pas de version vous pouvez utiliser la commande :

```bash
npm install -g npm
```

## 📊 Connexion à MongoDB avec Compass

Nous utiliserons MongoDB Compass pour cet exemple

1️. Ouvrir MongoDB Compass et se connecter
- Lancez MongoDB Compass
- Dans la fenêtre de connexion, cliquez sur "Add new Connection" (sur le +)
- Dans le champ URI, entrez l'URI de connexion qui est défini dans le fichier .env du projet.
- Exemple d'URI par défaut :

```bash
mongodb://localhost:27017/ecommerce
```

- Cliquez sur "Connect"

2. Importer les fichiers JSON
- Sélectionnez une collection dans ecommerce (exemple : users)
- Cliquez sur "Add Data", puis sur "Import JSON or CSV file"
- Choisissez le fichier correspondant à la collection(ex. : data/users.json)
- Cliquez sur "Import"
- Répétez l'opération pour chaque fichier JSON du dossier data/ :
    - data/users.json
    - data/products.json
    - data/orders.json
    - data/reviews.json
    - data/logs.json

## 🚀 Démarrer le serveur

Une fois les données importées, lancez le serveur en exécutant :

```bash
node server.js
```

Si tout fonctionne comme prévue, vous devriez voir ceci :

```bash
Serveur démarré sur le port 3000
MongoDB connecté !
```

## 🔍 Tester l’API

Vous pouvez tester les routes de l’API avec Postman ou cURL.

### 🌍 Vérifier que l’API fonctionne (GET /)
- Navigateur : ouvrez http://localhost:3000/
- cURL :

```bash
curl -X GET http://localhost:3000/
```

### Tester la route pour récupérer tous les produits (GET /products)

- Avec Postman :

    - Sélectionne la méthode GET
    - Entre l'URL :

    ```bash
    http://localhost:3000/products
    ```

    - Cliquez sur Send pour voir la liste des produits

- Avec CURL :

    ```bash
    curl -X GET http://localhost:3000/products
    ```

### 🛒 Tester la route pour ajouter un produit (POST /products)
- Avec Postman :

    - Sélectionnez la méthode POST
    - Entre l'URL :

    ```bash
    http://localhost:3000/products
    ```

    - Dans l'onglet Body, choisis raw et sélectionne JSON.
    - Ensuite, saisis un JSON comme celui-ci :

    ```bash
    {
    "name": "Casque Audio",
    "price": 150,
    "description": "Un super casque",
    "stock": 10
    }
    ```

    - Cliquez sur Send. Vous devrez obtenir une réponse avec le produit ajouté et son identifiant.

- Avec CURL :

    ```bash
    curl -X POST http://localhost:3000/products \
        -H "Content-Type: application/json" \
        -d '{"name": "Casque Audio", "price": 150, "description": "Un super casque", "stock": 1
    ```

## 🧴 Tester la route pour mettre à jour un produit (PUT /products/:id)
- Avec Postman :

    - Sélectionnez la méthode PUT
    Utilisez l'URL en remplaçant :id par l'identifiant du produit que vous voulez modifier, par exemple :

    ```bash
    http://localhost:3000/products/6123456789abcdef01234567
    ```

    - Dans l'onglet Body, choisisez raw et JSON et envoiez par exemple :
    ```bash
    {
    "price": 200,
    "stock": 15
    }
    ```
    - Cliquez sur Send pour mettre à jour le produit

- Avec CURL :

    ```bash
    curl -X PUT http://localhost:3000/products/6123456789abcdef01234567 \
        -H "Content-Type: application/json" \
        -d '{"price": 200, "stock": 15}'
    ```

## 🔒 Système d'Authentification et Gestion des Droits

Le projet comprend un système de vérification des droits d'accès basé sur les rôles utilisateur:

### Rôles disponibles
- Super Administrateur
- Administrateur
- Vendeur
- Client
- Gestionnaire de Commandes
- Analyste Marketing

### Tester la vérification des droits d'accès

Nous avons intégré une route de démonstration pour tester si un rôle spécifique a le droit d'effectuer une action:

**Avec Postman:**

1. Sélectionnez la méthode POST
2. Utilisez l'URL:

Authentification avec JWT
Pour obtenir un token JWT nécessaire pour les routes protégées:

Créer un utilisateur :

POST http://localhost:3000/auth/register
Body:

```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "password123",
  "role": "Super Administrateur"
}
```
Se connecter pour obtenir un token :

POST http://localhost:3000/auth/login
Body:
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
La réponse inclura un token JWT que vous pourrez utiliser pour les routes protégées


Tester la vérification des droits :

POST http://localhost:3000/demo/check-access
Body:
```json
{
  "userRole": "Super Administrateur",
  "actionType": "deleteProduct"
}
```
La réponse devrait confirmer que ce rôle a le droit d'effectuer cette action


Tester avec un rôle différent :

POST http://localhost:3000/demo/check-access
Body:
```json
{
  "userRole": "Client",
  "actionType": "deleteProduct"
}
```
La réponse devrait indiquer que ce rôle n'a pas le droit d'effectuer cette action


## 📂 Structure du projet

```
/ecommerce
  ├── config/
  │     └── db.js              # Connexion à MongoDB
  ├── data/                    # Fichiers JSON contenant les données
  │     ├── users.json
  │     ├── products.json
  │     ├── orders.json
  │     ├── reviews.json
  │     └── logs.json
  ├── models/                  # Schémas Mongoose
  │     ├── User.js
  │     ├── Product.js
  │     ├── Order.js
  │     ├── Review.js
  │     └── Log.js
  ├── node_modules/
  ├── routes/                  # Définition des routes API
  │     ├── users.js
  │     ├── products.js
  │     ├── orders.js
  │     ├── reviews.js
  │     ├── logs.js
  │     └── auth.js            # Routes d'authentification
  ├── utils/                   # Utilitaires
  │     ├── jwtAuth.js         # Fonctions pour JWT
  │     └── checkAccess.js     # Vérification des permissions
  ├── server.js                # Serveur principal Express
  ├── .env                     # Variables d'environnement (JWT_SECRET)
  ├── package.json             # Dépendances du projet
  ├── package-lock.json
  └── README.md                # Documentation du projet
```