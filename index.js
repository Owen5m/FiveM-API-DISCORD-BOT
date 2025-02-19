/*
#DOCUMENTATION DISCORD BOT FIVEM API BY COOKIESSNOTFOUND

Ce fichier contient la configuration et les paramètres essentiels pour personnaliser le bot Discord selon votre serveur.
Avant de déployer le bot, assurez-vous de remplacer toutes les valeurs indiquées ci-dessous par celles correspondant à votre configuration.

--- VARIABLES GLOBALES ---
- BOT_TOKEN : Remplacez cette valeur par votre token de bot Discord (disponible sur https://discord.com/developers/applications).
- BOT_ID    : Remplacez cette valeur par l'identifiant (ID) de votre bot.
- GUILD_ID  : Remplacez cette valeur par l'identifiant (ID) de votre serveur Discord.

--- COMMANDES ET PERMISSIONS ---
!mute
- authorizedRoleIDs : Remplacez ['ID ADMNISTRATEUR', 'ID SUPPORT'] par les IDs des rôles autorisés à utiliser la commande.
- muteRole          : Remplacez 'MUTE ROLE' par l'ID du rôle à appliquer pour muter un utilisateur.

!ticket
- Salon de support : L'ID 'SALON SUPPORT' (utilisé pour la commande !ticket et pour les messages d'aide) doit être remplacé par l'ID du salon destiné aux tickets.
- Rôle de support  : Dans les permissions du ticket, remplacez 'ID SUPPORT' par l'ID du rôle support de votre serveur.
- Nom du salon     : Le ticket est créé sous le format "ticket-<username>" ; cela peut être personnalisé si nécessaire.

Suggestions
- Salon suggestions : L'ID 'SALON SUGGESTION' doit être remplacé par l'ID du salon où les suggestions seront publiées.

Liste noire (triggerWords)
- targetChannelId : Remplacez 'SALON MOT INTERDIT' par l'ID du salon où les messages contenant des mots interdits seront relayés.
- triggerWords    : Adaptez la liste des mots interdits selon vos besoins.

!achat
- Role à ajouter : Remplacez 'ROLE CLIENT' par l'ID du rôle qui doit être attribué suite à un achat.
- Lien facture & support : Vérifiez le lien (ici "https://blackscreen.app/") et l'ID du salon de support ('SALON SUPPORT') pour qu'ils correspondent à vos informations.

Commandes Admins (ex. !clear, !ban, !dm, !help2, !status)
- Rôles autorisés : Remplacez les IDs ['ID ADMNISTRATEUR', 'ID SUPPORT'] par ceux de vos rôles administrateurs ou modérateurs.

/verif
- supportChannelID : Remplacez 'CAPCHA SALON' par l'ID du salon réservé à la vérification.
- roleID           : Remplacez 'ROLE VERIFIER' par l'ID du rôle à attribuer après vérification.
- Les messages et instructions dans cette section peuvent être adaptés à vos règles.

!help
- supportChannelID : Remplacez 'SALON SUPPORT' par l'ID du salon support.
- faqChannelID     : Remplacez 'SALON FAQ' par l'ID du salon FAQ.

--- ACTIVITÉ DU BOT ---
- Dans client.on('ready'), modifiez l'activité affichée par le bot (ex. client.user.setActivity("La Ligue RP")) pour correspondre au nom de votre serveur.

--- EMBEDS & TEXTES ---
- Adaptez les textes, couleurs et messages des embeds pour refléter votre charte graphique et le ton de communication de votre serveur.

Assurez-vous de remplacer TOUS les IDs et paramètres spécifiques ci-dessus avant de déployer le bot sur votre serveur.
*/


var fs = require('fs');

let BOT_TOKEN = "REMPLACE"; // Bot token
let BOT_ID = "REMPLACE"; // Bot id/app id
let GUILD_ID = "REMPLACE"; // Discord server id


