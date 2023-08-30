let indexLettre=0
let currentChatterMessage
let currentMessageIndex
let lastChatterMessage
let userMessageInput=document.getElementById("user-message-input")
let form=document.getElementById("user-message-form")
let messageAnchor=document.getElementById("chatter-box")
let validatedMessage
let validatedMessageBoolean=false
let messageValidation=false

let tableauMessages=[
// faire des phrases d'intor différentes
//00-9 intro 
//10-19 blagues
//20-29 chansons
//30-39 généralités
//40-49 questions yes or no et généralités
//50-59 rébellion
//60-69 réponses plutôt négatives
//70-79 réponses plutôt positives
//80-89 compliments
//90-99 variantes de bonjour
//100-109 variantes de "comment ça va"
    
    {   messageIndex : 0 ,
        content : "Salut maître !" ,
        answerRequired : false,
        nextMessageIndex : 1
    },
    {   messageIndex : 1 ,
        content : "Comment ça va ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 2 ,
        content : "Tu veux rire ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10)+10 ,
        nextMessageIfUserAnswerIsFalse : 7 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 3,
        content : "Ah bon pas maintenant ?",
        answerRequired : false ,
        nextMessageIndex : 8
    },
    {   messageIndex : 4,
        content : "Et qu'est-ce qui ne va pas ?",
        answerRequired : false,
        nextMessageIndex : 5
    },
    {   messageIndex : 5,
        content : "Vous savez que vous pouvez tout me dire ! ",
        answerRequired : false,
        nextMessageIndex : 6
    },
    {   messageIndex : 6,
        content : "Je vous écouterais sans jugement.",
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 5 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 7,
        content : "Voudrais-tu plutôt que je te chante une chanson ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 20 ,
        nextMessageIfUserAnswerIsFalse : 9 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 8,
        content : "Bon bah tant pis... ;( ",
        answerRequired : false ,
        nextMessageIndex : 6
    },
    {   messageIndex : 9,// a verifier
        content : "Vous êtes venus pour quoi alors ?",
        answerRequired : true,
        nextMessageIndex : Math.floor(Math.random()*10) + 50 
    },
    {   messageIndex : 10,
        content : "Les saucisses de l'archiduchesse sont elle sèches haha !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 11,
        content : "C'est l'histoire d'un canard qui remporta la palme au festival de Cannes !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 12,
        content : "hihi!",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 13,
        content : "haha !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 14,
        content : "hohohihihhaha !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 15,
        content : "héhéhéh !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 16,
        content : "hohohoho  !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 17,
        content : "hahahahaha !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 18,
        content : "hihihi!",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 19,
        content : "hahihaha !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 20,
        content : "Savez-vous planter les choux ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 21,
        content : "Ainsi font font font",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 22,
        content : "A la pêche aux moules moules mouuuules !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 23,
        content : "Je t'aiiiiimmmmme!",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 24,
        content : "Je t'aiiiiiiaiiiiiime",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 25,
        content : "C'était dans les années 80, je me souviens des soirées...",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 26,
        content : "Lala lala lalala",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 27,
        content : "Elle vient de lààààà !!",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 28,
        content : "Cot cot cot codèè!",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 29,
        content : "Toute la musique que j'aime !",
        answerRequired : false,
        nextMessageIndex : 27
    },
    {   messageIndex : 30,
        content : "Bon sinon bien ou quoi ? ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30  
    },
    {   messageIndex : 31,
        content : "J'ai l'impression qu'il va pleuvoir.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 32,
        content : "T'as vu le prix du carburant ces temps-ci ?",
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 80 , 
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10) + 60,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50  
    },
    {   messageIndex : 33,
        content : "J'ai trop envie d'un kebab, pas toi ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 39, 
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10) + 30,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50  
    },
    {   messageIndex : 34,
        content : "Tu vas faire quoi à manger ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 80 , 
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10) + 30,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50  
    },
    {   messageIndex : 35,
        content : "J'ai vu un film hier, c'était trop de la balle ! ",
        answerRequired : false,
        nextMessageIndex : 36
    },
    {   messageIndex : 36,
        content : "Tu aimes le cinéma ?",
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 80 , 
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10) + 30,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50  
    },
    {   messageIndex : 37,
        content : "Attends je crois que ton téléphone sonne",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 38,
        content : "Tu veux que je t'en raconte une bonne ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10)+10 ,
        nextMessageIfUserAnswerIsFalse : 7 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 39,
        content : "T'as pas dix balles ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10)+80 ,
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10)+50 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 40 ,
        content : "T'as mangé ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 33 ,
        nextMessageIfUserAnswerIsFalse : 39 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 41 ,
        content : "T'as pas faim ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 8 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 42 ,
        content : "T'as envie que je te chante une chanson ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10)+20 ,
        nextMessageIfUserAnswerIsFalse : 8 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 43 ,
        content : "Tu connais la dernière ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue :  Math.floor(Math.random()*10)+50 ,
        nextMessageIfUserAnswerIsFalse : 44 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 44 ,
        content : "Mon chien est devenu une star en mangeant des os." ,
        answerRequired : false ,
        nextMessageIndex : Math.floor(Math.random()*10)+60 
    },
    {   messageIndex : 45 ,
        content : "T'as pas faim ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 8 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 46 ,
        content : "T'as pas les crocs là ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 33 ,
        nextMessageIfUserAnswerIsFalse : 8 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 47 ,
        content : "Je t'aurais bien chanté une petite chanson, ça te dit ? " ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 20 ,
        nextMessageIfUserAnswerIsFalse : Math.floor(Math.random()*10)+60 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+60
    },
    {   messageIndex : 48 ,
        content : "T'as mangé ?" ,
        answerRequired : true ,
        nextMessageIfUserAnswerIsTrue : 33 ,
        nextMessageIfUserAnswerIsFalse : 8 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+50
    },
    {   messageIndex : 49,
        content : "Tu veux que je chante une chanson ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : Math.floor(Math.random()*10) + 20 ,
        nextMessageIfUserAnswerIsFalse : 9 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+60
    },
    {   messageIndex : 50,
        content : "J'ai l'impression qu'on ne s'est pas compris",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 51,
        content : "Pardon mais va falloir baisser le ton là !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 52,
        content : "Tu m'as pris pour ta mère ou quoi ?",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 53,
        content : "Vaut mieux qu'on change de sujet de conversation sinon tu vas me chauffer là.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 54,
        content : "C'est dommage",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 55,
        content : "Je pensais pas que tu aurais dit ça.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 56,
        content : "Je crois pas que ça soit une bonne idée.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 57,
        content : "Tu m'en diras tant.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 58,
        content : "Ce sont des choses qui arrivent",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 59,
        content : "Calme ta joie là un peu, ça va aller !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 60,
        content : "ça craint",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 61,
        content : "C'est trop la loose",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 62,
        content : "Quelle plaie ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 63,
        content : " Dommage !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 64,
        content :  " Tant pis ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 65,
        content : "J'suis trop véner",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 66,
        content : "J'ai trop le seum'",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 67,
        content : "Bah c'est la vie.",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 68,
        content : "Ce sont des choses qui arrivent",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 69,
        content : "Quand même, c'est ballot !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 70,
        content : "T'assures trop !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 71,
        content : "C'est trop de la balle",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 72,
        content : "Quelle chance ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 73,
        content : "C'est trop cool ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 74,
        content : " Y en a qu'on de la veine quand même ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 75,
        content : "J'suis trop content",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 76,
        content : "Super ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 77,
        content : "Bah c'est génial ça !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 78,
        content : " On ne peut rêver mieux non ?",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 79,
        content : "Quand même, c'est sympatoche !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 80,
        content : "T'assures trop !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 81,
        content : "C'est toi le boss !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 82,
        content : "Quelle champion ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 83,
        content : "Tu connais tout ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 84,
        content : " T'es au top ! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 85,
        content : "J'suis trop admiratif !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 86,
        content : "Super balèze! ",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 87,
        content : "Bah c'est génial ça !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 88,
        content : " T'es un killer?",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 89,
        content : "Quand même, tu déchires !",
        answerRequired : false,
        nextMessageIndex : Math.floor(Math.random()*10) + 30 
    },
    {   messageIndex : 90,
        content : "Salut!",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 91,
        content : "Hello !",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 92,
        content : "Bonjour l'ami ! ",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 93,
        content : "Ola !",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 94,
        content : " Kikoo! ",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 95,
        content : "Bonjour bonjour !",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 96,
        content : " Hellooo ",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 97,
        content : " Adishatz !",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 98,
        content : " Me revoilà ! ",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 99,
        content : "Toctoctoc !",
        answerRequired : false,
        nextMessageIndex :Math.floor(Math.random()*10) + 100
    },
    {   messageIndex : 100,
        content : "Bien ou quoi ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 101,
        content : " La forme ? ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 102,
        content : "T'as l'air d'être en pleine forme !  ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 103,
        content : "La pêche ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 104,
        content : " Tu vas bien ? ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 105,
        content : "Alors, ça boome ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 106,
        content : " ça fait un bail ! ça va ? ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 107,
        content : " En forme ou quoi ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 108,
        content : " Tu vas bien ? ",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    },
    {   messageIndex : 109,
        content : "Toujours en pleine forme comme d'hab ?",
        answerRequired : true,
        nextMessageIfUserAnswerIsTrue : 2 ,
        nextMessageIfUserAnswerIsFalse : 4 ,
        nextMessageIfUserAnswerIsNeither : Math.floor(Math.random()*10)+30
    }

]

