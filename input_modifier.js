// Heavily inspired by Atampy26's RPG system for an AI Dungeon

//–--------------------
// Default stats
//---------------------

const defaultSats = {
    act: 2,
    destroy: 2,
    create: 2,
    observe: 2,
    manipulate: 2,
}

const defaultSkills = {
    talk: 3,
    athlete: 3,
    destroy: 3,
    fight: 3,
    make: 3,
    repair: 3,
    heal: 3,
    discover: 3,
    deduce: 3,
    deceive: 3,
    sneak: 3,
    puppeteer: 3,
    perfomance: 4
}

//–--------------------
// Action descriptions
//---------------------

const avaliableActions = {
    "balance": ["Act", "Athlete"],
    "make him": ["Manipulate", "Puppeteer"],
    "make her": ["Manipulate", "Puppeteer"],
    "make them": ["Manipulate", "Puppeteer"],
    "force him": ["Manipulate", "Puppeteer"],
    "force her": ["Manipulate", "Puppeteer"],
    "cast": ["Manipulate", "Puppeteer"],
    "force them": ["Manipulate", "Puppeteer"],
    "make sure": ["Act", "Talk", true],
    "make": ["Create", "Make"],
    "destroy": ["Destroy", "Destroy"],
    "attack": ["Destroy", "Fight"],
    "fight": ["Destroy", "Fight"],
    "slit": ["Destroy", "Fight"],
    "battle": ["Destroy", "Fight"],
    "bandage": ["Create", "Heal"],
    "stab": ["Destroy", "Fight"],
    "murder": ["Destroy", "Fight"],
    "hit": ["Destroy", "Fight"],
    "kill": ["Destroy", "Fight"],
    "strike": ["Destroy", "Fight"],
    "shoot": ["Destroy", "Fight"],
    "ambush": ["Destroy", "Fight"],
    "kidnap": ["Manipulate", "Sneak"],
    "befriend": ["Act", "Talk"],
    "threaten": ["Manipulate", "Puppeteer"],
    "break": ["Destroy", "Destroy"],
    "build": ["Create", "Make"],
    "charm": ["Act", "Talk"],
    "climb": ["Act", "Athlete"],
    "conceal": ["Manipulate", "Deceive"],
    "conclude": ["Observe", "Deduce"],
    "deduce": ["Observe", "Deduce"],
    "craft": ["Create", "Make"],
    "crawl": ["Act", "Athlete"],
    "deceive": ["Manipulate", "Deceive"],
    "dive": ["Act", "Athlete"],
    "drag": ["Act", "Athlete"],
    "drive": ["Act", "Athlete"],
    "ensnare": ["Act", "Athlete"],
    "escape": ["Manipulate", "Sneak"],
    "evade": ["Manipulate", "Sneak"],
    "fix": ["Create", "Repair"],
    "flip": ["Act", "Athlete"],
    "grow": ["Create", "Make"],
    "harvest": ["Create", "Make"],
    "heal": ["Create", "Heal"],
    "patch up": ["Create", "Heal"],
    "restore": ["Create", "Heal"],
    "hack": ["Manipulate", "Puppeteer"],
    "investigate": ["Observe", "Discover", true],
    "discover": ["Observe", "Discover"],
    "jump": ["Act", "Athlete", true],
    "know": ["Observe", "Deduce"],
    "lasso": ["Act", "Athlete"],
    "lie": ["Manipulate", "Deceive"],
    "lift": ["Act", "Athlete"],
    "pull": ["Act", "Athlete"],
    "push": ["Act", "Athlete"],
    "read": ["Observe", "Discover", true],
    "rappel": ["Act", "Athlete"],
    "restrain": ["Act", "Athlete"],
    "ride": ["Act", "Athlete"],
    "run from": ["Act", "Athlete"],
    "run away": ["Act", "Athlete"],
    "run": ["Act", "Athlete", true],
    "walk": ["Act", "Athlete", true],
    "search": ["Observe", "Discover"],
    "find": ["Observe", "Discover"],
    "sing": ["Act", "Talk"],
    "speak": ["Act", "Talk", true],
    "chat": ["Act", "Talk"],
    "talk": ["Act", "Talk", true],
    "say": ["Act", "Talk", true],
    "slide": ["Act", "Athlete"],
    "sneak": ["Manipulate", "Sneak"],
    "steal": ["Manipulate", "Sneak"],
    "swim": ["Act", "Athlete"],
    "swing": ["Act", "Athlete"],
    "tame": ["Manipulate", "Puppeteer"],
    "tumble": ["Act", "Athlete"],
    "unlock": ["Manipulate", "Puppeteer"],
    "write": ["Create", "Perfomance"],
    "play": ["Act", "Perfomance"],
    "perform": ["Act", "Perfomance"],
    "dj": ["Act", "Perfomance"],
    "sing": ["Act", "Perfomance"]
}