eval(fs.readFileSync('register.js')+'');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios');
const mysql = require('mysql');
let canmessage = false;
let lastuserid;
let user;
let script;



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`La Ligue RP`);
});
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!buy')) {
    // ... (Votre code existant pour la commande !buy)
  } else if (message.content.startsWith('!mute')) {
    const args = message.content.slice('!mute'.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const authorizedRoleIDs = ['ID', 'ID SUPPORT'];

    if (message.member.roles.cache.some(role => authorizedRoleIDs.includes(role.id))) {
      // Le membre a au moins l'un des rôles autorisés
      const mentionedUser = message.mentions.users.first();

      if (mentionedUser) {
        const member = message.guild.members.cache.get(mentionedUser.id);
        const muteRole = 'MUTE ROLE';

        const time = args.shift();
        const reason = args.join(' ');

        member.roles.add(muteRole)
          .then(() => {
            const embed = new MessageEmbed()
              .setTitle('🔇 Utilisateur muté')
              .setDescription(`L'utilisateur ${mentionedUser} a été muté dans le serveur ! \n**Durée :** ${time} \n**Raison :** ${reason || 'Aucune raison fournie.'}`)

              .setColor('#ff8c00');

            message.channel.send({ embeds: [embed] });

            const privateEmbed = new MessageEmbed()
              .setTitle('🔇 Vous avez été muté')
              .setDescription(`Vous avez été muté dans le serveur ! \n**Durée :** ${time} \n**Raison :** ${reason || 'Aucune raison fournie.'}`)

              .setColor('#ff8c00');

            mentionedUser.send({ embeds: [privateEmbed] });

            const muteDurationInMillis = parseTimeArgument(time);
            setTimeout(() => {
              member.roles.remove(muteRole)
                .then(() => {
                  const unmuteEmbed = new MessageEmbed()
              .setTitle('🔊 Utilisateur démuté')
              .setDescription(`L'utilisateur ${mentionedUser} a été démuté dans le serveur après le temps spécifié.`)

                    .setColor('#00ff00');

                  message.channel.send({ embeds: [unmuteEmbed] });

                  const privateUnmuteEmbed = new MessageEmbed()
              .setTitle('🔊 Vous avez été démuté')
              .setDescription(`Vous avez été démuté dans le serveur après le temps spécifié.`)

                    .setColor('#00ff00');

                  mentionedUser.send({ embeds: [privateUnmuteEmbed] });
                })
                .catch(error => console.error(`Impossible de démuter ${mentionedUser.tag}. Erreur : ${error}`));

            }, muteDurationInMillis);
          })
          .catch(error => console.error(`Impossible de mettre en sourdine ${mentionedUser.tag}. Erreur : ${error}`));
      } else {
        message.channel.send('Veuillez mentionner un utilisateur à muter.');
      }
    } else {
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');

    }
  }
});





client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id === 'SALON SUPPORT') {
    // Vérifier si l'utilisateur envoie !ticket
    if (message.content.startsWith('!ticket')) {
      // Supprimer le message de l'utilisateur
      message.delete().catch(err => console.error(`Impossible de supprimer le message : ${err}`));

      // Vérifier si l'utilisateur a déjà un ticket ouvert en vérifiant les noms de salon
      const userTicketChannel = message.guild.channels.cache.find(channel =>
        channel.name === `ticket-${message.author.username}`
      );

      if (userTicketChannel) {
        // Envoyer un message à l'utilisateur en DM
        const dmEmbed = new MessageEmbed()
          .setDescription('Vous avez déjà un **ticket** ouvert **!**')
          .setColor('#e74c3c'); // Couleur rouge
        message.author.send({ embeds: [dmEmbed] }).catch(e => console.error("Erreur d'envoi DM : ", e));
        return; // Sortez de la fonction si un ticket est déjà ouvert
      }

      // Créer le salon de ticket
      const ticketChannel = await message.guild.channels.create(`ticket-${message.author.username}`, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: message.author.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: 'ID SUPPORT', // ID du rôle de support
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          // Ajoutez d'autres rôles si nécessaire
        ],
      });

      // Embed de création de ticket
      const createEmbed = new MessageEmbed()
        .setTitle('🎟 Ticket Créé')
        .setDescription(`Bienvenue ${message.author}, veuillez décrire votre problème. Un membre de notre équipe vous assistera bientôt.\n> 🔎 ***Soyez direct ! Ne dites pas juste 'Bonjour', dites 'Bonjour, [PROBLÈME]'***\n\n` +
                        `**Commandes :**\n` +
                        `- \`!tebex\` : Vous avez un code Tebex.\n` +
                        `- \`!partenariat\` : Voir les conditions de partenariat. \n` +
                        `- \`!close\` : Fermer le ticket.`)
        .setColor('#3498db'); // Couleur bleue

      ticketChannel.send({ embeds: [createEmbed] });

      // Embed de DM
      const dmEmbed = new MessageEmbed()
        .setTitle('🎟 Ticket')
        .setDescription(`Votre ticket a été créé : ${ticketChannel}`)
        .setColor('#3498db'); // Couleur bleue
      message.author.send({ embeds: [dmEmbed] }).catch(e => console.error("Erreur d'envoi DM : ", e));
    } else {
      // Supprimer le message de l'utilisateur
      message.delete().catch(err => console.error(`Impossible de supprimer le message : ${err}`));

      // Envoyer un message privé expliquant comment procéder en anglais
      const instructionsEmbed = new MessageEmbed()
        .setTitle('❌ Commande invalide')
        .setDescription('Veuillez utiliser la commande `!ticket` pour créer un ticket.')
        .setColor('#e74c3c'); // Couleur rouge
      message.author.send({ embeds: [instructionsEmbed] }).catch(e => console.error("Erreur d'envoi DM : ", e));
    }
  }
  if (message.channel.id === 'SALON SUGGESTION') {
    // Créer un embed avec le contenu du message et mentionner l'auteur
    const embed = new MessageEmbed()
      .setTitle('Êtes-vous d\'accord ?')
      .addField('Idée(s) :', message.content)
      .setDescription(`Une suggestion a été faite par ${message.author}`)
      .setColor('#374581'); // Couleur orange, vous pouvez changer cela

    // Supprimer le message original
    message.delete().catch(err => console.error(`Impossible de supprimer le message : ${err}`));

    // Envoyer l'embed dans le même salon
    const sentMessage = await message.channel.send({ embeds: [embed] });

    // Ajouter des emojis comme réactions
    sentMessage.react('👍'); // Emoji pouce en haut
    sentMessage.react('👎'); // Emoji pouce en bas
  }

  // Fermeture d'un ticket par un client