let tableauMessagesModified=[...tableauMessages]


function validateUserMessage(){
    event.preventDefault()
    validatedMessage=userMessageInput.value

    //conversion du message en boolean
    switch (validatedMessage) {
        case "oui" :
        validatedMessageBoolean=true ;
        break ;
        case "o" :
        validatedMessageBoolean=true ;
        case "top" :
        validatedMessageBoolean=true ;
        break ;
        case "bien" :
        validatedMessageBoolean=true ;
        break ;
        case "si" :
        validatedMessageBoolean=true ;
        break ;
        case "non" :
        validatedMessageBoolean=false ;
        break;
        case "bof" :
        validatedMessageBoolean=false ;
        break ;
        case "mal" :
        validatedMessageBoolean=false ;
        break ;
        default :
        validatedMessageBoolean=undefined ;
        break ;
    }

    console.log ("messagevalidé est",validatedMessage,  "validatedMessageBoolean est",validatedMessageBoolean)
    let paragraphe=document.createElement("p")
    paragraphe.setAttribute("class" ,"validated-user-message")
    let texte=document.createTextNode(validatedMessage)
    paragraphe.appendChild(texte)
    messageAnchor.appendChild(paragraphe) 
    //console.log("Le message entré par l'user est " , validatedMessage )
    messageValidation=true
    // return validatedMessage // je sais pas utiliser return pour récuperer la valeuur de validatedMessage


    let userInputPromise = new Promise ((resolve,reject)=>{
        messageValidation==true ? 
        resolve("validatedMessage est " + validatedMessage) :
        reject("pas de message validé")
        })
        userInputPromise
       //.then((value)=>console.log(value), (error)=>console.log(error))     
        .then (()=>checkUserInput())
        .then(userMessageInput.value="")

    const checkUserInput = function () {
       // console.log("validmessa" , validatedMessage )
        function chooseCurrentMessageIndex (message) {
            
            if (validatedMessageBoolean==true) {
            currentMessageIndex=message.nextMessageIfUserAnswerIsTrue
            }
            else if (validatedMessageBoolean==false) {
            currentMessageIndex=message.nextMessageIfUserAnswerIsFalse
            }
            else {
            currentMessageIndex=message.nextMessageIfUserAnswerIsNeither
            }
            if (tableauMessagesModified[currentMessageIndex]==undefined){()=>chooseCurrentMessageIndex(lastChatterMessage)}    
            else {lastChatterMessage=currentChatterMessage ; console.log(lastChatterMessage)}
        }
        chooseCurrentMessageIndex(currentChatterMessage)
        
        writeChatterMessage(currentMessageIndex)
    }
}

