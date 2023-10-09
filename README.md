# Générateur de sitemap XML

Ce script Node.js génère un fichier `sitemap.xml` à partir d'un dossier spécifique en prenant en compte les directives telles que `noindex` et `nofollow`. Il utilise les variables d'environnement spécifiées dans un fichier `.env` pour déterminer le dossier d'entrée et l'URL de sortie.

## Configuration

Avant d'exécuter le script, assurez-vous de configurer le fichier `.env` dans le répertoire du projet avec les valeurs suivantes :

```
INPUT_DIRECTORY=/chemin/vers/votre/dossier
SITE_OUT=https://votre-site.com
EXTENSIONS=['.html', '.php', '.jsx', '.js']
```

- `INPUT_DIRECTORY` : Le chemin du dossier contenant les fichiers que vous souhaitez inclure dans le sitemap.
- `SITE_OUT` : L'URL de votre site web de destination.

## Exécution

Pour générer le fichier `sitemap.xml`, exécutez le script avec la commande suivante :

```
node generateSitemap.js
```

Le fichier `sitemap.xml` sera créé dans le répertoire du projet en utilisant les directives spécifiées dans le fichier `.env`.

## Auteur

[Tai Tetsuyuki](https://lyna.taistudio.fr/tai_tetsuyuki)

## Licence

Ce projet est sous licence [Licence] - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.