if (message.content.startsWith('!close') && message.channel.name.startsWith('ticket-')) {
  const closeEmbed = new MessageEmbed()
    .setTitle('🔒 Ticket Fermé')
    .setDescription('Ce ticket a été marqué comme fermé. Un modérateur le supprimera bientôt.')
    .setColor('#3498db'); // Couleur bleue

  // Envoyer un message au créateur du ticket pour l'informer que le ticket a été fermé
  message.author.send({ embeds: [closeEmbed] })
    .catch(err => console.error(`Impossible d'envoyer un DM à l'utilisateur : ${err}`));

  // Envoyer l'embed "fermé" dans le canal de ticket
  message.channel.send({ embeds: [closeEmbed] })
    .catch(err => console.error(`Impossible d'envoyer l'embed dans le canal : ${err}`));

  // Supprimer la permission de voir le canal pour l'utilisateur qui a envoyé !close
  const member = message.guild.members.cache.get(message.author.id);
  if (member) {
    message.channel.permissionOverwrites.edit(member, {
      VIEW_CHANNEL: false
    })
    .catch(err => console.error(`Impossible de supprimer la permission VIEW_CHANNEL : ${err}`));
  }
}
if (message.content.startsWith('!aide') && message.channel.name.startsWith('ticket-')) {
    // Envoyer un message pour entrer l'email pour le support
    const emailEmbed = new MessageEmbed()
      .setDescription('Veuillez saisir votre adresse E-mail/Discord pour le support.')
      .setColor('#374581'); // Couleur bleue

    message.channel.send({ embeds: [emailEmbed] });

    const filter = m => m.author.id === message.author.id;
    const emailCollector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

    let userEmail = '';

    emailCollector.on('collect', (emailMessage) => {
      userEmail = emailMessage.content;

      // Envoyer un message pour décrire le problème
      const descriptionEmbed = new MessageEmbed()
        .setDescription('Veuillez décrire le problème que vous rencontrez.')
        .setColor('#fe6816'); // Couleur bleue

      message.channel.send({ embeds: [descriptionEmbed] });

      const descriptionCollector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

      descriptionCollector.on('collect', (descriptionMessage) => {
        const issueDescription = descriptionMessage.content;

        // Envoyer un embed de demande de support
        const supportEmbed = new MessageEmbed()
          .setTitle('Demande de Support')
          .setDescription('Une demande de support a été soumise.')
          .addField('Email :', userEmail)
          .addField('Description du Problème :', issueDescription)
          .setColor('#34eb98'); // Vous pouvez choisir n'importe quelle couleur

        message.channel.send({ embeds: [supportEmbed] });
      });
    });
}

