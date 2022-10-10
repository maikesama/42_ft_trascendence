# 42 ft_trascendence

## Description back-end api (/api/):

* AUTH (/auth/): 
    * GET 
    * POST /logout
    * GET /2fa/:id // non definitiva
    * POST /verify2fa // non definitiva (body con Id)

* USER (/user/):
    * GET /me // ritorna l'utente richiedente
    * GET /:idIntra // ritorna l'utente con idIntra
    * GET /all // ritorna tutti gli utenti
    * POST /block/:idIntra // blocca l'utente con idIntra
    * POST /unblock/:idIntra // sblocca l'utente con idIntra
    * POST /turn-on-2fa // attiva la 2fa
    * POST /turn-off-2fa // disattiva la 2fa
    * POST /update/pp // aggiorna la propria immagine profilo (body.img)
    * POST /update/username // aggiorna la propria username (body.userName)
    * GET /getUserChats // ritorna tutte le chat dell'utente richiedente

* CHAT (/chat/):
    * POST /newChannel // crea una nuovo channel ( body con name, type, password?(if protected) )
    * POST /newDm // crea una nuova dm ( body con idIntra del destinatario )
    * GET /searchUser // ritorna gli utenti che contengono la stringa passata come body (body.initials) per aggiungere nei canali
    * POST /muteUser // muto un utente ( body con idIntra del destinatario, name del canale e time in minuti senno 100 anni di mute)
    * POST /unmuteUser // unmuto un utente ( body con idIntra del destinatario, name del canale)
    * POST /banUser // banna un utente ( body con idIntra del destinatario, name del canale e time in minuti senno 100 anni di ban)
    * POST /unbanUser // unbanna un utente ( body con idIntra del destinatario, name del canale)
    * POST /joinChannel // entra in un canale ( body con name del canale e password se protected)
    * POST /leaveChannel // esce da un canale ( body con name del canale)
    * POST /changePassword // cambia la password di un canale ( body con name del canale e password)
    * POST /changeVisibility // cambia la visibilità di un canale ( body con name del canale e type)
    * POST /addUser // aggiunge un utente a un canale ( body con name del canale e idIntra del destinatario)
    * POST /removeUser // rimuove un utente da un canale ( body con name del canale e idIntra del destinatario)
    * POST /addAdmin // aggiunge un admin a un canale ( body con name del canale e idIntra del destinatario)
    * POST /removeAdmin // rimuove un admin da un canale ( body con name del canale e idIntra del destinatario)

* FRIEND (/friend/) :
    * POST /inviteFriend // invita un amico ( body con idIntra del destinatario)
    * POST /acceptInvite // accetta una richiesta di amicizia ( body con idIntra di chi ha invitato)
    * POST /declineInvite // rifiuta una richiesta di amicizia ( body con idIntra di chi ha invitato)
    * POST /removeInvite // rimuove invito ( body con idIntra destinatario)
    * GET /getFriends // ritorna tutti gli amici dell'utente richiedente
    * GET /searchFriend // cerca amico ( body con idIntra)
    * POST /removeFriend // rimuove amico ( body con idIntra)

* GAMES (/games/) :
    * POST /createGame // crea una nuova partita ( body.user1 body.user2)
    * POST /updateGame // aggiorna una partita una volta finita ( body con id della partita (body.idGame) body.winner body.loser body.scoreP1 body.scoreP2)
    * GET /getLeaderboard // ritorna la classifica
    * GET /getWinner // ritorna il vincitore (body.winner)
    * GET /getLoser // ritorna il vincitore (body.loser)



    
    

    

