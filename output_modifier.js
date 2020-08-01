// Heavily inspired by Atampy26's RPG system for an AI Dungeon

//–--------------------
// Default stats
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

const expirienceDistribution = [
    3,                                                                  // 0
    3,                                                                  // 1
    2,                                                                  // 2
    2,                                                                  // 3
    1,                                                                  // 4
    1,                                                                  // 5
    1,                                                                  // Usual action
]

//–--------------------
// Custom functions
//---------------------

function checkForActions(text) {
    for (keyword of Object.keys(avaliableActions)) {
        if (text.toLowerCase().includes("you " + keyword)) {
            currentStat = avaliableActions[keyword][0].toLowerCase()
            currentSkill = avaliableActions[keyword][1].toLowerCase()

            if (state.stats[currentStat] < 20) {
                state.stats[currentStat] += expirienceDistribution[6]/16
            }
            if (state.skills[currentSkill] < 20) {
                state.skills[currentSkill] += expirienceDistribution[6]/8
            }
        }
    }
}

//–--------------------
// Default modifier
//---------------------


const modifier = (text) => {
    let modifiedText = text;
    
    checkForActions(text);
    return {text: modifiedText}
}

modifier(text)