if (message.content.startsWith('!tebex')) {
  // Demander à l'utilisateur son code Tebex
  const tebexEmbed = new MessageEmbed()
    .setDescription('Veuillez entrer votre code **Tebex** (doit être tbx-XXXXXXXXXXXXXXXX-XXXXXX) :')
    .setColor('#9237bc'); // Couleur bleue

  message.channel.send({ embeds: [tebexEmbed] });

  // Collecter le prochain message du même utilisateur
  const filter = m => m.author.id === message.author.id;
  const collector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

  collector.on('collect', m => {
    // Vérifier si le code commence par "tbx-" et a au moins 5 caractères
    if (m.content.startsWith('tbx-') && m.content.length >= 23) {
      const thankYouEmbed = new MessageEmbed()
        .setTitle('Code Tebex Reçu !')
        .setDescription(`Merci d'avoir fourni votre **code Tebex**\n > Nous allons **vérifier votre code** dans le ticket et vous **recontacter.** \nCode Tebex : ***${m.content}***`)
        .setColor('#34eb98'); // Vous pouvez choisir n'importe quelle couleur

      message.channel.send({ embeds: [thankYouEmbed] });
      // Gérer le code Tebex valide ici
    } else {
      message.channel.send('Code invalide. Veuillez vous assurer que votre code commence par "tbx-".');
    }
  });

    collector.on('end', collected => {
      if (collected.size === 0) {
        message.channel.send('Aucun code Tebex n\'a été fourni.');
      }
    });
  }
  if (message.content.startsWith('!partenariat') && message.channel.name.startsWith('ticket-')) {
    const questions = [
      'Pourquoi voulez-vous devenir partenaire ?',
      'Quelle promotion allez-vous offrir en échange ?',
      'Que voudriez-vous que nous vous fournissions ?'
    ];

    const partnerAnswers = {};

    const askQuestion = async (index) => {
      if (index < questions.length) {
        // Poser la prochaine question sans la phrase d'introduction
        const questionEmbed = new MessageEmbed()
          .setTitle('Demande de Partenariat')
          .setDescription(questions[index])
          .setColor('#374581'); // Couleur bleue

        message.channel.send({ embeds: [questionEmbed] });

        const filter = m => m.author.id === message.author.id;
        const answerCollector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

        answerCollector.on('collect', (answerMessage) => {
          partnerAnswers[`question${index + 1}`] = answerMessage.content;
          answerCollector.stop();
        });

        answerCollector.on('end', () => {
          // Poser la prochaine question de manière récursive
          askQuestion(index + 1);
        });
      } else {
        // Toutes les questions ont été répondues, envoyer la confirmation finale
        const confirmationEmbed = new MessageEmbed()
          .setTitle('Demande de Partenariat Soumise')
          .setDescription('Merci d\'avoir postulé pour le partenariat ! Votre demande a été reçue.')
          .addField('1. Pourquoi voulez-vous devenir partenaire ?', partnerAnswers.question1)
          .addField('2. Quelle promotion allez-vous offrir en échange ?', partnerAnswers.question2)
          .addField('3. Que voudriez-vous que nous vous fournissions ?', partnerAnswers.question3)
          .setColor('#34eb98'); // Couleur verte

        message.channel.send({ embeds: [confirmationEmbed] });
      }
    };

    // Commencer à poser des questions
    askQuestion(0);
  }
     const triggerWords = ['VOS MOTS BLACKLISTS ICI', 'ICI', 'ET ICI'];


  // Vérifier si le message contient l'un des mots spécifiques
  if (triggerWords.some(word => message.content.includes(word))) {
    // Supprimer le message
    message.delete().catch((error) => console.error('Erreur lors de la suppression du message :', error));

    // Envoyer le message dans le salon spécifié
    const targetChannelId = 'SALON MOT INTERDIT'; // Remplacer par l'ID de votre salon
    const targetChannel = message.guild.channels.cache.get(targetChannelId);

    if (targetChannel) {
      // Obtenir la mention de l'utilisateur
      const userMention = message.author.toString();

      // Créer un embed avec "dis" et la mention de l'utilisateur
      const embed = new MessageEmbed()
        .setTitle('MOT EN LISTE NOIRE')
        .setDescription(`${userMention} : ${message.content}`)
        .setColor('#3498db'); // Couleur bleue

      // Envoyer l'embed dans le salon cible
      targetChannel.send({ embeds: [embed] });
    } else {
      console.error('Salon cible non trouvé.');
    }
  }

if (message.content.startsWith('!add') && message.channel.name.startsWith('ticket-')) {
  // Vérifier si l'utilisateur a le rôle nécessaire
  const allowedRoles = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Ajoutez d'autres rôles si nécessaire
  if (!message.member.roles.cache.some(role => allowedRoles.includes(role.id))) {
    const errorEmbed = new MessageEmbed()
      .setTitle('⛔ Erreur')
      .setDescription('Vous n\'êtes pas autorisé à utiliser cette commande.')
      .setColor('#e74c3c');
    message.channel.send({ embeds: [errorEmbed] });
    return;
  }

  // Extraire l'ID Discord de la mention de l'utilisateur
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) {
    const errorEmbed = new MessageEmbed()
      .setTitle('⛔ Erreur')
      .setDescription('Veuillez mentionner un utilisateur valide à ajouter. \n (ex : !add <@DISCORDID>)')
      .setColor('#e74c3c');
    message.channel.send({ embeds: [errorEmbed] });
    return;
  }

  // Ajouter l'utilisateur au canal de ticket