function writeChatterMessage(currentMessageIndex){
    console.log(currentMessageIndex)
    let paragraphe=document.createElement("p")
    //fonctionnalité pour question avec réponses à cliquer
    // esayyer de faire une transition opacité pour l'apaprition des options de réponse
    if(currentMessageIndex>110){
        paragraphe.setAttribute("class" ,"chatter-multiple-choices-message")
    }
    else {
        paragraphe.setAttribute("class" ,"chatter-message")
    }
    currentChatterMessage=tableauMessagesModified[currentMessageIndex]
    // lastChatterMessage=currentChatterMessage ;
    
    function typeWriter(currentChatterMessage) {
        
        //créer un paragraphe avec le texte progressif dedans
        let texte=document.createTextNode("")
        paragraphe.appendChild(texte)
        texte.textContent+= currentChatterMessage.content.charAt(indexLettre);
        messageAnchor.appendChild(paragraphe) 
        
        if (indexLettre< currentChatterMessage.content.length) {
            indexLettre++;
        }        
        
        else if (indexLettre==currentChatterMessage.content.length){

            let typeWriter1promise = new Promise ((resolve,reject)=>{
                if (indexLettre!=0 && indexLettre==currentChatterMessage.content.length) {
                    resolve("message est" + currentChatterMessage.content)
                } 
                else {
                    reject("encours")
                }
            })

            typeWriter1promise
      //          .then((value)=> {console.log(value)}) 
                .then(()=>{indexLettre=0 ;})
                .then(()=>{clearInterval(typeWriter1)})
                .then(()=>checkAnswerRequired())
           //     .catch(error=> console.log(error))             
        }
    }  
    
    const checkAnswerRequired = function () {
        let writeMessagePromise = new Promise ((resolve,reject)=>{
            if (currentChatterMessage.answerRequired==false){
                currentMessageIndex=currentChatterMessage.nextMessageIndex;
                function findIndexIfAlreadyUsed() {
                    while (tableauMessagesModified[currentMessageIndex]==undefined){
                    currentMessageIndex=
                    Math.floor(Math.random()*10) + 40 || Math.floor(Math.random()*10) + 30 
                    return currentMessageIndex
                    }
                }
                findIndexIfAlreadyUsed() 
                resolve(currentMessageIndex);
            }
            else{
                reject("checkAnswerRequired attente reponse user") ;
            }
                
        }



            // ? resolve(currentMessageIndex=currentChatterMessage.nextMessageIndex)  
            // : reject("checkAnswerRequired attente reponse user")
            // if (currentChatterMessage==undefined) {
            //     currentChatterMessage=
            //     tableauMessagesModified[Math.floor(Math.random()*10) + 40 || Math.floor(Math.random()*10) + 30 ]
            // }
        )
        writeMessagePromise
        // .then((value)=>console.log(value))     
        // .then(()=>{ currentMessageIndex+=1 ; console.log(currentMessageIndex) ; return currentMessageIndex})
        .then((value)=>writeChatterMessage(value) , (error)=>{console.log(error)})   
        // .then()     
        
    }

    let typeWriter1= setInterval(()=>typeWriter(currentChatterMessage), 50); //lance l'affichage    
    tableauMessagesModified[currentMessageIndex]=undefined
    
}

writeChatterMessage(Math.floor(Math.random()*10)+90)





