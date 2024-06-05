const webpush = require('web-push');
const fs = require('node:fs');



/**
 * ====================================
 * Setup var
 * ====================================
 */
const publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";
const privateVapidKey = "4AoSsRHFaHv0Fupd2NRtrungJF2jkqgccTu-WEc781w";
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);
const storagePath = 'storage/subscribers';
const payload = JSON.stringify({ title: "Hello World", body: "Notif panda" });



/**
 * ====================================
 * Utilities
 * ====================================
 */
function addNewSubscriber(newSubscriber: any) {
    const prev = getSubscriber();
    fs.writeFileSync(storagePath, JSON.stringify([...prev, newSubscriber]));
}


function getSubscriber() {
    try {
        const fileContent = fs.readFileSync(storagePath);
        return JSON.parse(fileContent);
    } catch (error) { }
    return [];
}



/**
 * ====================================
 * Request handler
 * ====================================
 */
export async function GET() {
    const subscribers = getSubscriber();

    for (const subscriber of subscribers) {
        await webpush.sendNotification(subscriber, payload);
    }

    return Response.json({
        ping: 'pong'
    })
}


export async function POST(request: Request) {
    const subscription = await request.json();
    addNewSubscriber(subscription);

    await webpush.sendNotification(subscription, payload);

    return Response.json({
        ping: 'pong'
    })
}
