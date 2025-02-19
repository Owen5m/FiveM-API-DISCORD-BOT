# Documentation du Bot Discord 🚀
**Développé par :** [cookiessnotfound](https://discord.com/users/cookiessnotfound)  
**Pour tout souci ou demande, contactez-moi via Discord :** **@cookiessnotfound** 💬

---

## Table des Matières
- [Fonctionnalités Générales](#fonctionnalités-générales-)
- [Commandes pour les Utilisateurs](#commandes-pour-les-utilisateurs-)
- [Commandes Administratives et de Modération](#commandes-administratives-et-de-modération-)
- [Système de Tickets et Support](#système-de-tickets-et-support-)
- [Autres Fonctionnalités](#autres-fonctionnalités-)
- [Configuration et Installation](#configuration-et-installation-)

---

## Fonctionnalités Générales ✨

- **Gestion des Tickets :**  
  Le bot permet de créer automatiquement des salons de support (tickets) via une commande dédiée. Chaque ticket est un salon privé où l’utilisateur peut décrire son problème et obtenir de l’aide.

- **Assistance et Réponses Automatiques :**  
  Lorsque des messages contiennent des mots-clés comme "besoin d'aide", "support" ou "bug", le bot répond automatiquement en redirigeant l’utilisateur vers le salon de support.

- **Modération et Sécurité :**  
  Le bot offre des commandes de modération (muter, bannir, verrouiller/déverrouiller les canaux) et supprime automatiquement les messages contenant des termes interdits, en notifiant l’incident dans un salon dédié.

- **Gestion des Achats et Partenariats :**  
  Des commandes spécifiques permettent d'attribuer des rôles suite à un achat, de vérifier des codes Tebex, et de gérer des demandes de partenariat.

---

## Commandes pour les Utilisateurs 🎫

- **`!achat`**  
  Attribue un rôle spécifique à l’utilisateur mentionné suite à un achat validé. Un message privé détaillé est envoyé avec la facture, les informations de support et la confirmation de la liaison de la licence.

- **`!ticket`**  
  Crée un salon de ticket personnalisé (nommé `ticket-<username>`) pour que l’utilisateur puisse demander de l’aide. En cas de ticket déjà ouvert, le bot informe l’utilisateur en message privé.

- **`!close`**  
  Ferme un ticket en envoyant un embed de confirmation dans le salon et en MP, puis retire les permissions d’accès à l’utilisateur.

- **`!aide`**  
  Lance une procédure de support dans un ticket en demandant à l’utilisateur son adresse e-mail/Discord, puis une description du problème rencontré.

- **`!tebex`**  
  Demande à l’utilisateur de fournir son code Tebex (au format `tbx-XXXXXXXXXXXXXXXX-XXXXXX`). Le bot vérifie le format et envoie un message de confirmation en cas de code valide.

- **`!partenariat`**  
  Démarre une procédure de demande de partenariat en posant trois questions successives (motivation, promotion offerte, besoins spécifiques) puis récapitule les réponses dans un embed final.

- **`!boutique`**  
  Affiche un embed détaillé présentant les modalités d’achat de Coins sur le serveur GTA RP, incluant les informations de paiement via Tebex, le délai de livraison et les options de support.

---

## Commandes Administratives et de Modération 🔨

- **`!mute`**  
  Permet de mettre en sourdine un utilisateur mentionné pour une durée spécifiée (ex. 1d, 1h, etc.) avec une raison facultative. Le bot se charge du démutage automatique après expiration du temps.

- **`!add`**  
  Ajoute un utilisateur supplémentaire à un ticket en modifiant les permissions du salon pour lui permettre de voir et écrire.

- **`!delete`**  
  Supprime définitivement un salon ticket après confirmation (répondez avec `!confirm`).

- **`!lock` & `!unlock`**  
  Verrouillent ou déverrouillent le canal courant en modifiant les permissions du rôle `@everyone` pour empêcher ou autoriser l’envoi de messages.

- **`!dm`**  
  Permet aux membres autorisés d’envoyer un message privé via un embed personnalisé à un utilisateur spécifié.

- **`!ban`**  
  Bannit un utilisateur mentionné. Avant le bannissement, le bot envoie une notification par MP et dans le canal via un embed, puis exécute l’action après un court délai.

- **`!clear`**  
  Supprime un nombre spécifié de messages dans le canal en utilisant la méthode `bulkDelete` et affiche un message de confirmation temporaire.

- **`!help2`**  
  Liste les commandes administratives disponibles, réservé aux membres disposant de rôles administratifs.

---

## Système de Tickets et Support 💡

- **Création et Gestion des Tickets :**  
  La commande `!ticket` crée un salon de ticket privé pour chaque utilisateur, avec un embed de bienvenue détaillant les instructions pour décrire le problème.

- **Réponses Automatiques :**  
  Le bot surveille les messages contenant des mots-clés relatifs à l’aide et redirige automatiquement l’utilisateur vers le salon de support dédié.

---

## Autres Fonctionnalités ⭐

- **`/verif`**  
  Utilisée dans le salon de vérification, cette commande ajoute un rôle de vérification, envoie des messages de confirmation et de bienvenue par MP, puis supprime le message original.

- **`!help`**  
  Affiche un embed d’aide général listant toutes les commandes disponibles, avec des liens vers le salon support et les FAQ.

- **`!status`**  
  Affiche un embed indiquant le statut actuel du serveur (ex. état de l'anticheat, ping) pour fournir des informations rapides sur la santé du serveur.

---

## Configuration et Installation ⚙️

### Dépendances
- [discord.js](https://discord.js.org)
- [axios](https://www.npmjs.com/package/axios)
- [mysql](https://www.npmjs.com/package/mysql)
- [fs](https://nodejs.org/api/fs.html)

### Variables de Configuration
Avant de lancer le bot, **modifiez les variables suivantes** dans le code pour correspondre à votre configuration Discord :

- **BOT_TOKEN** – Le token du bot (obtenu sur [Discord Developer Portal](https://discord.com/developers/applications)).
- **BOT_ID** – L’ID de votre bot.
- **GUILD_ID** – L’ID de votre serveur Discord.
- **IDs des rôles et salons :**
  - Pour la commande `!mute` :  
    Remplacez les `authorizedRoleIDs` par les IDs des rôles autorisés et `muteRole` par l’ID du rôle à appliquer pour muter un utilisateur.
  - Pour le système de tickets :  
    Remplacez l’ID du salon support (ex. `1224866841730744360`) et l’ID du rôle support (ex. `1224087638940717137`) par ceux de votre serveur.
  - Pour les suggestions :  
    Remplacez l’ID du salon (ex. `1213862025524940850`) par l’ID de votre salon dédié aux suggestions.
  - Pour la liste noire :  
    Remplacez le `targetChannelId` (ex. `1226676026432815145`) et ajustez la liste des `triggerWords` selon vos besoins.
  - Pour `!achat` :  
    Remplacez l’ID du rôle à ajouter (ex. `1227006448631021659`), le lien de la facture et l’ID du salon de support (ex. `1224866841730744360`).
  - Pour les commandes administratives (`!clear`, `!ban`, `!dm`, `!help2`, `!status`) :  
    Remplacez les IDs des rôles autorisés (ex. `1213859557315579904`, `1227047892355645440`) par ceux de vos administrateurs/modérateurs.
  - Pour la commande `/verif` :  
    Remplacez le `supportChannelID` (ex. `1213863657457586207`) et le `roleID` (ex. `1213860906073727018`) par ceux de votre serveur.
  - Pour `!help` :  
    Remplacez l’ID du salon support (ex. `1224866841730744360`) et du salon FAQ (ex. `1222992394056892426`).

### Installation

Installation des dépendances :

    npm install

Configuration :
Modifiez les variables et remplacez tous les IDs et paramètres spécifiques comme indiqué ci-dessus.
Lancement du Bot :

    node index.js

Crédits :
Développé avec passion par cookiessnotfound 🔥
Pour tout souci, contactez-moi sur Discord : @cookiessnotfound 💬