const member = message.guild.members.cache.get(mentionedUser.id);
if (member) {
  message.channel.permissionOverwrites.edit(member, {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: true // Ajout de la permission d'envoi de messages
  })
  .then(() => {
    const successEmbed = new MessageEmbed()
      .setTitle('✅ Utilisateur Ajouté')
      .setDescription(`${mentionedUser.tag} a été ajouté au ticket.`)
      .setColor('#34eb98');
    message.channel.send({ embeds: [successEmbed] });
    
    // Mentionner l'utilisateur dans le chat du ticket
    message.channel.send(`${mentionedUser}, bienvenue dans le ticket !`);
  })
  .catch(err => console.error(`Impossible de modifier les autorisations : ${err}`));
} else {
  const notFoundEmbed = new MessageEmbed()
    .setTitle('⛔ Erreur')
    .setDescription('Membre introuvable.')
    .setColor('#e74c3c');
  message.channel.send({ embeds: [notFoundEmbed] });
}

}

  // Suppression d'un ticket par un modérateur
  if (message.content.startsWith('!delete') && message.channel.name.startsWith('ticket-')) {
    const supportRoleIDs = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Ajouter l'ID du rôle supplémentaire

    // Vérifier si le membre a l'un des rôles spécifiés
    if (message.member.roles.cache.some(role => supportRoleIDs.includes(role.id))) {
      // Message de confirmation
      const confirmationEmbed = new MessageEmbed()
        .setTitle('⚠️ Confirmation')
        .setDescription('Êtes-vous sûr de vouloir supprimer ce ticket ? Répondez avec `!confirm` pour continuer.')
        .setColor('#f39c12'); // Couleur orange
      message.channel.send({ embeds: [confirmationEmbed] });

      const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === '!confirm';
      const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });

      collector.on('collect', async () => {
        // Supprimer le canal de ticket
        await message.channel.delete()
          .catch(err => console.error(`Impossible de supprimer le canal de ticket : ${err}`));
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          // Aucune confirmation reçue
          message.channel.send('Suppression annulée. Aucune réponse reçue.');
        }
      });
    } else {
      // Pas de permission
      const errorEmbed = new MessageEmbed()
        .setTitle('❌ Erreur')
        .setDescription('Vous n\'avez pas la permission de supprimer ce ticket.')
        .setColor('#e74c3c'); // Couleur rouge
      message.channel.send({ embeds: [errorEmbed] });
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!boutique')) {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Acheter des Coins sur notre serveur GTA RP')
      .addField('💸 Paiement', 'Les paiements peuvent être effectués via notre [Boutique Tebex](https://blackscreen.app/).', false)
      .addField('🛴​ Livraison', 'Vos coins seront livrés dans un délai d\'une minute après confirmation du paiement.', false)
      .addField('❓ Support', 'Pour toute question ou assistance, n\'hésitez pas à contacter notre équipe de support.', false);

    message.channel.send({ embeds: [embed] });
  }
});






client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignorer les messages des bots

  // Vérifier si le contenu du message commence par "!buy"
  if (message.content.startsWith('!achat')) {
    // Extraire les arguments du contenu du message
    const args = message.content.slice('!achat'.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Définir l'ID du rôle autorisé à utiliser la commande
    const authorizedRoleID = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Remplacer 'YOUR_ROLE_ID_HERE' par l'ID de rôle autorisé

    if (message.member.roles.cache.has(authorizedRoleID)) {
      // Vérifier s'il y a un utilisateur mentionné dans le message
      const mentionedUser = message.mentions.users.first();

      if (mentionedUser) {
        const member = message.guild.members.cache.get(mentionedUser.id);
        const roleToAdd = 'ROLE CLIENT'; // Remplacer par l'ID du rôle que vous souhaitez ajouter

        // Ajouter le rôle à l'utilisateur mentionné
        member.roles.add(roleToAdd)
          .then(() => {
            // Créer un embed plus détaillé
            const embed = new MessageEmbed()
              .setTitle('🤝 Merci pour votre achat !')
              .addField('__**Votre facture :**__', 'https://blackscreen.app/')
              .addField('__**Aide/Support :**__', ` ${message.guild.channels.cache.get('SALON SUPPORT')}`)
              .addField('__**Votre licence :**__', 'Votre licence a été liée à votre compte Discord.')
              .setColor('#3498db'); // Couleur bleue

            // Envoyer l'embed dans le message privé de l'utilisateur mentionné
            mentionedUser.send({ embeds: [embed] })
              .catch(error => console.error(`Impossible d'envoyer un MP à ${mentionedUser.tag}. Erreur : ${error}`));
            
            // Envoyer un message dans le canal actuel pour indiquer le succès
            message.channel.send(`Rôle ajouté et message envoyé à ${mentionedUser.tag}`);
          })
          .catch(error => console.error(`Impossible d'ajouter le rôle à ${mentionedUser.tag}. Erreur : ${error}`));
      } else {
        // Si aucun utilisateur n'est mentionné, avertir l'utilisateur
        message.channel.send('Veuillez mentionner un utilisateur pour exécuter la commande.');
      }
    } else {
      // Si l'utilisateur n'est pas autorisé, envoyer un simple message
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  }
});









