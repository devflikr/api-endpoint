import MeetUpStream from "../../mongodb/models/meetup/MeetUpStream";

const CHARACTER_SET = "abcdefghijklmnopqrstuvwxyz";

export function generateMeetUpCode() {
    let result = "";
    for (let i = 0; i < 9; i++) {

        result += CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));

        if (i !== 8 && i % 3 === 2) result += "-";
    }
    return result;
}

function generateMeetUpCodeWithCheck() {
    return new Promise<string>((resolve) => {
        async function autoRecaller() {
            const code = generateMeetUpCode();
            const checkIf = await MeetUpStream.findOne({ code });
            if (!checkIf) return resolve(code);
            return autoRecaller();
        }
        autoRecaller();
    });
}

export default generateMeetUpCodeWithCheck;