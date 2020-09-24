// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
/*const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin= require('firebase-admin');*/
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const db=admin.firestore();
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function savesize(agent){
    let size= agent.parameters.size;
    db.collection("Pizza-getsize").add({size:size});
    agent.add('which type of pizza you want (Please select type: VEG,NONVEG)');
  }
   function savetype(agent){
    let type= agent.parameters.type;
    db.collection("Pizza-gettype").add({type:type});
    agent.add('Can I get the crust that you want (Please select crust: hand tossed, thin, cheese)');
  }
  function savecrust(agent){
  let crust=agent.parameters.crust;
    db.collection("Pizza-getcrust").add({crust:crust});
    agent.add('please enter no of pizzas you want to order');
  }
 /* function savenoofpizzas(agent){
  let noofpizzas=agent.parameters.noofpizzas;
    db.collection("Pizza-count").add({noofpizzas:noofpizzas});
    agent.add('Thank you, Now we will get your Particulars. Type OK to continue');
  }*/
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Pizza-getsize',savesize);
  intentMap.set('Pizza-gettype',savetype);
  intentMap.set('Pizza-getcrust',savecrust);
  //intentMap.set('Pizza-count',savenoofpizzas);
                
  agent.handleRequest(intentMap);
});