const actionDescriptions = [
    ["completely fail to", "spectacularly fail to", "utterly fail to"], // 0
    ["unsuccessfully try to", "fail to"],                               // 1
    ["try to", "attempt to"],                                           // 2
    [""],                                                               // 3
    ["successfully"],                                                   // 4
    ["masterfully", "professionally", "gracefully", "skilfully"]        // 5
    [""]                                                                // Usual action
]

const actionResultDescriptions = [
    "spectacular fail!",                                                // 0
    "fail!",                                                            // 1
    "uncertain outcome!",                                               // 2
    "",                                                                 // 3
    "success!",                                                         // 4
    "complete success!",                                                // 5
    ""                                                                  // Usual action
]

const expirienceDistribution = [
    3,                                                                  // 0
    3,                                                                  // 1
    2,                                                                  // 2
    2,                                                                  // 3
    1,                                                                  // 4
    1,                                                                  // 5
    1,                                                                  // Usual action
]

const maxTurn = 3; // Turns to show tips
const maxLevel = 20;  // Max XP for a character
const debug = true;

//–--------------------
// Custom functions
//---------------------

function debugLog(message) {
    if (debug) {
        console.log(message)
    }
}

function checkSkill(skill) {
    if (state.skills[skill] <= 3) {
        return 'incompetent'
    }
    if (state.skills[skill] > 3 && state.skills[skill] < 5) {
        return 'a novice'
    }
    if (state.skills[skill] >= 5 && state.skills[skill] < 6) {
        return 'competent'
    }
    if (state.skills[skill] >= 6 && state.skills[skill] < 7) {
        return 'capable'
    }
    if (state.skills[skill] >= 7) {
        return 'good'
    }
}

function checkSkillDescriptor(skill) {
    if (state.skills[skill] <= 3) {
        return 'poor'
    }
    if (state.skills[skill] > 3 && state.skills[skill] < 5) {
        return 'fair'
    }
    if (state.skills[skill] >= 5 && state.skills[skill] < 6) {
        return 'okay'
    }
    if (state.skills[skill] >= 6 && state.skills[skill] < 7) {
        return 'capable'
    }
    if (state.skills[skill] >= 7) {
        return 'good'
    }
}

function randomNumber(max) {
    // From 0 to max
    return Math.floor(Math.random() * Math.floor(max));
}

function initialise() {
    // Set default stats, skills and turns
    debugLog("Initilizing first game")
    state.stats = defaultSats;
    state.skills = defaultSkills;

    state.turn = 0;
    state.initialised = true;

    debugLog("stats " + state.stats);
}

function turnIncrease() {
    state.turn += 1;
    if (state.turn >= maxTurn) {
        state.turn = 0;
    }
}
 
function actionResultHandler(roll, index, singleAction, keyword) {
    actionDescription = actionDescriptions[index]  // Gets description from the array above

    currentStat = avaliableActions[keyword][0].toLowerCase()
    currentSkill = avaliableActions[keyword][1].toLowerCase()

    debugLog("Current stat is " + currentStat);
    debugLog("Current skill is " + currentSkill);

    action = "\n>You " + actionDescription[randomNumber(actionDescription.length)] + " " + singleAction
    message = "Roll: " + roll + " – " + actionDescriptions[index] + " +" + expirienceDistribution[index] +
              " XP for" + currentStat + "and "  + currentSkill
    
    if (state.stats[currentStat] < maxLevel) {
        state.stats[currentStat] += expirienceDistribution[index] / 16
    }
    if (state.skills[currentSkill] < maxLevel) {
        state.skills[currentSkill] += expirienceDistribution[index] / 8
    }

    debugLog(action)
    debugLog(message)

    return [action, message]
}