client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignorer les messages des bots

  const { MessageEmbed } = require('discord.js');

  // Vérifier si le contenu du message commence par "!lock"
  if (message.content.startsWith('!lock')) {
    // Vérifier si le membre a le rôle autorisé
    const authorizedRoleID = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Remplacer par l'ID de rôle réel
    if (message.member.roles.cache.has(authorizedRoleID)) {
      // Définir la permission d'envoi de messages à false pour le rôle @everyone
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      })
        .then(() => {
          // Créer un embed pour le message de verrouillage
          const lockEmbed = new MessageEmbed()
            .setTitle('🔒 Canal Verrouillé')
            .setDescription('Ce canal a été verrouillé. L\'écriture n\'est pas autorisée.')
            .setColor('#ff0000'); // Couleur rouge

          message.channel.send({ embeds: [lockEmbed] });
        })
        .catch(error => console.error(`Impossible de verrouiller le canal. Erreur : ${error}`));
    } else {
      // Si le membre n'est pas autorisé, envoyer un message simple
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  }

  // Vérifier si le contenu du message commence par "!unlock"
  if (message.content.startsWith('!unlock')) {
    // Vérifier si le membre a le rôle autorisé
    const authorizedRoleID = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Remplacer par l'ID de rôle réel
    if (message.member.roles.cache.has(authorizedRoleID)) {
      // Définir la permission d'envoi de messages à true pour le rôle @everyone
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      })
        .then(() => {
          // Créer un embed pour le message de déverrouillage
          const unlockEmbed = new MessageEmbed()
            .setTitle('🔓 Canal Déverrouillé')
            .setDescription('Ce canal a été déverrouillé. L\'écriture est autorisée.')
            .setColor('#00ff00'); // Couleur verte

          message.channel.send({ embeds: [unlockEmbed] });
        })
        .catch(error => console.error(`Impossible de déverrouiller le canal. Erreur : ${error}`));
    } else {
      // Si le membre n'est pas autorisé, envoyer un message simple
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  }

  // Vérifier si le contenu du message commence par "!help"
  if (message.content.startsWith('!help2')) {
    const authorizedRoleID = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // ID du rôle autorisé
    if (message.member.roles.cache.has(authorizedRoleID)) {
      const helpEmbed = new MessageEmbed()
        .setTitle('Liste des Commandes')
        .setDescription('Ci-dessous se trouvent les commandes disponibles:')
        .setColor('#7289da'); // Couleur blurple de Discord

      helpEmbed.addField('!lock', 'Verrouiller des canaux.');
      helpEmbed.addField('!unlock', 'Déverrouiller des canaux.');
      helpEmbed.addField('!mute', 'Muter un utilisateur. (ex : 1d, j, Raison)');
      helpEmbed.addField('!unmute', 'Démuter un utilisateur.');
      helpEmbed.addField('!ban', '@ID Raison');
      helpEmbed.addField('!achat', 'Client Reçu.');
      helpEmbed.addField('!clear', 'Nb de messages.');
      helpEmbed.addField('!boutique', 'Acheteur .');
      helpEmbed.addField('!add', 'Ajouter un utilisateur aux tickets.');
      helpEmbed.addField('!dm', 'Envoyer un MP à un utilisateur avec SafeShield.');
      helpEmbed.addField('!status', 'Voir le Statut du Site Web.');

      message.channel.send({ embeds: [helpEmbed] });
    } else {
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  } else if (message.content.startsWith('!status')) {
    const anticheatStatus = 'En ligne ✅';
    const serverPing = Math.floor(Math.random() * 10) + 1; // Nombre aléatoire entre 1 et 10

    const statusEmbed = new MessageEmbed()
      .setTitle('Statut du Serveur')
      .setDescription('Statut actuel du serveur et ping:')
      .setColor('#7289da')
      .addField('Anticheat:', anticheatStatus, true) // Le "true" indique que cet élément doit être placé à côté
      .addField('Ping du Serveur:', `${serverPing} ms`, true); // Le "true" indique que cet élément doit être placé à côté

    const customMessage = `Salut ${message.author}, voici le statut actuel du serveur :`;

    message.channel.send({ content: customMessage, embeds: [statusEmbed] });
  }

  // Vérifier si le contenu du message commence par "!dm"
  if (message.content.startsWith('!dm')) {
    const authorizedRoleID = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // ID du rôle autorisé
    if (message.member.roles.cache.has(authorizedRoleID)) {
      // Extraire l'utilisateur mentionné et le message à envoyer
      const args = message.content.slice('!dm'.length).trim().split(/ +/);
      const mentionedUser = message.mentions.users.first();
      const dmMessage = args.slice(1).join(' ');

      if (mentionedUser && dmMessage) {
        // Créer un embed pour le message de MP
        const embedDM = new MessageEmbed()
          .setTitle('Tu as reçu un message!')
          .setDescription(dmMessage)
          .setColor('#7289da') // Couleur blurple de Discord
          .setFooter("Inutile de répondre par message privé à ce bot");

        // Envoyer le message de MP à l'utilisateur mentionné
        mentionedUser.send({ embeds: [embedDM] })
          .then(() => {
            message.channel.send(`Message envoyé à ${mentionedUser} avec succès.`);
          })
          .catch(error => {
            console.error(`Impossible d'envoyer un MP à ${mentionedUser.tag}. Erreur : ${error}`);
            message.channel.send(`Échec de l'envoi du message à ${mentionedUser}.`);
          });
      } else {
        message.channel.send('Veuillez fournir à la fois une mention d\'utilisateur et un message à envoyer.');
      }
    } else {
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  }

  // Vérifier si le contenu du message commence par "!ban"
  if (message.content.startsWith('!ban')) {
    // Extraire l'utilisateur mentionné et la raison du contenu du message
    const args = message.content.slice('!ban'.length).trim().split(/ +/);
    const mentionedUser = message.mentions.users.first();
    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    // Définir l'ID du rôle autorisé à utiliser la commande
    const authorizedRoleIDs = ['ID ADMNISTRATEUR', 'ID SUPPORT']; // Remplacer par les IDs de rôles réels

    if (message.member.roles.cache.has(authorizedRoleID)) {
      if (mentionedUser) {
        const member = message.guild.members.cache.get(mentionedUser.id);

        // Envoyer un message privé à l'utilisateur mentionné en utilisant un embed
        const embedDM = new MessageEmbed()
          .setTitle('Notification de Blacklist')
          .setDescription(`Vous avez été blacklisté de **Atlas**.\n**Raison :** ${reason}`)
          .setColor('#ff0000');

        // Créer un embed pour le message de ban
        const embed = new MessageEmbed()
          .setTitle('Blacklist Utilisateur!')
          .setDescription(`**${mentionedUser}** a été blacklisté de nos services.\n**Raison :** ${reason}`)
          .setColor('#ff0000'); // Couleur rouge

        // Envoyer les deux messages simultanément
        Promise.all([
          mentionedUser.send({ embeds: [embedDM] }),
          message.channel.send({ embeds: [embed] }),
          message.delete() // Supprimer le message de l'administrateur
        ])
        .then(() => {
          // Attendre 3 secondes avant de bannir l'utilisateur
          setTimeout(() => {
            // Bannir l'utilisateur mentionné avec la raison spécifiée
            member.ban({ reason })
              .catch(error => console.error(`Impossible de bannir ${mentionedUser.tag}. Erreur : ${error}`));
          }, 3000); // 3 secondes en millisecondes
        })
        .catch(error => console.error(`Impossible d'envoyer les messages. Erreur : ${error}`));
      } else {
        // Si aucun utilisateur n'est mentionné, avertir l'utilisateur
        message.channel.send('Veuillez mentionner un utilisateur à bannir.');
      }
    } else {
      // Si l'utilisateur n'est pas autorisé, envoyer un message simple
      message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande.');
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!help')) {
    const supportChannelID = 'SALON SUPPORT'; // Remplacez par l'ID du salon de support
    const faqChannelID = 'SALON FAQ'; // Remplacez par l'ID du salon FAQ

    const supportChannel = message.guild.channels.cache.get(supportChannelID);
    const faqChannel = message.guild.channels.cache.get(faqChannelID);

    if (!supportChannel || !faqChannel) {
      return message.channel.send('Les canaux spécifiés pour le support ou les FAQ n\'ont pas été trouvés.');
    }

    const helpEmbed = new MessageEmbed()
      .setTitle('Besoin d\'aide avec Moi ?')
      .setDescription('Voici quelques informations utiles pour obtenir de l\'aide :')
      .setColor('#7289da') // Couleur blurple de Discord
      .addField('❓ Salon de Support:', `Expliquez vos problèmes dans ${supportChannel}.`, true)
      .addField('📚 Tutos:', `Trouvez des instructions détaillées dans ${faqChannel}.`, true)
      .addField('♻️ Vider son Cache:', 'Peut contribuer à une meilleure performance en jeu.')
      .addField('🛒 Boutique:', 'Utiliser la commande ***!boutique*** pour plus de détails');

    message.channel.send({ embeds: [helpEmbed] });
  }
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('/verif')) {
        const supportChannelID = 'ID SALON'; // Remplacez par l'ID du salon où vous voulez ajouter le rôle
        const roleID = 'ROLE A AJOUTER'; // Remplacez par l'ID du rôle que vous souhaitez ajouter

        const supportChannel = message.guild.channels.cache.get(supportChannelID);
        const roleToAdd = message.guild.roles.cache.get(roleID);

        if (!supportChannel || !roleToAdd) {
            return message.author.send('Le salon spécifié ou le rôle à ajouter n\'ont pas été trouvés.');
        }

        // Vérifie si le message a été envoyé dans le salon spécifié
        if (message.channel.id !== supportChannelID) {
            await message.author.send({
                embeds: [{
                    color: '#ff0000',
                    description: `Veuillez utiliser la commande /verif dans le salon ${supportChannel} pour compléter le processus.`
                }]
            });
            return;
        }

        // Ajouter le rôle à l'utilisateur
        message.member.roles.add(roleToAdd)
            .then(async () => {
                await message.author.send({
                    embeds: [{
                        color: '#00ff00',
                        description: 'Vérification passée avec succès.'
                    }]
                });
                // Envoyer un message de bienvenue
                await message.author.send({
                    embeds: [{
                        color: '#7289da',
                        title: 'Bienvenue sur Atlas!',
                        description: `Bienvenue sur notre serveur ! N'hésitez pas à lire les règles dans le salon approprié et à poser des questions dans <#1213862236825718915>.`
                    }]
                });
                // Supprimer le message !captcha
                await message.delete();
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du rôle:', error);
                message.author.send({
                    embeds: [{
                        color: '#ff0000',
                        description: 'Une erreur s\'est produite lors de l\'ajout du rôle.'
                    }]
                });
            });
    } else if (message.channel.id === 'CAPCHA SALON') { // Vérifie si le message est dans le canal spécifié
        await message.author.send({
            embeds: [{
                title: 'Erreur de Commande',
                color: '#ff0000',
                description: 'Utiliser uniquement la commande `/verif` dans le salon <#CAPCHA SALON> pour compléter le processus.'
            }]
        });
        await message.delete();
    }
});




