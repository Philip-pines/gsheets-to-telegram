const ss = SpreadsheetApp.openById('');
const sheet = ss.getSheetByName('');
const token = "";

function sendStat(){
  
  let newValues = sheet.getRange(2, 4, sheet.getLastRow()-1).getValues().map(item => item[0]);
  let oldValues = sheet.getRange(2, 4, sheet.getLastRow()-1).getNotes().map(item => item[0]);
   
  for (let i = 0; i < newValues.length; i++){ // looping through the entire array
    let name = sheet.getRange(i+2, 3).getValue(); // we get the name from the array
    
    if (newValues[i] != '') { // if the array is not empty
      if (oldValues[i] == ''){ // if the array of old values ​​is empty, assign balance = 0
        sheet.getRange(i+2, 4).setNote(newValues[i]); // assign old values
        sendMessage(-1001701963853, `${name} attendance updated: null → to ${newValues[i]}`); // send to telegram
      } else if (newValues[i] != oldValues[i]){ // if the values ​​from the old and new array do not match
        sheet.getRange(i+2, 4).setNote(newValues[i]); // assign old values
        sendMessage(-1001701963853, `${name} attendance updated: ${oldValues[i]} → to ${newValues[i]}`); // send to telegram
        } 
      
     } 
    
  } // end for loop
  
} //end sendStat

function setTriggerTime() {
  ScriptApp.newTrigger("sendStat")
  .timeBased()
  .everyMinutes(1)
  .create();
}

function deleteTrigger(){
  // Deletes all triggers in the current project.
  let triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function sendMessage(id_chat, text, keyboard) { // Sends a message using sendMessage
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id_chat),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
