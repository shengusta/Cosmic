/**
 * ADMIN NPC
 * Purin, triggers search query
 * @author Chronos
 */

let object;
let type;

function start() {
    if (cm.getPlayer().getDataSearch() !== null) {
        cm.sendSimple(cm.getPlayer().getDataSearch());
    } else {
        cm.sendOk("Hello.");
        cm.dispose();
    }
}

function action(m, t, s) {
    if (m !== 1) {
        cm.dispose();
        return;
    }

    if (!object) {
        object = cm.getPlayer().getDataSearchArr().get(s);
        type = cm.getPlayer().getDataSearchType();
        if (type === "mob") {
            cm.sendGetNumber("How many?", 1, 1, 200); // default, min, max
        } else if (type === "item") { // TODO: want to further separate the max into equip or other item types
            cm.sendGetNumber("How many?", 1, 1, 9999); // default, min, max
        } else if (type === "npc") {
            cm.makeNpc(object);
            cm.dispose();
        }
    } else {
        if (type === "item") {
            cm.gainItem(object, s);
            cm.sendOk("You got #r" + s + "x#k #b#t" + object + "#");
        } else if (type === "mob") {
            for (let i = 0; i < s; i++) {
                cm.summonMob(object);
            }
        }
        cm.dispose();
    }
}