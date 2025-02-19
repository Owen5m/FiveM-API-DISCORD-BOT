Documentation du Bot Discord développer par cookiessnotfound

Ce bot a été conçu pour faciliter la gestion et la modération de votre serveur Discord. Il intègre de nombreuses fonctionnalités, allant de la gestion des tickets de support aux commandes de modération, en passant par la validation d’achats et la gestion d’événements spécifiques.
Table des Matières

    Fonctionnalités Générales
    Commandes pour les Utilisateurs
    Commandes Administratives et de Modération
    Système de Tickets et Support
    Autres Fonctionnalités
    Configuration et Installation

Fonctionnalités Générales

    ```Gestion des Tickets :```
    Le bot permet de créer des salons de support (tickets) automatiquement via une commande dédiée. Chaque ticket est un salon textuel privé dans lequel l’utilisateur peut décrire son problème et recevoir de l’aide.

    ```Assistance et Réponses Automatiques :```
    Lorsqu’un utilisateur mentionne des mots-clés relatifs à une demande d’aide (ex. "besoin d'aide", "support", "bug"), le bot envoie automatiquement un message pour rediriger l’utilisateur vers le salon de support.

    ```Modération et Sécurité :```
    Le bot offre plusieurs commandes de modération (muter, bannir, verrouiller/déverrouiller les canaux) et supprime automatiquement les messages contenant des termes interdits, en notifiant l’incident dans un salon dédié.

    Gestion des Achats et Partenariats :
    Des commandes spécifiques permettent de lier des achats à des rôles Discord, de vérifier des codes Tebex et de gérer des demandes de partenariat.

# Commandes pour les Utilisateurs

    ```!achat```
    Attribue un rôle spécifique à l’utilisateur mentionné suite à un achat validé. L’utilisateur reçoit également un message privé contenant sa facture, des informations de support et une confirmation de la liaison de sa licence à son compte Discord.

    ```!ticket```
    Crée un salon de ticket personnalisé (nommé ticket-<username>) pour permettre à l’utilisateur de demander de l’aide. Si un ticket est déjà ouvert, le bot en informe l’utilisateur par message privé.

    ```!close```
    Disponible dans les salons de ticket, cette commande ferme le ticket en envoyant un embed de confirmation à la fois dans le canal et en message privé, puis en retirant les permissions d’accès à l’utilisateur.

    ```!aide```
    Dans un ticket, lance une procédure de support en demandant à l’utilisateur de fournir son adresse e-mail ou son identifiant Discord, puis une description du problème rencontré.

    ```!tebex```
    Demande à l’utilisateur de fournir son code Tebex (au format tbx-XXXXXXXXXXXXXXXX-XXXXXX). Le bot vérifie le format et envoie un message de confirmation en cas de code valide.

    ```!partenariat```
    Lance une procédure de demande de partenariat en posant trois questions successives (motivation, promotion offerte, besoins spécifiques) puis récapitule les réponses dans un embed final.

    ```!boutique```
    Affiche un embed détaillé présentant les modalités d’achat de Coins sur le serveur GTA RP, incluant les informations de paiement via Tebex, le délai de livraison et les options de support.

Commandes Administratives et de Modération

    ```!mute```
    Permet de mettre en sourdine un utilisateur mentionné pour une durée spécifiée (ex. 1d, 1h, etc.) avec une raison facultative. Le bot gère également le démutage automatique une fois la durée écoulée.

    ```!add```
    Ajoute un utilisateur supplémentaire à un ticket en modifiant les permissions du salon pour lui permettre de voir et écrire dans le ticket.

    ```!delete```
    Pour les membres du support, cette commande supprime définitivement un salon ticket après confirmation (répondre avec !confirm).

    ```!lock et !unlock```
    Ces commandes verrouillent ou déverrouillent le canal courant en modifiant les permissions du rôle @everyone, empêchant ou autorisant l’envoi de messages.

    ```!dm```
    Permet aux membres autorisés d’envoyer un message privé à un utilisateur via un embed personnalisé.

    ```!ban```
    Bannit un utilisateur mentionné. Avant le bannissement, le bot notifie l’utilisateur par message privé et dans le canal via un embed, puis exécute l’action après un court délai.

    ```!clear```
    Supprime un nombre spécifié de messages dans le canal en utilisant la méthode bulkDelete et affiche un message de confirmation temporaire.

Système de Tickets et Support

    ```Création et Gestion des Tickets :```
        La commande !ticket permet de créer un salon de ticket privé pour chaque utilisateur.
        Un embed de bienvenue explique les instructions pour décrire le problème.
        Les commandes spécifiques dans le ticket (!close, !aide, !add, !partenariat) facilitent la gestion et la résolution des demandes de support.

    ```Réponses Automatiques :```
    Le bot surveille les messages contenant des mots-clés relatifs à l’aide et répond automatiquement en redirigeant vers le salon de support dédié.

Autres Fonctionnalités

    ```/verif```
    Utilisée dans le salon de vérification, cette commande ajoute un rôle de vérification à l’utilisateur, envoie des messages de confirmation et de bienvenue par MP, puis supprime le message original.

    ```!help et !help2```
    Ces commandes affichent des embeds d’aide qui listent l’ensemble des commandes disponibles. !help2 est réservée aux membres disposant de rôles administratifs.

    ```!status```
    Affiche un embed indiquant le statut actuel du serveur (ex. état de l'anticheat, ping) pour fournir des informations rapides sur la santé du serveur.

Configuration et Installation

    ```Dépendances :```
        discord.js
        axios
        mysql
        fs

    ```Variables de Configuration :```
    Vous devez modifier les variables suivantes dans le code selon votre configuration Discord :
        BOT_TOKEN – Le token du bot
        BOT_ID – L’ID du bot
        GUILD_ID – L’ID du serveur
        Les IDs des rôles et des salons utilisés pour les commandes et permissions (ex. rôle de support, salons de ticket, salons de vérification, etc.)
Installation :

    Clonez le dépôt sur votre machine.
    Installez les dépendances en exécutant :

## npm install

Configurez vos variables d’environnement ou modifiez directement le fichier de configuration avec vos informations spécifiques.

Démarrez le bot avec la commande :

## node index.js
