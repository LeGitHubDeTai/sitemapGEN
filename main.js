/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const xmlbuilder = require('xmlbuilder');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Récupérer les valeurs des variables d'environnement
const inputDirectory = process.env.INPUT_DIRECTORY;
var siteOut = process.env.SITE_OUT;

if (!inputDirectory || !siteOut) {
    console.error('Le chemin du dossier d\'entrée ou l\'URL de sortie n\'ont pas été spécifiés dans le fichier .env.');
    process.exit(1);
}

// Supprimer le slash final s'il est présent
if (siteOut.endsWith('/')) {
    siteOut = siteOut.slice(0, -1);
}

// Fonction pour générer le sitemap.xml
function generateSitemap() {
    const sitemap = xmlbuilder.create('urlset', { encoding: 'UTF-8' });

    // Lire récursivement les fichiers du dossier spécifié
    function readDirectory(directory) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // Si c'est un répertoire, récursivement lire son contenu
                readDirectory(filePath);
            } else {
                // Si c'est un fichier, ajouter son URL au sitemap sans le chemin du dossier d'entrée
                const relativePath = path.relative(inputDirectory, filePath);
                const url = sitemap.ele('url');
                url.ele('loc', `${siteOut}/${relativePath}`); // Utilisez SITE_OUT pour l'URL
                url.ele('lastmod', new Date(stats.mtime).toISOString());
                url.ele('changefreq', 'weekly'); // Fréquence de changement (optionnel)
                url.ele('priority', '0.8'); // Priorité (optionnel)
            }
        });
    }

    readDirectory(inputDirectory);

    // Créer le fichier sitemap.xml
    fs.writeFileSync(`${inputDirectory}/sitemap.xml`, sitemap.end({ pretty: true }));
    console.log('Le fichier sitemap.xml a été généré avec succès.');
}

generateSitemap();