function singleActionHandler(singleAction, keyword) {
    debugLog("Single action: " + singleAction + " and keyword is: " + keyword)

    if (!singleAction[2]) { // Means it's a simple action like "Say". It doesn't require dependance on skill.
        debugLog("This action is usual one")
        return actionHandler(roll, 6, singleAction, keyword); // Success
    }

    currentStat = avaliableActions[keyword][0].toLowerCase()  // Name of the stat of this action

    var roll = Math.round(randomNumber(19)+ 1) + (state.stats[currentStat] - 8/state.stats[currentStat] -1)  // Weird-weird formula
    
    debugLog("Roll: " + roll.toString())
    switch (true) {
        case (roll <= 1):
            return actionResultHandler(roll, 0, singleAction, keyword);
        case (roll <= 5):
            return actionResultHandler(roll, 1, singleAction, keyword);
        case (roll <= 10):
            return actionResultHandler(roll, 2, singleAction, keyword);
        case (roll <= 15):
            return actionResultHandler(roll, 3, singleAction, keyword);
        case (roll <= 19):
            return actionResultHandler(roll, 4, singleAction, keyword);
        case (roll >= 20):
            return actionResultHandler(roll, 5, singleAction, keyword);
    }
}

function actionHandler(action) {
    if (!action.includes("You")) {  // Story mode
        return ["> " + action, tipsAndStats()]
    }

    action = action.substring(7); // Substring of 7, because start of the line look like: \n> You
                                  // That was, actualy, really confusing
    debugLog("Got actions: " + action);
  
    for (keyword of Object.keys(avaliableActions)) {
        if (action != undefined && action.toLowerCase().startsWith(keyword)) {
            return singleActionHandler(action, keyword);
        }
    }

    return ["\n>You " + action, tipsAndStats()]; // If no actions where found
}

function tipsAndStats() {
    turn = state.turn;
    switch (turn) {
        case 0:
            return `You are ${checkSkill('talk')} at talking to people and ${checkSkill('athlete')} at athletic actions. You are ${checkSkill('destroy')} at destruction and you are ${checkSkill('make')} at making things. In combat, you are ${checkSkillDescriptor('fight')}. You are ${checkSkill('repair')} at patching up things and ${checkSkill('heal')} at patching up people. Your observational skills are ${checkSkillDescriptor('discover')} and your deduction skills are ${checkSkillDescriptor('deduce')}. You are ${checkSkill('deceive')} at deceiving others and lying to people and ${checkSkill('sneak')} at sneaking around. Your ability to manipulate others and cause things to happen is ${checkSkillDescriptor('puppeteer')} and your perfomance skills are ${checkSkillDescriptor('perfomance')}.`;
        case maxTurn:
            state.turn = 0; // It'll keep going to the default case
        default:
            tips = ["Need to get better at a specific skill? Do that skill more often.", 
                    "XP is earned whenever you perform an action. Fails teach more than successes.", 
                    "Every so often, you'll see your skills shown in a big long paragraph. The AI sees this too, so if it sounds harsh the AI might be harsh as well!", 
                    `Permfomance is a vital skill for a musician. You're ${checkSkillDescriptor('perfomance')} at it.`
                ];
            return tips[randomNumber(tips.length - 1)]
    }
}

//–--------------------
// Default modifier
//---------------------

const modifier = (text) => {
    let modifiedText = text;  // User input

    if (!state.initialised) {  // It's a custom value
        initialise();
        return {text: modifiedText}
    }

    if (state.initialised) {
        turnIncrease();
        parsedAction = actionHandler(modifiedText);  // User perfomed action with a custom RPG output style

        actionText = parsedAction[0];  // Text for the input
        messageText = "" + parsedAction[1];  // Tips'n'stuff
        
        state.message = messageText;
        return {text: actionText}
    }
}

modifier(text)