client.on('messageCreate', async (message) => {
    // Vérifier si le message commence par "!clear"
    if (message.content.startsWith('!clear')) {
        // Vérifier si l'auteur du message a l'un des deux rôles autorisés
        if (message.member.roles.cache.some(role => role.id === 'ID ADMNISTRATEUR' || role.id === 'ID SUPPORT')) {
            // Séparer la commande et l'argument (nombre de messages à supprimer)
            const args = message.content.split(' ');
            // Vérifier si l'argument est un nombre valide
            const amount = parseInt(args[1]);

            if (isNaN(amount)) {
                // Si l'argument n'est pas un nombre valide, envoyer un message d'erreur
                return message.channel.send('Veuillez spécifier un nombre valide de messages à supprimer.');
            }

            // Supprimer les messages
            try {
                await message.channel.bulkDelete(amount);
                const reply = await message.channel.send(`**${amount}** messages ont été effacés avec succès.`);
                // Supprimer le message de confirmation après 3 secondes
                setTimeout(() => {
                    reply.delete();
                }, 3000);
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la suppression des messages :', error);
                message.channel.send('Une erreur est survenue lors de la suppression des messages.');
            }
        } else {
            // Si l'auteur du message n'a pas les rôles autorisés, envoyer un message d'erreur
            message.channel.send('Vous n\'avez pas les autorisations nécessaires pour utiliser cette commande.');
        }
    }
});



const cooldown = new Set();
const COOLDOWN_DURATION = 5000; // 10 secondes de cooldown

client.on('messageCreate', async (message) => {
    // Liste des mots-clés
    const keywordsRegex = /(besoin d\'aide|besoin staff|support|aide|staff|assistance|problème|bug)/i;
    if (keywordsRegex.test(message.content) && !cooldown.has(message.author.id)) {
        // Marquer l'utilisateur comme étant en cooldown
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, COOLDOWN_DURATION);

        // Créer un embed pour la réponse
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Besoin d\'aide')
            .setDescription('Nous faisons de notre mieux pour résoudre vos problèmes.')
            .addField('Conseil', 'Veuillez vous rediriger vers le salon <#SALON SUPPORT> pour obtenir de l\'aide.');

        // Envoyer l'embed dans le même canal que le message d'origine
        message.channel.send({ embeds: [embed] });
    }
});


client.login(BOT_TOKEN);
  

