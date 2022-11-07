const BASE_URL = "https://acnhapi.com/v1/";

const PERSONALITIES = {
    "CRANKY": "Cranky",
    "SISTERLY": "Sisterly",
    "NORMAL": "Normal",
    "PEPPY": "Peppy",
    "SNOOTY": "Snooty",
    "SMUG": "Smug",
    "LAZY": "Lazy",
    "JOCK": "Jock"
}

const PERSONALITY_EMOTES = {
    "CRANKY": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-bewilderment.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-inspiration.png"
    ],
    "SISTERLY": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-laughter.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-confident.png"
    ],
    "NORMAL": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-pleased.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-daydreaming.png"
    ],
    "PEPPY": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-happiness.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-mischief.png"
    ],
    "SNOOTY": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-amazed.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-love.png"
    ],
    "SMUG": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-smirking.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-showmanship.png"
    ],
    "LAZY": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-mistaken.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-pride.png"
    ],
    "JOCK": [
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-shocked.png", 
        "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-flourish.png"
    ]
}

// Gets villager by random ID
function getRandomVillager() {
    let random_villager_id = Math.floor(Math.random() * 300);
    let url = BASE_URL + "villagers/" + random_villager_id;
    $.get(url, function(data){
        document.getElementById("name-bubble-text").innerText = data.name["name-USen"];
        document.getElementById("quote-bubble-text").innerText = `"${data.saying}"`;
        document.getElementById("villager-image").setAttribute("src", data.image_uri);
        setVillagerEmotes(data.personality);
    });
}

// Formats villager name input
function formatVillagerNameInput(name) {
    if (name.length == 0) {
        return null;
    }

    // Capitalize first letter if lower-case
    if (name.charAt(0) > 97 && name.charAt(0) < 123) {
        if (name.length == 1) {
            name = name.charAt(0).toUpperCase();
        } else {
            name = name.charAt(0).toUpperCase() + name.slice(1);
        }
    }
    return name.trim();
}

// Gets villager by name (internal file name)
function getVillagerByName() {
    console.log(document.getElementById("villager-name-input").value);
    let formattedName = formatVillagerNameInput(document.getElementById("villager-name-input").value);
    if (formattedName == null) {
        searchUnsuccessful();
        return;
    }

    let url = BASE_URL + "villagers/" + getInternalName(formattedName);
    console.log(url);
        $.get(url, function(data){
            console.log("data: "+ data);
            if (data.statusCode == 404) {
                searchUnsuccessful();
            }
            else {
                document.getElementById("name-bubble-text").innerText = data.name["name-USen"];
                document.getElementById("quote-bubble-text").innerText = `"${data.saying}"`;
                document.getElementById("villager-image").setAttribute("src", data.image_uri);
                setVillagerEmotes(data.personality);  
            }
        }).fail(function() {
            searchUnsuccessful();
        });

}

// Sets villager emotes around name based on villager's personality
function setVillagerEmotes(personality) {
    if (personality == PERSONALITIES.CRANKY) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.CRANKY[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.CRANKY[1]); 
    } else if (personality == PERSONALITIES.JOCK) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.JOCK[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.JOCK[1]); 
    } else if (personality == PERSONALITIES.LAZY) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.LAZY[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.LAZY[1]); 
    } else if (personality == PERSONALITIES.NORMAL) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.NORMAL[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.NORMAL[1]); 
    } else if (personality == PERSONALITIES.PEPPY) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.PEPPY[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.PEPPY[1]); 
    } else if (personality == PERSONALITIES.SISTERLY) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.SISTERLY[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.SISTERLY[1]); 
    } else if (personality == PERSONALITIES.SMUG) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.SMUG[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.SMUG[1]); 
    } else if (personality == PERSONALITIES.SNOOTY) {
        document.getElementById("villager-emote-1").setAttribute("src", PERSONALITY_EMOTES.SNOOTY[0]);
        document.getElementById("villager-emote-2").setAttribute("src", PERSONALITY_EMOTES.SNOOTY[1]); 
    }
}

// Clears old info and displays content for unsuccessful search
function searchUnsuccessful() {
    document.getElementById("villager-image").setAttribute("src", "https://animalcrossingworld.com/wp-content/uploads/2020/06/animal-crossing-new-horizons-guide-reaction-icon-mistaken.png");
    document.getElementById("name-bubble-text").innerText = "";
    document.getElementById("quote-bubble-text").innerText = "Villager not found. Please try again.";
}

// Gets internal file name from villager name
function getInternalName(name) {

    // Put const in function due to length
    const VILLAGER_INTERNAL_NAMES = {
        "Cyrano": "ant00",
        "Antonio": "ant01",
        "Pango": "ant02",
        "Anabelle": "ant03",
        "Snooty": "ant06",
        "Annalisa": "ant08",
        "Olaf": "ant09",
        "Teddy": "bea00",
        "Pinky": "bea01",
        "Curt": "bea02",
        "Chow": "bea03",
        "Nate": "bea05",
        "Groucho": "bea06",
        "Tutu": "bea07",
        "Ursala": "bea08",
        "Grizzly": "bea09",
        "Paula": "bea10",
        "Ike": "bea11",
        "Charlise": "bea12",
        "Beardo": "bea13",
        "Klaus": "bea14",
        "Megan": "bea15",
        "Jay": "brd00",
        "Robin": "brd01",
        "Anchovy": "brd02",
        "Twiggy": "brd03",
        "Jitters": "brd04",
        "Piper": "brd05",
        "Admiral": "brd06",
        "Midge": "brd08",
        "Jacob": "brd11",
        "Lucha": "brd15",
        "Jacques": "brd16",
        "Peck": "brd17",
        "Sparro": "brd18",
        "Angus": "bul00",
        "Rodeo": "bul01",
        "Stu": "bul03",
        "T-Bone": "bul05",
        "Coach": "bul07"
    }
    return VILLAGER_INTERNAL_NAMES[`${name}`];
}